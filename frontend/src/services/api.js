import axios from 'axios';

// Configure Axios instance for MindGuardian AI Backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Single health check call to verify FastAPI backend connectivity.
 * Returns expected JSON payload: { status: "online", project: "MindGuardian AI", version: "1.0" }
 */
export const fetchHealthStatus = async () => {
  try {
    const response = await apiClient.get('/health');
    return {
      connected: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      connected: false,
      data: {
        status: 'offline',
        project: 'MindGuardian AI',
        version: '1.0',
      },
      error: error.message || 'Failed to connect to backend server',
    };
  }
};

/**
 * Transmits a Base64 frame snapshot to FastAPI endpoint for real-time facial emotion recognition.
 * Targets POST /emotion/analyze.
 */
export const analyzeEmotionFrame = async (imageBase64) => {
  try {
    const response = await apiClient.post('/emotion/analyze', {
      image_base64: imageBase64,
    });
    return response.data;
  } catch (error) {
    return {
      face_detected: false,
      dominant_emotion: 'Neutral',
      confidence: 0.0,
      emotions: {},
      message: 'Failed to communicate with emotion analysis backend.',
      error: 'INFERENCE_ERROR',
    };
  }
};

/**
 * Sends a Base64-encoded Float32 PCM audio chunk to POST /voice/analyze.
 * Returns structured voice metrics for Blueprint 5.0 VoiceAnalysisCard.
 */
export const analyzeVoiceChunk = async (audioBase64, sampleRate = 44100) => {
  try {
    const response = await apiClient.post('/voice/analyze', {
      audio_base64: audioBase64,
      sample_rate: sampleRate,
    });
    return response.data;
  } catch (error) {
    return {
      voice_detected: false,
      pitch: 0.0,
      energy: 0.0,
      voice_confidence: 0.0,
      message: 'Failed to communicate with voice analysis backend.',
      error: 'ANALYSIS_ERROR',
    };
  }
};

/**
 * Transmits facial emotion and vocal feature payloads to POST /stress/analyze.
 * Returns multimodal stress assessment for Blueprint 6.0.
 */
export const analyzeStressFusion = async (emotionData, voiceData) => {
  try {
    const response = await apiClient.post('/stress/analyze', {
      emotion: emotionData || null,
      voice: voiceData || null,
    });
    return response.data;
  } catch (error) {
    return {
      stress_level: 'Low',
      risk_score: 0,
      confidence: 0.0,
      contributing_factors: ['Failed to communicate with stress fusion backend.'],
      timestamp: new Date().toISOString(),
      message: 'Stress fusion offline.',
      error: 'FUSION_ERROR',
    };
  }
};

/**
 * Transmits structured stress assessment payload to POST /recommendation/generate.
 * Returns context-aware wellness guidance for Blueprint 7.0 WellnessCard.
 */
export const generateRecommendation = async (stressData) => {
  try {
    const response = await apiClient.post('/recommendation/generate', {
      stress_level: stressData?.stress_level || 'Low',
      risk_score: stressData?.risk_score || 0,
      confidence: stressData?.confidence || 0.0,
      contributing_factors: stressData?.contributing_factors || [],
    });
    return response.data;
  } catch (error) {
    return {
      wellness_level: 'Optimal Balance',
      interventions: ['Maintain current healthy pace.'],
      wellness_tip: 'Take regular short breaks.',
      hydration_reminder: true,
      breathing_duration: 60,
      message: 'Failed to communicate with recommendation backend.',
      error: 'RECOMMENDATION_ERROR',
    };
  }
};



