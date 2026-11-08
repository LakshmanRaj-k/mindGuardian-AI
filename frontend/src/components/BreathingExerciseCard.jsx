import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw, CheckCircle2 } from 'lucide-react';
import Card from './common/Card';
import Button from './common/Button';

export const BreathingExerciseCard = ({ targetDuration = 60 }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [phase, setPhase] = useState('Inhale'); // Inhale (4s) -> Hold (4s) -> Exhale (4s)
  const [cycleTime, setCycleTime] = useState(0);

  useEffect(() => {
    let timer = null;
    if (isRunning) {
      timer = setInterval(() => {
        setElapsed((prev) => {
          if (prev + 1 >= targetDuration) {
            setIsRunning(false);
            return targetDuration;
          }
          return prev + 1;
        });

        setCycleTime((prev) => {
          const next = (prev + 1) % 12; // 12-second box cycle (4s + 4s + 4s)
          if (next < 4) setPhase('Inhale');
          else if (next < 8) setPhase('Hold');
          else setPhase('Exhale');
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, targetDuration]);

  const handleReset = () => {
    setIsRunning(false);
    setElapsed(0);
    setPhase('Inhale');
    setCycleTime(0);
  };

  const isCompleted = elapsed >= targetDuration;
  const scaleClass =
    phase === 'Inhale'
      ? 'scale-110 border-blue-400 bg-blue-50/60'
      : phase === 'Hold'
      ? 'scale-100 border-amber-400 bg-amber-50/60'
      : 'scale-90 border-emerald-400 bg-emerald-50/60';

  return (
    <Card className="flex flex-col justify-between space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Wind className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900 tracking-wide font-['Outfit']">Guided Breathing</h3>
        </div>
        <span className="text-xs font-mono font-bold text-slate-600">4-4-4 Respiration</span>
      </div>

      {/* Breathing Ring Animation */}
      <div className="py-3 flex flex-col items-center justify-center space-y-3">
        <div
          className={`w-28 h-28 rounded-full border-4 flex items-center justify-center transition-all duration-1000 ease-in-out shadow-md ${scaleClass}`}
        >
          <div className="text-center">
            <span className="text-sm font-extrabold text-slate-900 uppercase font-['Outfit'] block">
              {isRunning ? phase : isCompleted ? 'Complete' : 'Ready'}
            </span>
            <span className="text-xs font-mono text-slate-600">
              {elapsed}s / {targetDuration}s
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-500 font-medium">
          {isRunning
            ? phase === 'Inhale'
              ? 'Inhale slowly through your nose (4s)...'
              : phase === 'Hold'
              ? 'Hold breath smoothly (4s)...'
              : 'Exhale gently through mouth (4s)...'
            : isCompleted
            ? 'Great job! Autonomic balance restored.'
            : 'Press Start to begin guided biofeedback breathing.'}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-2 pt-1">
        {!isRunning ? (
          <Button
            variant="success"
            size="sm"
            onClick={() => setIsRunning(true)}
            icon={isCompleted ? CheckCircle2 : Play}
            className="w-full"
          >
            {isCompleted ? 'Restart Exercise' : 'Start Breathing'}
          </Button>
        ) : (
          <Button variant="secondary" size="sm" onClick={() => setIsRunning(false)} icon={Pause} className="w-full">
            Pause
          </Button>
        )}

        <Button variant="ghost" size="sm" onClick={handleReset} icon={RotateCcw} title="Reset Timer" />
      </div>
    </Card>
  );
};

export default BreathingExerciseCard;
