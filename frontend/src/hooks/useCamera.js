import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Custom hook to encapsulate webcam hardware stream & canvas snapshot logic
 */
export const useCamera = () => {
  const videoRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  const handleStreamChange = useCallback((active) => {
    setIsCameraActive(active);
    if (!active) {
      setCameraError(null);
    }
  }, []);

  return {
    videoRef,
    isCameraActive,
    cameraError,
    handleStreamChange,
  };
};

export default useCamera;
