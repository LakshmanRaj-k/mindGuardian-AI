"""
Voice Analysis Endpoint Router
MindGuardian AI - Blueprint 5.0

Exposes POST /voice/analyze for real-time voice feature extraction.
Consumes raw PCM Float32 audio chunks from the browser.
Returns structured voice metrics for Blueprint 6 (Stress Fusion Engine).
"""

from fastapi import APIRouter, status
from app.schemas.voice import VoiceRequest, VoiceResponse
from models.voice.voice_analyzer import analyze_voice_from_base64

router = APIRouter()


@router.post(
    "/voice/analyze",
    response_model=VoiceResponse,
    summary="Extract Voice Features from PCM Audio Chunk",
    status_code=status.HTTP_200_OK
)
def analyze_voice(request: VoiceRequest) -> VoiceResponse:
    """
    Blueprint 5.0 Real-Time Voice Feature Extraction Endpoint.

    Accepts a 2-second Base64-encoded Float32 PCM audio chunk from the browser,
    performs in-memory analysis, and returns:
      - voice_detected (bool)
      - pitch (Hz)
      - energy (0.0–1.0)
      - voice_confidence (0–100)
      - message (str)

    Privacy Guarantee: Audio is decoded in-memory and discarded immediately.
    No audio files are saved, recorded, or transmitted externally.
    """
    if not request.audio_base64:
        return VoiceResponse(
            voice_detected=False,
            pitch=0.0,
            energy=0.0,
            voice_confidence=0.0,
            message="Audio payload cannot be empty.",
            error="INVALID_AUDIO"
        )

    try:
        result = analyze_voice_from_base64(
            audio_base64=request.audio_base64,
            sample_rate=request.sample_rate
        )
        return VoiceResponse(**result)
    except Exception as e:
        return VoiceResponse(
            voice_detected=False,
            pitch=0.0,
            energy=0.0,
            voice_confidence=0.0,
            message=f"Voice analysis error: {str(e)}",
            error="ANALYSIS_ERROR"
        )
