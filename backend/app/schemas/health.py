"""
Pydantic Schemas for Health Status Verification
"""

from pydantic import BaseModel

class HealthResponse(BaseModel):
    status: str
    project: str
    version: str

    class Config:
        json_schema_extra = {
            "example": {
                "status": "online",
                "project": "MindGuardian AI",
                "version": "1.0"
            }
        }
