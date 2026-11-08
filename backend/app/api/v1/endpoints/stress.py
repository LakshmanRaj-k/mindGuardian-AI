"""
Multimodal Stress Fusion Endpoint Router
MindGuardian AI - Blueprint 6.0
"""

from fastapi import APIRouter, status
from app.schemas.stress import StressRequest, StressResponse
from models.stress.fusion_engine import fuse_multimodal_stress

router = APIRouter()


@router.post(
    "/stress/analyze",
    response_model=StressResponse,
    summary="Analyze Multimodal Physiological Stress",
    status_code=status.HTTP_200_OK
)
def analyze_stress(request: StressRequest) -> StressResponse:
    """
    Blueprint 6.0 Multimodal Stress Fusion Endpoint.

    Accepts facial emotion analysis and voice feature payloads,
    runs rule-based multimodal risk fusion, and returns:
      - stress_level (Low, Moderate, High, Critical)
      - risk_score (0 - 100)
      - confidence (%)
      - contributing_factors (list of explainable indicators)
      - timestamp (ISO 8601)

    Privacy Guarantee: 100% In-Memory Processing. No persistent data storage.
    """
    try:
        emotion_dict = request.emotion.dict() if request.emotion else None
        voice_dict = request.voice.dict() if request.voice else None

        result = fuse_multimodal_stress(
            emotion_payload=emotion_dict,
            voice_payload=voice_dict
        )
        return StressResponse(**result)
    except Exception as e:
        return StressResponse(
            stress_level="Low",
            risk_score=0,
            confidence=0.0,
            contributing_factors=["Fusion error occurred"],
            timestamp="",
            message=f"Stress analysis failed: {str(e)}",
            error="FUSION_ERROR"
        )
