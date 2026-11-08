import { useState, useCallback } from 'react';

/**
 * Custom hook to store latest voice data payload from VoiceCard
 */
export const useVoice = () => {
  const [latestVoiceData, setLatestVoiceData] = useState(null);

  const handleVoiceData = useCallback((data) => {
    setLatestVoiceData(data);
  }, []);

  return { latestVoiceData, handleVoiceData };
};

export default useVoice;
