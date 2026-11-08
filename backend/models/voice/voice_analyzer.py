"""
High-Accuracy Real-Time Voice Feature Extraction Engine
MindGuardian AI - Blueprint 5.0 (Enhanced Precision)

Uses YIN Algorithm (Cumulative Mean Normalized Difference Function + Parabolic Interpolation)
and Bandpass Pre-Filtering for high-precision pitch (F0) estimation and calibrated energy calculation.

Privacy Guarantee:
  - 100% In-Memory Processing.
  - Zero audio files written to disk.
  - Zero recordings stored.
  - Audio bytes discarded immediately after analysis.

Python 3.14 Compatible: uses numpy & scipy for sub-sample accuracy.
"""

import base64
import numpy as np
from typing import Dict, Any, Tuple

# ── Voice Activity Detection (VAD) & Human Pitch Parameters ────────────────────
PITCH_MIN_HZ = 75.0      # Lower bound: deep male voice
PITCH_MAX_HZ = 450.0     # Upper bound: high female/child voice
SILENCE_RMS_THRESH = 0.006  # Noise floor threshold (RMS)
YIN_DIP_THRESHOLD = 0.15   # YIN absolute threshold for dip selection


def analyze_voice_from_base64(audio_base64: str, sample_rate: int = 44100) -> Dict[str, Any]:
    """
    Main entry point for voice feature extraction.

    Decodes Base64-encoded Float32 PCM audio in-memory,
    applies DC-removal & bandpass pre-filtering,
    performs YIN-based fundamental frequency (F0) pitch estimation,
    calibrates RMS energy to a logarithmic scale, and computes voice confidence.

    Args:
        audio_base64: Base64 string of a Float32Array PCM buffer from the browser.
        sample_rate:  AudioContext.sampleRate (e.g., 44100 or 48000).

    Returns:
        Dict matching VoiceResponse schema.
    """
    # 1. Validate & decode Base64 → Float32 numpy array
    if not audio_base64:
        return _error_response("INVALID_AUDIO", "Audio payload is empty.")

    try:
        raw_bytes = base64.b64decode(audio_base64)
        samples = np.frombuffer(raw_bytes, dtype=np.float32).copy()
    except Exception as e:
        return _error_response("INVALID_AUDIO", f"Base64 decode failed: {str(e)}")

    # 2. Validate minimum duration
    if len(samples) < sample_rate * 0.1:
        return _error_response("AUDIO_TOO_SHORT", "Audio chunk is too short for analysis.")

    # 3. DC Offset Removal (center around zero)
    samples = samples - np.mean(samples)

    # 4. Measure overall RMS energy
    rms = float(np.sqrt(np.mean(samples ** 2)))

    if rms < SILENCE_RMS_THRESH:
        return {
            "voice_detected": False,
            "pitch": 0.0,
            "energy": round(float(rms), 4),
            "voice_confidence": 0.0,
            "message": "No voice detected (Silence).",
            "error": None
        }

    # 5. Pre-filter audio (Bandpass filter between 70Hz and 3500Hz using FFT)
    filtered_samples = _bandpass_filter(samples, sample_rate, lowcut=70.0, highcut=3500.0)

    # 6. YIN Fundamental Frequency (Pitch) Estimation
    try:
        pitch_hz, periodicity_conf = _estimate_pitch_yin(filtered_samples, sample_rate)
    except Exception as e:
        return _error_response("ANALYSIS_ERROR", f"YIN pitch extraction error: {str(e)}")

    # 7. Voice Activity Detection (VAD) verification
    # Voice is confirmed if periodicity is high OR energy is sufficiently strong
    voice_detected = (periodicity_conf > 30.0 and pitch_hz >= PITCH_MIN_HZ) or (rms > 0.025 and pitch_hz >= PITCH_MIN_HZ)

    if not voice_detected:
        return {
            "voice_detected": False,
            "pitch": 0.0,
            "energy": round(min(1.0, float(rms) / 0.05), 3),
            "voice_confidence": round(periodicity_conf, 1),
            "message": "No human voice detected.",
            "error": None
        }

    # 8. Logarithmic Decibel (dBFS) Calibrated Energy (0.0 to 1.0)
    # Maps -50 dBFS (quiet speech) to 0.0 and -10 dBFS (loud speech) to 1.0
    db_fs = 20.0 * np.log10(max(rms, 1e-6))
    energy_calibrated = float(np.clip((db_fs + 50.0) / 40.0, 0.0, 1.0))

    # 9. Compute Overall Voice Confidence (0–100%)
    voice_confidence = round(float(np.clip(periodicity_conf * 0.7 + energy_calibrated * 30.0, 0.0, 100.0)), 1)

    return {
        "voice_detected": True,
        "pitch": round(float(pitch_hz), 1),
        "energy": round(energy_calibrated, 3),
        "voice_confidence": voice_confidence,
        "message": "Voice analyzed successfully (High Precision YIN Engine).",
        "error": None
    }


