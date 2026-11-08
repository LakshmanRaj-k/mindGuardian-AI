"""
Pydantic Schemas for Multimodal Stress Fusion API
MindGuardian AI - Blueprint 6.0
"""

from typing import List, Dict, Optional
from pydantic import BaseModel, Field


class EmotionInput(BaseModel):
    dominant_emotion: str = Field(default="Neutral", description="Dominant emotion label")
    confidence: float = Field(default=0.0, description="Emotion confidence percentage (0-100)")
    emotions: Dict[str, float] = Field(default_factory=dict, description="Distribution of emotion probabilities")


class VoiceInput(BaseModel):
    voice_detected: bool = Field(default=False, description="True if voice activity detected")
    pitch: float = Field(default=0.0, description="Fundamental pitch frequency in Hz")
    energy: float = Field(default=0.0, description="Normalized RMS energy (0.0 - 1.0)")
    voice_confidence: float = Field(default=0.0, description="Voice quality confidence (0-100)")


class StressRequest(BaseModel):
    emotion: Optional[EmotionInput] = Field(None, description="Facial emotion analysis payload from Blueprint 4")
    voice: Optional[VoiceInput] = Field(None, description="Voice feature analysis payload from Blueprint 5")

    class Config:
        json_schema_extra = {
            "example": {
                "emotion": {
                    "dominant_emotion": "Neutral",
                    "confidence": 92.5,
                    "emotions": {"neutral": 92.5, "happy": 4.1, "sad": 3.4}
                },
                "voice": {
                    "voice_detected": True,
                    "pitch": 184.2,
                    "energy": 0.45,
                    "voice_confidence": 91.0
                }
            }
        }


class StressResponse(BaseModel):
    stress_level: str = Field(..., description="Categorical stress level: Low, Moderate, High, or Critical")
    risk_score: int = Field(..., description="Numerical risk score between 0 and 100")
    confidence: float = Field(..., description="Combined weighted confidence percentage (0.0 - 100.0)")
    contributing_factors: List[str] = Field(..., description="Explainable list of contributing indicators")
    timestamp: str = Field(..., description="ISO 8601 timestamp of analysis")
    message: str = Field(..., description="Human readable analysis status message")
    error: Optional[str] = Field(None, description="Error code if processing failed")

    class Config:
        json_schema_extra = {
            "example": {
                "stress_level": "Low",
                "risk_score": 24,
                "confidence": 93.0,
                "contributing_factors": [
                    "Neutral facial expression baseline",
                    "Stable vocal pitch (184 Hz)",
                    "Normal voice energy level"
                ],
                "timestamp": "2026-08-07T18:00:00Z",
                "message": "Stress assessment completed.",
                "error": None
            }
        }
