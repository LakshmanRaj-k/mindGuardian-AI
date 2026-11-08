"""
Pydantic Schemas for Real-Time Voice Analysis API
MindGuardian AI - Blueprint 5.0
"""

from typing import Optional
from pydantic import BaseModel, Field


class VoiceRequest(BaseModel):
    """
    Incoming audio payload from the browser.
    audio_base64: Raw PCM Float32 samples encoded as Base64.
                  The browser sends a Float32Array buffer directly — no codec, no container.
    sample_rate: The AudioContext.sampleRate reported by the browser (typically 44100 or 48000).
    """
    audio_base64: str = Field(..., description="Base64 encoded Float32 PCM audio samples")
    sample_rate: int = Field(default=44100, description="Sample rate of the audio (Hz)")

    class Config:
        json_schema_extra = {
            "example": {
                "audio_base64": "AAAA...",
                "sample_rate": 44100
            }
        }


class VoiceResponse(BaseModel):
    """
    Structured voice metrics returned after feature extraction.
    These metrics are consumed by Blueprint 6 (Stress Fusion Engine).
    No stress prediction is performed here.
    """
    voice_detected: bool = Field(..., description="True if voice activity was detected in the audio chunk")
    pitch: float = Field(default=0.0, description="Estimated fundamental frequency in Hz (0 if no voice)")
    energy: float = Field(default=0.0, description="Normalized RMS energy level (0.0 to 1.0)")
    voice_confidence: float = Field(default=0.0, description="Voice quality confidence score (0.0 to 100.0)")
    message: str = Field(..., description="Human-readable analysis status message")
    error: Optional[str] = Field(None, description="Error code if analysis failed")

    class Config:
        json_schema_extra = {
            "example": {
                "voice_detected": True,
                "pitch": 184.2,
                "energy": 0.74,
                "voice_confidence": 95.1,
                "message": "Voice analyzed successfully.",
                "error": None
            }
        }
