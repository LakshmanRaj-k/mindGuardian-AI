import React from 'react';
import { Smile } from 'lucide-react';
import Card from './common/Card';
import Badge from './common/Badge';
import EmotionBars from './charts/EmotionBars';

export const EmotionAnalysisCard = ({ emotionData, isAnalyzing }) => {
  const {
    face_detected = false,
    dominant_emotion = 'Neutral',
    confidence = 0.0,
    emotions = {},
  } = emotionData || {};

  return (
    <Card className="flex flex-col justify-between space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Smile className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-bold text-slate-900 tracking-wide">Emotion Detection</h3>
        </div>
        <Badge variant={face_detected ? 'success' : 'neutral'} pulse={face_detected}>
          {face_detected ? 'Face Tracked' : 'Searching'}
        </Badge>
      </div>

      {/* Main Affect Display */}
      {face_detected ? (
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-slate-50/90 border border-slate-200/90 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-[10px] font-mono text-slate-500 block uppercase font-semibold">DOMINANT EMOTION</span>
              <span className="text-xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
                {dominant_emotion}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-500 block uppercase font-semibold">CONFIDENCE</span>
              <span className="text-lg font-bold font-mono text-blue-600">
                {confidence.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Probability Bars */}
          <EmotionBars emotions={emotions} />
        </div>
      ) : (
        <div className="p-8 rounded-xl bg-slate-50/60 border border-slate-200/80 text-center space-y-1.5 flex-grow flex flex-col justify-center">
          <Smile className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-xs text-slate-500">Position face in camera frame</p>
        </div>
      )}
    </Card>
  );
};

export default EmotionAnalysisCard;
