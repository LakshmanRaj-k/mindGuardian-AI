"""
MindGuardian AI - FastAPI Application Entry Point
Blueprint 1.0 Baseline & Blueprint 2.0 Hackathon Architecture
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.endpoints.health import router as health_router
from app.api.v1.endpoints.emotion import router as emotion_router
from app.api.v1.endpoints.voice import router as voice_router
from app.api.v1.endpoints.stress import router as stress_router
from app.api.v1.endpoints.recommendation import router as recommendation_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="MindGuardian AI - Physiological Stress Detection API Baseline"
)

# Enable CORS for Frontend Communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Health, Emotion, Voice, Stress & Recommendation Endpoints at root level and api/v1 level
app.include_router(health_router, tags=["Health"])
app.include_router(health_router, prefix=settings.API_V1_STR, tags=["Health V1"])
app.include_router(emotion_router, tags=["Emotion Analysis"])
app.include_router(emotion_router, prefix=settings.API_V1_STR, tags=["Emotion Analysis V1"])
app.include_router(voice_router, tags=["Voice Analysis"])
app.include_router(voice_router, prefix=settings.API_V1_STR, tags=["Voice Analysis V1"])
app.include_router(stress_router, tags=["Stress Fusion"])
app.include_router(stress_router, prefix=settings.API_V1_STR, tags=["Stress Fusion V1"])
app.include_router(recommendation_router, tags=["Adaptive Intervention"])
app.include_router(recommendation_router, prefix=settings.API_V1_STR, tags=["Adaptive Intervention V1"])

@app.get("/", include_in_schema=False)
def root():
    """Root redirect endpoint pointing to system health status."""
    return {
        "status": "online",
        "project": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs_url": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
