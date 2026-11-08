"""
Health Check Endpoint Router for MindGuardian AI
"""

from fastapi import APIRouter
from app.schemas.health import HealthResponse
from app.core.config import settings

router = APIRouter()

@router.get("/health", response_model=HealthResponse, summary="Retrieve Backend Health Status")
def get_health_status() -> HealthResponse:
    """
    Blueprint 1.0 & 2.0 Health Check Endpoint.
    Verifies that the FastAPI backend is online and responding.
    """
    return HealthResponse(
        status="online",
        project=settings.PROJECT_NAME,
        version=settings.VERSION
    )
