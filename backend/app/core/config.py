"""
Core Application Configuration Settings for MindGuardian AI Backend
"""

from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "MindGuardian AI"
    VERSION: str = "1.0"
    API_V1_STR: str = "/api/v1"
    
    # CORS Origins allowed to communicate with the FastAPI backend
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]

    class Config:
        case_sensitive = True

settings = Settings()
