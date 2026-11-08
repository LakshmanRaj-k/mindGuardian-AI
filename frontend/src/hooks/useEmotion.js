import { useState, useEffect, useRef } from 'react';
import { analyzeEmotionFrame } from '../services/api';

/**
 * Custom hook to run throttled 600ms canvas frame capture for emotion analysis
 */
export const useEmotion = (videoRef, isCameraActive, onAnalysisComplete) => {
  const [emotionData, setEmotionData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const isProcessingFrameRef = useRef(false);

  useEffect(() => {
    if (!isCameraActive) {
      setEmotionData(null);
      setIsAnalyzing(false);
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const captureInterval = setInterval(async () => {
      const videoEl = videoRef.current;
      if (!videoEl || videoEl.paused || videoEl.ended || !videoEl.videoWidth || !videoEl.videoHeight) {
        return;
      }

      if (isProcessingFrameRef.current) return;

      try {
        isProcessingFrameRef.current = true;
        setIsAnalyzing(true);

        canvas.width = videoEl.videoWidth || 640;
        canvas.height = videoEl.videoHeight || 480;

        ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
        const base64Image = canvas.toDataURL('image/jpeg', 0.6);

        const result = await analyzeEmotionFrame(base64Image);
        if (result) {
          setEmotionData(result);
          if (onAnalysisComplete) onAnalysisComplete();
        }
      } catch (err) {
        console.error('Emotion frame capture error:', err);
      } finally {
        isProcessingFrameRef.current = false;
      }
    }, 600);

    return () => {
      clearInterval(captureInterval);
      isProcessingFrameRef.current = false;
    };
  }, [videoRef, isCameraActive, onAnalysisComplete]);

  return { emotionData, isAnalyzing };
};

export default useEmotion;
