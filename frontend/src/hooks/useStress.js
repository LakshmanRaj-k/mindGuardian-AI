import { useState, useEffect, useRef } from 'react';
import { analyzeStressFusion, generateRecommendation } from '../services/api';

/**
 * Custom hook orchestrating real-time multimodal stress fusion & recommendations
 */
export const useStress = (emotionData, latestVoiceData) => {
  const [stressData, setStressData] = useState(null);
  const [recommendationData, setRecommendationData] = useState(null);
  const isStressProcessingRef = useRef(false);
  const prevRiskScoreRef = useRef(null);

  // Trigger stress fusion whenever emotion or voice updates
  useEffect(() => {
    if (!emotionData && !latestVoiceData) {
      setStressData(null);
      prevRiskScoreRef.current = null;
      return;
    }

    if (isStressProcessingRef.current) return;

    const runFusion = async () => {
      try {
        isStressProcessingRef.current = true;
        const result = await analyzeStressFusion(emotionData, latestVoiceData);
        if (result && typeof result.risk_score === 'number') {
          let smoothedScore = result.risk_score;
          if (prevRiskScoreRef.current !== null) {
            smoothedScore = Math.round(0.35 * result.risk_score + 0.65 * prevRiskScoreRef.current);
          }
          prevRiskScoreRef.current = smoothedScore;

          let smoothedLevel = 'Low';
          if (smoothedScore <= 25) smoothedLevel = 'Low';
          else if (smoothedScore <= 50) smoothedLevel = 'Moderate';
          else if (smoothedScore <= 75) smoothedLevel = 'High';
          else smoothedLevel = 'Critical';

          setStressData({
            ...result,
            risk_score: smoothedScore,
            stress_level: smoothedLevel,
          });
        }
      } catch (err) {
        console.error('Stress fusion error:', err);
      } finally {
        isStressProcessingRef.current = false;
      }
    };

    runFusion();
  }, [emotionData, latestVoiceData]);

  // Trigger recommendation generation whenever stressData updates
  useEffect(() => {
    if (!stressData) {
      setRecommendationData(null);
      return;
    }

    const runRecommendation = async () => {
      try {
        const result = await generateRecommendation(stressData);
        if (result) {
          setRecommendationData(result);
        }
      } catch (err) {
        console.error('Recommendation error:', err);
      }
    };

    runRecommendation();
  }, [stressData]);

  return { stressData, recommendationData };
};

export default useStress;
