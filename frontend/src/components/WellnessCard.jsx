import React, { useState } from 'react';
import { HeartPulse, Droplets, Wind, Footprints, Smile, HelpCircle, Lightbulb } from 'lucide-react';
import Card from './common/Card';
import WhyAnalysisModal from './WhyAnalysisModal';

export const WellnessCard = ({ recommendationData, stressData }) => {
  const [isWhyModalOpen, setIsWhyModalOpen] = useState(false);

  const {
    interventions = ['Maintain current pace.', 'Stay hydrated.', 'Continue good posture.'],
    wellness_tip = 'Short recovery breaks improve focus and reduce mental fatigue.',
  } = recommendationData || {};

  const actionCards = [
    { title: 'Drink Water', icon: Droplets, color: 'text-cyan-700 border-cyan-200 bg-cyan-50/80' },
    { title: 'Guided Breathing', icon: Wind, color: 'text-blue-700 border-blue-200 bg-blue-50/80' },
    { title: 'Take a Walk', icon: Footprints, color: 'text-emerald-700 border-emerald-200 bg-emerald-50/80' },
    { title: 'Relaxation Suggested', icon: Smile, color: 'text-amber-700 border-amber-200 bg-amber-50/80' },
  ];

  return (
    <Card className="flex flex-col justify-between space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <HeartPulse className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-900 tracking-wide font-['Outfit']">Recommendations</h3>
        </div>

        <button
          onClick={() => setIsWhyModalOpen(true)}
          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-blue-700 text-xs font-semibold border border-slate-200 transition-colors shadow-sm"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Why this?</span>
        </button>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actionCards.map((action, idx) => {
          const IconComp = action.icon;
          return (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center space-y-1.5 transition-all hover:scale-[1.02] shadow-sm ${action.color}`}
            >
              <IconComp className="w-5 h-5" />
              <span className="text-xs font-bold font-['Outfit']">{action.title}</span>
            </div>
          );
        })}
      </div>

      {/* Primary Actionable Steps Summary */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
        <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">ACTION STEPS</span>
        <ul className="text-xs text-slate-700 space-y-1 font-medium">
          {interventions.slice(0, 3).map((step, idx) => (
            <li key={idx} className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
              <span className="truncate">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Wellness Tip */}
      <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200/90 flex items-center space-x-2 text-xs text-blue-900 font-medium">
        <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0" />
        <span className="truncate">{wellness_tip}</span>
      </div>

      {/* Why Analysis Modal */}
      <WhyAnalysisModal
        isOpen={isWhyModalOpen}
        onClose={() => setIsWhyModalOpen(false)}
        stressData={stressData}
      />
    </Card>
  );
};

export default WellnessCard;
