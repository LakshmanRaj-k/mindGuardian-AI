"""
Emotion Analysis Endpoint Router
MindGuardian AI - Blueprint 4.0
"""

from fastapi import APIRouter, HTTPException, status
from app.schemas.emotion import EmotionRequest, EmotionResponse
from models.face.emotion_analyzer import analyze_emotion_from_base64

router = APIRouter()

@router.post(
    "/emotion/analyze",
    response_model=EmotionResponse,
    summary="Analyze Facial Emotion from Base64 Frame",
    status_code=status.HTTP_200_OK
)
def analyze_emotion(request: EmotionRequest) -> EmotionResponse:
    """
    Blueprint 4.0 Real-Time Facial Emotion Analysis Endpoint.
    
    Accepts Base64 JPEG frame snapshot, decodes in-memory, identifies the largest face,
    and returns dominant emotion, confidence score, and emotion probability distribution.
    
    Privacy Guarantee: No image is stored on disk or transmitted externally.
    """
    if not request.image_base64:
        return EmotionResponse(
            face_detected=False,
            dominant_emotion="Neutral",
            confidence=0.0,
            emotions={},
            message="Base64 image payload cannot be empty.",
            error="INVALID_IMAGE"
        )

    try:
        result = analyze_emotion_from_base64(request.image_base64)
        return EmotionResponse(**result)
    except Exception as e:
        return EmotionResponse(
            face_detected=False,
            dominant_emotion="Neutral",
            confidence=0.0,
            emotions={},
            message=f"Inference error occurred: {str(e)}",
            error="INFERENCE_ERROR"
        )
