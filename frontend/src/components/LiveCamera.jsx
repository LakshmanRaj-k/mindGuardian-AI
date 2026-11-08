import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import { Camera, CameraOff, Video } from 'lucide-react';
import Card from './common/Card';
import Button from './common/Button';
import Badge from './common/Badge';

export const LiveCamera = forwardRef(({ onStreamChange }, ref) => {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(null);

  const startCamera = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false,
      });

      if (ref.current) {
        ref.current.srcObject = stream;
      }
      setIsActive(true);
      if (onStreamChange) onStreamChange(true);
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Camera permission denied or device unavailable.');
      setIsActive(false);
      if (onStreamChange) onStreamChange(false);
    }
  }, [ref, onStreamChange]);

  const stopCamera = useCallback(() => {
    if (ref.current && ref.current.srcObject) {
      const stream = ref.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      ref.current.srcObject = null;
    }
    setIsActive(false);
    setError(null);
    if (onStreamChange) onStreamChange(false);
  }, [ref, onStreamChange]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <Card className="flex flex-col justify-between space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Camera className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900 tracking-wide">Live Camera</h3>
        </div>
        <Badge variant={isActive ? 'success' : 'neutral'} pulse={isActive}>
          {isActive ? 'Live Stream' : 'Offline'}
        </Badge>
      </div>

      {/* Viewport */}
      <div className="relative aspect-video bg-slate-900 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center shadow-inner">
        <video
          ref={ref}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transform -scale-x-100 ${isActive ? 'block' : 'hidden'}`}
        />

        {!isActive && !error && (
          <div className="text-center p-4 space-y-2">
            <Video className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs text-slate-300 font-medium">Click Start Camera to begin stream</p>
          </div>
        )}

        {error && (
          <div className="text-center p-4 text-xs text-red-400 space-y-1">
            <CameraOff className="w-6 h-6 mx-auto text-red-500" />
            <p className="font-semibold">{error}</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-1 gap-2">
        {!isActive ? (
          <Button variant="primary" size="sm" onClick={startCamera} icon={Camera} className="w-full">
            Start Camera
          </Button>
        ) : (
          <Button variant="danger" size="sm" onClick={stopCamera} icon={CameraOff} className="w-full">
            Stop Camera
          </Button>
        )}
      </div>
    </Card>
  );
});

LiveCamera.displayName = 'LiveCamera';
export default LiveCamera;
