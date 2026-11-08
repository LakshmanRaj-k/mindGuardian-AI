import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, MicOff, Radio } from 'lucide-react';
import Card from './common/Card';
import Button from './common/Button';
import Badge from './common/Badge';
import { analyzeVoiceChunk } from '../services/api';

const float32ToBase64 = (float32Array) => {
  const uint8 = new Uint8Array(float32Array.buffer);
  let binary = '';
  for (let i = 0; i < uint8.length; i++) {
    binary += String.fromCharCode(uint8[i]);
  }
  return btoa(binary);
};

export const VoiceAnalysisCard = ({ onVoiceData }) => {
  const [micState, setMicState] = useState('idle');
  const [voiceData, setVoiceData] = useState(null);

  const streamRef = useRef(null);
  const audioContextRef = useRef(null);
  const processorRef = useRef(null);
  const sampleBufferRef = useRef([]);
  const isProcessingRef = useRef(false);
  const sampleRateRef = useRef(44100);

  const startMicrophone = useCallback(async () => {
    setMicState('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 },
        video: false,
      });

      streamRef.current = stream;
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      sampleRateRef.current = audioContext.sampleRate;

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;
      sampleBufferRef.current = [];

      const targetSamples = audioContext.sampleRate * 2;

      processor.onaudioprocess = (event) => {
        const channelData = event.inputBuffer.getChannelData(0);
        sampleBufferRef.current.push(...channelData);

        if (sampleBufferRef.current.length >= targetSamples) {
          const chunk = new Float32Array(sampleBufferRef.current.splice(0, targetSamples));
          sendChunkToBackend(chunk);
        }
      };

      source.connect(processor);
      processor.connect(audioContext.destination);

      setMicState('active');
    } catch (err) {
      console.error('[VoiceCard] Mic error:', err);
      setMicState(err.name === 'NotAllowedError' ? 'denied' : 'error');
    }
  }, []);

  const stopMicrophone = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    sampleBufferRef.current = [];
    isProcessingRef.current = false;
    setMicState('idle');
    setVoiceData(null);
    if (onVoiceData) onVoiceData(null);
  }, [onVoiceData]);

  const sendChunkToBackend = useCallback(async (chunk) => {
    if (isProcessingRef.current) return;
    try {
      isProcessingRef.current = true;
      const audioBase64 = float32ToBase64(chunk);
      const result = await analyzeVoiceChunk(audioBase64, sampleRateRef.current);
      if (result) {
        setVoiceData(result);
        if (onVoiceData) onVoiceData(result);
      }
    } catch (err) {
      console.error('[VoiceCard] Backend error:', err);
    } finally {
      isProcessingRef.current = false;
    }
  }, [onVoiceData]);

  useEffect(() => {
    return () => {
      stopMicrophone();
    };
  }, [stopMicrophone]);

  const {
    voice_detected = false,
    pitch = 0,
    energy = 0,
    voice_confidence = 0,
  } = voiceData || {};

  const energyPct = Math.round(energy * 100);

  return (
    <Card className="flex flex-col justify-between space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Radio className="w-4 h-4 text-cyan-600" />
          <h3 className="text-sm font-bold text-slate-900 tracking-wide">Voice Analysis</h3>
        </div>
        <Badge variant={micState === 'active' ? 'success' : micState === 'denied' ? 'error' : 'neutral'} pulse={micState === 'active'}>
          {micState === 'active' ? 'Mic Active' : micState === 'denied' ? 'Denied' : 'Off'}
        </Badge>
      </div>

      {/* Metrics Content */}
      {micState === 'active' ? (
        <div className="space-y-3">
          {/* Status Bar */}
          <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
            voice_detected ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}>
            <span className="font-semibold flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5" />
              {voice_detected ? 'Voice Active' : 'Silence'}
            </span>
            {voice_detected && <span className="font-mono font-medium">{voice_confidence.toFixed(1)}% conf</span>}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
              <span className="text-[10px] font-mono text-slate-500 block font-semibold">PITCH</span>
              <span className="text-xl font-bold font-mono text-cyan-700">
                {voice_detected && pitch > 0 ? Math.round(pitch) : '—'} <span className="text-xs font-normal text-slate-500">Hz</span>
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/80">
              <span className="text-[10px] font-mono text-slate-500 block font-semibold">ENERGY</span>
              <span className="text-xl font-bold font-mono text-violet-700">
                {voice_detected ? `${energyPct}%` : '—'}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-xl bg-slate-50/60 border border-slate-200/80 text-center space-y-1.5">
          <Mic className="w-6 h-6 text-slate-400 mx-auto" />
          <p className="text-xs text-slate-500">Microphone standby</p>
        </div>
      )}

      {/* Control */}
      <div>
        {micState !== 'active' ? (
          <Button variant="primary" size="sm" onClick={startMicrophone} icon={Mic} className="w-full" disabled={micState === 'requesting'}>
            {micState === 'requesting' ? 'Requesting...' : 'Start Microphone'}
          </Button>
        ) : (
          <Button variant="danger" size="sm" onClick={stopMicrophone} icon={MicOff} className="w-full">
            Stop Microphone
          </Button>
        )}
      </div>
    </Card>
  );
};

export default VoiceAnalysisCard;
