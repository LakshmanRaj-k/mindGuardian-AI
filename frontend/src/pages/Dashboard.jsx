import React, { useState, useEffect, useCallback } from 'react';

// Layout & System Bars
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SystemStatusBar from '../components/layout/SystemStatusBar';

// Banners & Developer Panel
import HeroBanner from '../components/HeroBanner';
import DeveloperModePanel from '../components/DeveloperModePanel';

// Primary Cards
import CameraCard from '../components/cards/CameraCard';
import EmotionCard from '../components/cards/EmotionCard';
import VoiceCard from '../components/cards/VoiceCard';
import StressCard from '../components/cards/StressCard';
import WellnessCard from '../components/cards/WellnessCard';

// Interactive Components
import BreathingExerciseCard from '../components/BreathingExerciseCard';

// Custom Hooks
import useCamera from '../hooks/useCamera';
import useEmotion from '../hooks/useEmotion';
import useVoice from '../hooks/useVoice';
import useStress from '../hooks/useStress';

// API
import { fetchHealthStatus } from '../services/api';

/**
 * Redesigned SaaS Dashboard Page Component (Blueprint 8.1 Specification)
 */
export const Dashboard = () => {
  // Developer Mode Toggle State
  const [isDevMode, setIsDevMode] = useState(false);

  // Backend Health Connection State
  const [backendState, setBackendState] = useState({
    connected: false,
    data: { status: 'offline', project: 'MindGuardian AI', version: '1.0' },
    error: null,
    lastChecked: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [analysisCount, setAnalysisCount] = useState(0);

  // Single health check trigger
  const checkBackendHealth = useCallback(async () => {
    setIsLoading(true);
    const result = await fetchHealthStatus();
    setBackendState({
      connected: result.connected,
      data: result.data,
      error: result.error,
      lastChecked: new Date(),
    });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkBackendHealth();
  }, [checkBackendHealth]);

  // 1. Camera Hook
  const { videoRef, isCameraActive, handleStreamChange } = useCamera();

  // Analysis Counter Increment Callback
  const handleAnalysisComplete = useCallback(() => {
    setAnalysisCount((prev) => prev + 1);
  }, []);

  // 2. Emotion Hook
  const { emotionData, isAnalyzing } = useEmotion(videoRef, isCameraActive, handleAnalysisComplete);

  // 3. Voice Hook
  const { latestVoiceData, handleVoiceData } = useVoice();

  const handleVoiceWithCounter = useCallback(
    (data) => {
      handleVoiceData(data);
      if (data) {
        setAnalysisCount((prev) => prev + 1);
      }
    },
    [handleVoiceData]
  );

  // 4. Stress & Recommendation Hook
  const { stressData, recommendationData } = useStress(emotionData, latestVoiceData);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between selection:bg-blue-500 selection:text-white font-sans">
      {/* 1. Header Navigation */}
      <Header
        isConnected={backendState.connected}
        isDevMode={isDevMode}
        onToggleDevMode={() => setIsDevMode(!isDevMode)}
      />

      {/* Main Dashboard Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6 flex-grow w-full">
        {/* 2. System Status Bar */}
        <SystemStatusBar
          isCameraActive={isCameraActive}
          isMicActive={Boolean(latestVoiceData)}
          isFaceDetected={Boolean(emotionData?.face_detected)}
          isVoiceDetected={Boolean(latestVoiceData?.voice_detected)}
          isStressEngineActive={Boolean(stressData)}
        />

        {/* 3. Compact 3-Line Hero Banner */}
        <HeroBanner />

        {/* 4. Sensing Grid (Left ~40%: Camera & Voice, Right ~60%: Emotion) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Live Camera & Microphone (~5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <CameraCard ref={videoRef} onStreamChange={handleStreamChange} />
            <VoiceCard onVoiceData={handleVoiceWithCounter} />
          </div>

          {/* Right Column: Emotion Analysis (~7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <EmotionCard emotionData={emotionData} isAnalyzing={isAnalyzing} />
          </div>
        </section>

        {/* 5. Full Width Dominant Stress Assessment Card with Large Animated Radial Gauge */}
        <section className="w-full">
          <StressCard stressData={stressData} isAnalyzing={isAnalyzing} />
        </section>

        {/* 6. Adaptive AI Recommendations & Biofeedback Breathing Suite */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <WellnessCard recommendationData={recommendationData} stressData={stressData} />
          </div>
          <div className="lg:col-span-5">
            <BreathingExerciseCard targetDuration={recommendationData?.breathing_duration || 60} />
          </div>
        </section>

        {/* 7. Collapsible Developer & Telemetry Panel */}
        {isDevMode && (
          <DeveloperModePanel
            backendState={backendState}
            checkBackendHealth={checkBackendHealth}
            isLoading={isLoading}
            analysisCount={analysisCount}
            stressLevel={stressData?.stress_level || 'Low'}
            dominantEmotion={emotionData?.dominant_emotion || 'Neutral'}
            isVoiceActive={Boolean(latestVoiceData?.voice_detected)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
