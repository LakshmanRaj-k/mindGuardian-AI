"""
Adaptive Recommendation Endpoint Router
MindGuardian AI - Blueprint 7.0
"""

from fastapi import APIRouter, status
from app.schemas.recommendation import RecommendationRequest, RecommendationResponse
from models.recommendation.intervention_engine import generate_adaptive_intervention

router = APIRouter()


@router.post(
    "/recommendation/generate",
    response_model=RecommendationResponse,
    summary="Generate Adaptive Wellness Intervention",
    status_code=status.HTTP_200_OK
)
def generate_recommendation(request: RecommendationRequest) -> RecommendationResponse:
    """
    Blueprint 7.0 Adaptive Wellness Intervention Engine Endpoint.

    Accepts structured stress assessment payload from Blueprint 6,
    maps to context-aware wellness guidance, and returns:
      - wellness_level (Optimal Balance, Needs Attention, High Strain Detected, Severe Acute Tension)
      - interventions (List of actionable steps)
      - wellness_tip (Cognitive recovery tip)
      - hydration_reminder (bool)
      - breathing_duration (seconds)

    Privacy Guarantee: 100% In-Memory Processing. No data saved, stored, or transmitted externally.
    """
    try:
        result = generate_adaptive_intervention(
            stress_level=request.stress_level,
            risk_score=request.risk_score,
            confidence=request.confidence,
            contributing_factors=request.contributing_factors
        )
        return RecommendationResponse(**result)
    except Exception as e:
        return RecommendationResponse(
            wellness_level="Optimal Balance",
            interventions=["Maintain current healthy pace."],
            wellness_tip="Take regular short breaks.",
            hydration_reminder=True,
            breathing_duration=60,
            message=f"Recommendation engine error: {str(e)}",
            error="RECOMMENDATION_ERROR"
        )