def _bandpass_filter(samples: np.ndarray, sample_rate: int, lowcut: float, highcut: float) -> np.ndarray:
    """Fast FFT bandpass filter to isolate human vocal fundamental frequencies."""
    n = len(samples)
    fft_vals = np.fft.rfft(samples)
    freqs = np.fft.rfftfreq(n, d=1.0 / sample_rate)

    # Attenuate frequencies outside vocal range
    mask = (freqs >= lowcut) & (freqs <= highcut)
    fft_vals[~mask] *= 0.05

    return np.fft.irfft(fft_vals, n=n)


def _estimate_pitch_yin(samples: np.ndarray, sample_rate: int) -> Tuple[float, float]:
    """
    High-accuracy YIN Pitch Estimation Algorithm.
    
    Steps:
      1. Compute Difference Function d(tau) using FFT.
      2. Compute Cumulative Mean Normalized Difference Function d'(tau) (CMNDF).
      3. Absolute Thresholding to select first dip below threshold (eliminates octave errors).
      4. Parabolic Interpolation around the minimum for sub-sample decimal Hz accuracy.
    
    Returns:
        Tuple of (pitch_hz: float, confidence_percent: float 0-100)
    """
    n = len(samples)
    # Window size for analysis (1 second max)
    w_size = min(n // 2, sample_rate)
    if w_size < 200:
        return 0.0, 0.0

    x = samples[:w_size]

    # Sample lag bounds for human pitch
    tau_min = max(2, int(sample_rate / PITCH_MAX_HZ))  # 450 Hz -> ~98 samples at 44.1k
    tau_max = min(w_size - 1, int(sample_rate / PITCH_MIN_HZ))  # 75 Hz -> ~588 samples at 44.1k

    if tau_min >= tau_max:
        return 0.0, 0.0

    # Step 1: Compute Difference Function d(tau) via FFT
    # d(tau) = sum_{j=1}^{W} (x[j] - x[j + tau])^2
    # Expanding: d(tau) = r(0) + r_shifted(0) - 2 * r(tau)
    fft_size = 1 << int(np.ceil(np.log2(2 * w_size)))
    fft_x = np.fft.rfft(x, n=fft_size)
    r = np.fft.irfft(fft_x * np.conj(fft_x))[:w_size]

    # Energy terms
    cum_energy = np.cumsum(x ** 2)
    cum_energy = np.pad(cum_energy, (1, 0))

    d = np.zeros(tau_max + 1, dtype=np.float64)
    for tau in range(1, tau_max + 1):
        energy_term = cum_energy[w_size] - cum_energy[tau] + cum_energy[w_size - tau]
        d[tau] = energy_term - 2.0 * r[tau]

    # Step 2: Cumulative Mean Normalized Difference Function (CMNDF)
    d_prime = np.ones(tau_max + 1, dtype=np.float64)
    running_sum = 0.0

    for tau in range(1, tau_max + 1):
        running_sum += d[tau]
        if running_sum > 1e-10:
            d_prime[tau] = d[tau] * tau / running_sum
        else:
            d_prime[tau] = 1.0

    # Step 3: Absolute Thresholding to select first dip below threshold (prevents octave errors)
    best_tau = 0
    tau = tau_min

    while tau < tau_max:
        if d_prime[tau] < YIN_DIP_THRESHOLD:
            # Find local minimum in this dip
            while tau + 1 < tau_max and d_prime[tau + 1] < d_prime[tau]:
                tau += 1
            best_tau = tau
            break
        tau += 1

    # Fallback to global minimum if no dip fell below absolute threshold
    if best_tau == 0:
        valid_range = d_prime[tau_min:tau_max + 1]
        if len(valid_range) > 0:
            best_tau = int(np.argmin(valid_range)) + tau_min

    if best_tau == 0 or best_tau >= tau_max:
        return 0.0, 0.0

    # Step 4: Parabolic Interpolation for sub-sample accuracy
    x0 = best_tau - 1 if best_tau > tau_min else best_tau
    x2 = best_tau + 1 if best_tau < tau_max else best_tau
    x1 = best_tau

    if x0 != x1 and x1 != x2:
        y0, y1, y2 = d_prime[x0], d_prime[x1], d_prime[x2]
        denom = 2.0 * (y0 - 2.0 * y1 + y2)
        if abs(denom) > 1e-6:
            better_tau = x1 - (y2 - y0) / denom
        else:
            better_tau = float(best_tau)
    else:
        better_tau = float(best_tau)

    # Calculate exact fundamental frequency pitch in Hz
    pitch_hz = sample_rate / better_tau

    # Convert YIN CMNDF value (0.0 = perfect periodic, 1.0 = aperiodic noise) to confidence percentage
    cmndf_val = d_prime[best_tau]
    confidence_percent = max(0.0, min(100.0, (1.0 - cmndf_val) * 100.0))

    return pitch_hz, confidence_percent


def _error_response(error_code: str, message: str) -> Dict[str, Any]:
    """Returns a standardized error response dict."""
    return {
        "voice_detected": False,
        "pitch": 0.0,
        "energy": 0.0,
        "voice_confidence": 0.0,
        "message": message,
        "error": error_code
    }
