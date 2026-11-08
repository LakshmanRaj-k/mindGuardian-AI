"""
Multimodal Stress Fusion Engine
MindGuardian AI - Blueprint 6.0

Fuses structured facial emotion data and structured vocal acoustic features
into an explainable, deterministic stress assessment.
"""

from datetime import datetime, timezone
from typing import Dict, Any
from models.stress.risk_calculator import calculate_multimodal_stress


def fuse_multimodal_stress(
    emotion_payload: Dict[str, Any] = None,
    voice_payload: Dict[str, Any] = None
) -> Dict[str, Any]:
    """
    Main entry point for multimodal stress fusion.
    
    Args:
        emotion_payload: Dict from Blueprint 4 (dominant_emotion, confidence, emotions)
        voice_payload: Dict from Blueprint 5 (voice_detected, pitch, energy, voice_confidence)
        
    Returns:
        Dict matching StressResponse schema.
    """
    risk_score, stress_level, confidence, factors = calculate_multimodal_stress(
        emotion_data=emotion_payload,
        voice_data=voice_payload
    )

    now_iso = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    return {
        "stress_level": stress_level,
        "risk_score": risk_score,
        "confidence": confidence,
        "contributing_factors": factors,
        "timestamp": now_iso,
        "message": "Stress assessment completed successfully.",
        "error": None
    }
