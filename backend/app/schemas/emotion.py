"""
Pydantic Schemas for Facial Emotion Recognition API
MindGuardian AI - Blueprint 4.0
"""

from typing import Dict, Optional
from pydantic import BaseModel, Field

class EmotionRequest(BaseModel):
    image_base64: str = Field(
        ...,
        description="Base64 encoded JPEG/PNG video frame snapshot captured from client canvas"
    )

    class Config:
        json_schema_extra = {
            "example": {
                "image_base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..."
            }
        }

class EmotionResponse(BaseModel):
    face_detected: bool = Field(..., description="True if a face was detected and analyzed in the frame")
    dominant_emotion: str = Field(default="Neutral", description="Dominant emotion label (e.g. Happy, Neutral, Sad, Angry, Fear, Surprise, Disgust)")
    confidence: float = Field(default=0.0, description="Confidence score percentage for the dominant emotion (0.0 - 100.0)")
    emotions: Dict[str, float] = Field(default_factory=dict, description="Dictionary of all 7 emotion probability percentages")
    message: str = Field(..., description="Human readable status message")
    error: Optional[str] = Field(None, description="Error code if processing failed (MODEL_NOT_READY, INVALID_IMAGE, FACE_NOT_FOUND, INFERENCE_ERROR)")

    class Config:
        json_schema_extra = {
            "example": {
                "face_detected": True,
                "dominant_emotion": "Happy",
                "confidence": 94.5,
                "emotions": {
                    "happy": 94.5,
                    "neutral": 3.1,
                    "sad": 1.2,
                    "angry": 0.4,
                    "fear": 0.2,
                    "surprise": 0.3,
                    "disgust": 0.3
                },
                "message": "Face analyzed successfully.",
                "error": None
            }
        }
