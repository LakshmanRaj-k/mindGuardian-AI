import React from 'react';
import { Activity, Clock } from 'lucide-react';
import Card from './common/Card';
import RiskIndicator from './charts/RiskIndicator';

const levelColors = {
  Low: 'text-emerald-700 border-emerald-200 bg-emerald-50/80',
  Moderate: 'text-amber-700 border-amber-200 bg-amber-50/80',
  High: 'text-orange-700 border-orange-200 bg-orange-50/80',
  Critical: 'text-red-700 border-red-200 bg-red-50/80',
};

const levelRingGradients = {
  Low: '#10B981',
  Moderate: '#F59E0B',
  High: '#F97316',
  Critical: '#EF4444',
};

export const StressAssessmentCard = ({ stressData, isAnalyzing }) => {
  const {
    stress_level = 'Low',
    risk_score = 0,
    confidence = 0.0,
    timestamp = '',
  } = stressData || {};

  const themeClass = levelColors[stress_level] || levelColors.Low;
  const strokeColor = levelRingGradients[stress_level] || levelRingGradients.Low;

  const formattedTime = timestamp
    ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : 'Live';

  // Circle SVG math for radial gauge (Radius 70 -> Circumference ~439.8)
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(Math.max(risk_score, 0), 100) / 100) * circumference;

  return (
    <Card className="flex flex-col justify-between space-y-4 border-blue-200/80 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 shadow-sm">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-wide font-['Outfit']">Stress Detection</h3>
            <p className="text-xs text-slate-500">Multimodal Neural Fusion Assessment</p>
          </div>
        </div>
        <RiskIndicator stressLevel={stress_level} score={risk_score} />
      </div>

      {/* Dominant Radial Gauge Display */}
      <div className="py-4 flex flex-col md:flex-row items-center justify-around gap-6">
        {/* Radial Circular SVG Gauge */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            {/* Background Track */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="rgba(226, 232, 240, 0.8)"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Dynamic Progress Ring */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={strokeColor}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Inner Gauge Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-extrabold font-mono text-slate-900 tracking-tight">
              {risk_score}
            </span>
            <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase font-semibold">
              RISK INDEX
            </span>
          </div>
        </div>

        {/* Status Metrics Box */}
        <div className="flex-1 w-full max-w-md space-y-3">
          <div className={`p-4 rounded-xl border flex items-center justify-between shadow-sm ${themeClass}`}>
            <div>
              <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">STRESS LEVEL</span>
              <span className="text-2xl font-black tracking-tight font-['Outfit']">{stress_level}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">MODEL CONFIDENCE</span>
              <span className="text-xl font-bold font-mono text-blue-600">{confidence.toFixed(1)}%</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/90 border border-slate-200/90 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Last Analyzed: <strong className="text-slate-800 font-mono">{formattedTime}</strong></span>
            </span>
            <span className="font-mono text-[11px] text-emerald-700 font-semibold">Fused 60% Face / 40% Voice</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StressAssessmentCard;
