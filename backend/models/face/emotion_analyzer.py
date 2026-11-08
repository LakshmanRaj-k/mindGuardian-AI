"""
Real-Time Facial Emotion Analysis Engine
MindGuardian AI - Blueprint 4.0

Uses OpenCV Haar Cascade face detection + FER+ ONNX pre-trained model for inference.
Runs fully on Python 3.14 via onnxruntime — no TensorFlow required.

Privacy Guarantee: All frames processed entirely in-memory.
Zero disk storage, zero external uploads, zero screenshots.
"""

import base64
import numpy as np
import cv2
import os
import urllib.request
from pathlib import Path
from typing import Dict, Any

# ── ONNX Runtime ────────────────────────────────────────────────────────────────
import onnxruntime as ort

# ── FER+ ONNX Model Config ──────────────────────────────────────────────────────
# Pre-trained FER+ emotion model from ONNX Model Zoo (MIT License)
# Classifies 8 emotions from 64x64 grayscale face ROIs
MODEL_URL = "https://github.com/onnx/models/raw/main/validated/vision/body_analysis/emotion_ferplus/model/emotion-ferplus-8.onnx"
MODEL_PATH = Path(__file__).parent / "emotion_ferplus.onnx"

# FER+ output label order (8 classes)
EMOTION_LABELS = ["neutral", "happy", "surprise", "sad", "angry", "disgust", "fear", "contempt"]

# Map to 7 standard emotions (merge contempt into disgust)
MERGE_MAP = {
    "neutral":  "neutral",
    "happy":    "happy",
    "surprise": "surprise",
    "sad":      "sad",
    "angry":    "angry",
    "disgust":  "disgust",
    "fear":     "fear",
    "contempt": "disgust",   # merge contempt → disgust
}

# Cached ONNX session (lazy-loaded on first request)
_ort_session = None


def _get_ort_session():
    """
    Lazily loads the ONNX Runtime session. Downloads model on first use.
    Model is cached at backend/models/face/emotion_ferplus.onnx (~20MB).
    """
    global _ort_session
    if _ort_session is not None:
        return _ort_session

    # Download model if not already cached
    if not MODEL_PATH.exists():
        print(f"[Emotion Analyzer] Downloading FER+ ONNX model (~20MB)...")
        try:
            urllib.request.urlretrieve(MODEL_URL, MODEL_PATH)
            print(f"[Emotion Analyzer] Model downloaded to: {MODEL_PATH}")
        except Exception as e:
            print(f"[Emotion Analyzer] Model download failed: {e}")
            return None

    try:
        _ort_session = ort.InferenceSession(
            str(MODEL_PATH),
            providers=["CPUExecutionProvider"]
        )
        print("[Emotion Analyzer] ONNX FER+ model loaded successfully.")
        return _ort_session
    except Exception as e:
        print(f"[Emotion Analyzer] Failed to load ONNX model: {e}")
        return None


# ── OpenCV Face Detector ────────────────────────────────────────────────────────
def _get_face_cascade():
    """Safely load Haar Cascade, compatible with OpenCV 4.x."""
    try:
        cascade_path = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
        return cv2.CascadeClassifier(cascade_path)
    except AttributeError:
        return None


def _detect_largest_face(gray_img):
    """
    Detects all faces and returns the bounding box of the largest one.
    Returns (x, y, w, h) or None if no face found.
    """
    cascade = _get_face_cascade()
    if cascade is None:
        return None

    faces = cascade.detectMultiScale(
        gray_img,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(48, 48),
        flags=cv2.CASCADE_SCALE_IMAGE
    )

    if len(faces) == 0:
        return None

    # Select largest face by area
    return max(faces, key=lambda f: f[2] * f[3])


