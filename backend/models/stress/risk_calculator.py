"""
Continuous Multimodal Risk Scoring Engine
MindGuardian AI - Blueprint 6.0 (High Precision Upgrade)

Uses continuous emotion probability distribution weighting and calibrated vocal acoustics
to generate a smooth, accurate, and explainable physiological stress score (0-100).
"""

from typing import Dict, Any, List, Tuple

# Facial Emotion Base Stress Weights (0 - 100 scale per emotion)
EMOTION_STRESS_WEIGHTS = {
    "happy": 5.0,
    "neutral": 15.0,
    "surprise": 30.0,
    "disgust": 60.0,
    "sad": 55.0,
    "fear": 75.0,
    "angry": 85.0,
}


def calculate_multimodal_stress(
    emotion_data: Dict[str, Any] = None,
    voice_data: Dict[str, Any] = None
) -> Tuple[int, str, float, List[str]]:
    """
    Calculates continuous numerical risk score (0-100), stress level, combined confidence,
    and traceable contributing factors.
    
    Returns:
        (risk_score: int, stress_level: str, confidence: float, contributing_factors: List[str])
    """
    factors: List[str] = []

    # ── 1. Continuous Facial Emotion Weighted Analysis ────────────────────────
    face_conf = 80.0
    emotion_score = 15.0  # Default baseline (Neutral)

    if emotion_data and emotion_data.get("face_detected", False):
        face_conf = float(emotion_data.get("confidence", 80.0))
        dom_emotion = str(emotion_data.get("dominant_emotion", "Neutral")).capitalize()
        emotions_dist = emotion_data.get("emotions", {})

        if emotions_dist and isinstance(emotions_dist, dict):
            # Calculate continuous expectation score over full 7-emotion probability distribution
            weighted_sum = 0.0
            total_prob = 0.0

            for emotion_key, prob in emotions_dist.items():
                k = emotion_key.lower()
                weight = EMOTION_STRESS_WEIGHTS.get(k, 15.0)
                weighted_sum += (prob * weight)
                total_prob += prob

            if total_prob > 0:
                emotion_score = weighted_sum / total_prob
            else:
                emotion_score = EMOTION_STRESS_WEIGHTS.get(dom_emotion.lower(), 15.0)
        else:
            emotion_score = EMOTION_STRESS_WEIGHTS.get(dom_emotion.lower(), 15.0)

        # Generate explainable factor based on dominant affect and score
        if dom_emotion == "Happy":
            factors.append(f"Positive facial affect detected ({dom_emotion} - Low strain)")
        elif dom_emotion == "Neutral":
            factors.append("Neutral facial expression baseline")
        elif dom_emotion in ["Angry", "Fear", "Disgust", "Sad"]:
            factors.append(f"Negative facial valence detected ({dom_emotion} - High physiological strain)")
        else:
            factors.append(f"Elevated facial valence ({dom_emotion})")

    else:
        factors.append("Camera standby - using neutral facial affect baseline")

    # ── 2. Continuous Voice Acoustic Analysis ────────────────────────────────
    voice_score = 10.0  # Default baseline
    voice_conf = 80.0
    voice_active = False

    if voice_data and voice_data.get("voice_detected", False):
        voice_active = True
        pitch = float(voice_data.get("pitch", 0.0))
        energy = float(voice_data.get("energy", 0.0))
        voice_conf = float(voice_data.get("voice_confidence", 80.0))

        # Continuous energy component (0.0 to 1.0 energy -> 0 to 25 score addition)
        energy_component = energy * 25.0

        # Pitch deviation component (Pitch > 200 Hz adds pitch tension score)
        if pitch > 200.0:
            pitch_component = min(30.0, (pitch - 200.0) * 0.15)
        else:
            pitch_component = 0.0

        voice_score = 10.0 + energy_component + pitch_component

        # Explainable factor generation
        if pitch > 240.0 and energy > 0.65:
            factors.append(f"Elevated vocal pitch ({round(pitch)} Hz) & high voice energy ({round(energy * 100)}%)")
        elif pitch > 220.0:
            factors.append(f"High vocal pitch ({round(pitch)} Hz)")
        elif energy > 0.65:
            factors.append(f"High vocal energy ({round(energy * 100)}%)")
        else:
            factors.append(f"Stable vocal resonance ({round(pitch)} Hz, {round(energy * 100)}% energy)")
    else:
        factors.append("Silence / Microphone standby - using voice baseline")

    # ── 3. Weighted Multimodal Signal Fusion (60% Face + 40% Voice) ─────────
    if voice_active and emotion_data and emotion_data.get("face_detected", False):
        # Full multimodal fusion active
        raw_risk = (emotion_score * 0.60) + (voice_score * 0.40)
        combined_conf = (face_conf * 0.55) + (voice_conf * 0.45)
    elif emotion_data and emotion_data.get("face_detected", False):
        # Face only active
        raw_risk = emotion_score
        combined_conf = face_conf
    elif voice_active:
        # Voice only active
        raw_risk = voice_score * 1.5
        combined_conf = voice_conf
    else:
        # Standby default
        raw_risk = 15.0
        combined_conf = 80.0

    # Clamp risk score to 0 - 100 integer range
    final_risk_score = int(round(max(0, min(100, raw_risk))))
    final_confidence = round(max(0.0, min(100.0, combined_conf)), 1)

    # ── 4. Map Risk Score to Categorical Stress Level ───────────────────────
    if final_risk_score <= 25:
        stress_level = "Low"
    elif final_risk_score <= 50:
        stress_level = "Moderate"
    elif final_risk_score <= 75:
        stress_level = "High"
    else:
        stress_level = "Critical"

    return final_risk_score, stress_level, final_confidence, factors
