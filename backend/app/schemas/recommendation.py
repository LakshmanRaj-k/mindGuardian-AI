"""
Pydantic Schemas for Adaptive Wellness Intervention API
MindGuardian AI - Blueprint 7.0
"""

from typing import List, Optional
from pydantic import BaseModel, Field


class RecommendationRequest(BaseModel):
    stress_level: str = Field(default="Low", description="Categorical stress level from Blueprint 6: Low, Moderate, High, or Critical")
    risk_score: int = Field(default=0, description="Risk score from 0 to 100")
    confidence: float = Field(default=0.0, description="Combined confidence percentage")
    contributing_factors: List[str] = Field(default_factory=list, description="Traceable contributing indicators")

    class Config:
        json_schema_extra = {
            "example": {
                "stress_level": "Moderate",
                "risk_score": 48,
                "confidence": 92.5,
                "contributing_factors": [
                    "Elevated vocal pitch (245 Hz)",
                    "Sad facial affect detected"
                ]
            }
        }


class RecommendationResponse(BaseModel):
    wellness_level: str = Field(..., description="Categorical wellness status: Optimal Balance, Needs Attention, High Strain Detected, or Severe Acute Tension")
    interventions: List[str] = Field(..., description="Actionable personalized wellness recommendations")
    wellness_tip: str = Field(..., description="Short cognitive recovery tip")
    hydration_reminder: bool = Field(default=True, description="True if hydration is suggested")
    breathing_duration: int = Field(default=60, description="Recommended breathing exercise duration in seconds")
    message: str = Field(..., description="Status message")
    error: Optional[str] = Field(None, description="Error code if processing failed")

    class Config:
        json_schema_extra = {
            "example": {
                "wellness_level": "Needs Attention",
                "interventions": [
                    "Take a 2-minute posture break.",
                    "Drink a glass of water.",
                    "Perform a 60-second guided breathing exercise."
                ],
                "wellness_tip": "Short recovery breaks improve focus and reduce mental fatigue.",
                "hydration_reminder": True,
                "breathing_duration": 60,
                "message": "Intervention generated successfully.",
                "error": None
            }
        }