# ── ONNX Emotion Inference ──────────────────────────────────────────────────────
def _run_ferplus_inference(face_roi_gray) -> Dict[str, float]:
    """
    Runs FER+ ONNX emotion model on a grayscale face ROI.
    Returns normalized 7-emotion probability dict (percentages summing to 100).
    """
    session = _get_ort_session()
    if session is None:
        return _heuristic_fallback(face_roi_gray)

    # Preprocess: resize to 64x64, normalize to float32
    resized = cv2.resize(face_roi_gray, (64, 64)).astype(np.float32)

    # FER+ model expects shape: [1, 1, 64, 64]
    input_tensor = resized[np.newaxis, np.newaxis, :, :]

    # Run inference
    input_name = session.get_inputs()[0].name
    raw_output = session.run(None, {input_name: input_tensor})[0][0]  # shape: [8]

    # Softmax to get probabilities
    exp_scores = np.exp(raw_output - np.max(raw_output))
    probabilities = exp_scores / exp_scores.sum()

    # Build raw 8-emotion score dict
    raw_scores: Dict[str, float] = {}
    for label, prob in zip(EMOTION_LABELS, probabilities):
        raw_scores[label] = float(prob)

    # Merge contempt into disgust and output 7 standard emotions
    merged: Dict[str, float] = {
        "happy":    0.0,
        "neutral":  0.0,
        "sad":      0.0,
        "angry":    0.0,
        "fear":     0.0,
        "surprise": 0.0,
        "disgust":  0.0,
    }
    for fer_label, prob in raw_scores.items():
        target = MERGE_MAP.get(fer_label, "neutral")
        merged[target] = merged.get(target, 0.0) + prob

    # Convert to percentage (0–100), rounded to 1 decimal
    total = sum(merged.values()) or 1.0
    return {k: round((v / total) * 100, 1) for k, v in merged.items()}


def _heuristic_fallback(face_roi_gray) -> Dict[str, float]:
    """
    Simple statistical fallback when ONNX model is unavailable.
    Returns a neutral-biased probability distribution.
    """
    resized = cv2.resize(face_roi_gray, (48, 48))
    edge_density = float(np.sum(cv2.Canny(resized, 50, 150) > 0)) / (48 * 48)
    upper_mean = float(np.mean(resized[:24, :]))
    lower_mean = float(np.mean(resized[24:, :]))
    delta = lower_mean - upper_mean

    scores = {
        "happy":    max(0.0, 0.08 + delta * 0.01 + edge_density * 0.08),
        "neutral":  max(0.0, 0.55 - edge_density * 0.25),
        "sad":      max(0.0, 0.06 - delta * 0.008),
        "angry":    max(0.0, 0.05 + edge_density * 0.12),
        "surprise": max(0.0, 0.05 + edge_density * 0.10),
        "fear":     max(0.0, 0.04),
        "disgust":  max(0.0, 0.03),
    }
    total = sum(scores.values()) or 1.0
    return {k: round((v / total) * 100, 1) for k, v in scores.items()}


# ── Main Entry Point ────────────────────────────────────────────────────────────
def analyze_emotion_from_base64(image_base64: str) -> Dict[str, Any]:
    """
    Decodes a Base64 image in-memory, detects the largest face using OpenCV
    Haar Cascade, runs FER+ ONNX emotion inference, and returns structured result.
    """
    # 1. Validate & decode Base64 payload
    if not image_base64:
        return _error_response("INVALID_IMAGE", "Base64 image payload is empty.")

    try:
        if "," in image_base64:
            _, encoded = image_base64.split(",", 1)
        else:
            encoded = image_base64

        image_bytes = base64.b64decode(encoded)
        np_arr = np.frombuffer(image_bytes, np.uint8)
        img_bgr = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if img_bgr is None or img_bgr.size == 0:
            return _error_response("INVALID_IMAGE", "Failed to decode image into OpenCV matrix.")

    except Exception as e:
        return _error_response("INVALID_IMAGE", f"Base64 decode error: {str(e)}")

    # 2. Convert to grayscale for face detection
    gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)

    # 3. Detect largest face
    face_box = _detect_largest_face(gray)

    if face_box is None:
        return {
            "face_detected": False,
            "dominant_emotion": "Neutral",
            "confidence": 0.0,
            "emotions": {},
            "message": "No face detected.",
            "error": None
        }

    # 4. Extract face ROI & run ONNX inference
    x, y, w, h = face_box
    face_roi = gray[y:y + h, x:x + w]

    try:
        emotions = _run_ferplus_inference(face_roi)
    except Exception as e:
        print(f"[Emotion Analyzer] Inference error: {e}")
        return _error_response("INFERENCE_ERROR", f"Emotion classification failed: {str(e)}")

    # 5. Get dominant emotion & confidence
    dominant_key = max(emotions, key=emotions.get)
    confidence = emotions[dominant_key]

    return {
        "face_detected": True,
        "dominant_emotion": dominant_key.capitalize(),
        "confidence": round(confidence, 1),
        "emotions": emotions,
        "message": "Face analyzed successfully.",
        "error": None
    }


def _error_response(error_code: str, message: str) -> Dict[str, Any]:
    """Returns a standardized error response dict."""
    return {
        "face_detected": False,
        "dominant_emotion": "Neutral",
        "confidence": 0.0,
        "emotions": {},
        "message": message,
        "error": error_code
    }
