import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Sparkles, Coffee, Gift, ShieldAlert } from 'lucide-react';
import { SurveyAnswer, VoucherDetails } from '../types.ts';
import { DunkinLogo } from './DunkinLogo.tsx';

interface SurveyFlowProps {
  onBack: () => void;
  onComplete: (voucher: VoucherDetails) => void;
}

const QUESTIONS = [
  {
    id: 1,
    title: 'How often do you visit Dunkin\'?',
    subtitle: 'Question 1 of 3 • Takes less than 15 seconds',
    icon: Coffee,
    options: [
      { id: 'daily', label: 'Everyday / Daily fuel', sub: 'Coffee, breakfast & treats' },
      { id: 'weekly', label: '2–3 times a week', sub: 'Weekday routine favorite' },
      { id: 'weekend', label: 'Weekends & road trips', sub: 'Special treat outings' },
      { id: 'first_time', label: 'Occasionally / Exploring', sub: 'Looking to try new flavors' },
    ],
  },
  {
    id: 2,
    title: 'What is your favorite Dunkin\' menu item?',
    subtitle: 'Question 2 of 3 • Customizing your voucher',
    icon: Sparkles,
    options: [
      { id: 'iced_coffee', label: 'Iced Coffee & Cold Brew', sub: 'Signature roasts & flavor swirls' },
      { id: 'donuts', label: 'Classic Glazed & Filled Donuts', sub: 'Munchkins & specialty donuts' },
      { id: 'breakfast', label: 'Breakfast Sandwiches & Wraps', sub: 'Sourdough, bacon, egg & cheese' },
      { id: 'refreshers', label: 'Refreshers & Energy Sparklers', sub: 'Fruity green tea & coconut blends' },
    ],
  },
  {
    id: 3,
    title: 'Which reward package would you like to unlock?',
    subtitle: 'Final Question • Select your exclusive offer to claim',
    icon: Gift,
    options: [
      { id: 'voucher_25', label: '$25 Dunkin\' Rewards Balance', sub: 'Direct credit applied to all items' },
      { id: 'percent_50', label: '50% Off Total Order', sub: 'Valid storewide & drive-thru' },
      { id: 'free_combo', label: 'Free Drink + Donut Box Combo', sub: 'Any size drink + 6-pack munchkins' },
    ],
  },
];

export const SurveyFlow: React.FC<SurveyFlowProps> = ({ onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const question = QUESTIONS[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / QUESTIONS.length) * 100);

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswers = [
      ...answers.filter((a) => a.questionId !== question.id),
      { questionId: question.id, answer: selectedOption },
    ];
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
      const nextAnswer = newAnswers.find((a) => a.questionId === QUESTIONS[currentStep + 1].id);
      setSelectedOption(nextAnswer ? nextAnswer.answer : null);
    } else {
      // Completed all questions!
      const chosenReward = newAnswers.find((a) => a.questionId === 3)?.answer;
      let rewardTitle = '$25 Dunkin\' Rewards Balance';
      let discountBadge = '$25 VALUE';

      if (chosenReward === 'percent_50') {
        rewardTitle = '50% Off Storewide Order';
        discountBadge = '50% OFF';
      } else if (chosenReward === 'free_combo') {
        rewardTitle = 'Free Beverage + Donut Combo Box';
        discountBadge = 'FREE COMBO';
      }

      const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
      const code = `DD-${discountBadge.replace(/[^A-Z0-9]/g, '')}-${randomSuffix}`;
      const now = new Date();
      now.setHours(now.getHours() + 24);

      onComplete({
        code,
        discount: discountBadge,
        title: rewardTitle,
        validUntil: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Tomorrow',
        securityHash: Math.random().toString(16).substring(2, 10).toUpperCase(),
      });
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      const prevAnswer = answers.find((a) => a.questionId === QUESTIONS[prevStep].id);
      setSelectedOption(prevAnswer ? prevAnswer.answer : null);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center justify-center bg-[#F8F9FD]">
      {/* Container card */}
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        {/* Top brand & step bar */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <button
            onClick={handlePreviousStep}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-100"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {currentStep === 0 ? 'Back to Offer' : 'Previous'}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#FF671F] uppercase tracking-wider">
              Verification Survey
            </span>
            <span className="text-xs font-medium text-slate-400">
              {currentStep + 1} of {QUESTIONS.length}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-slate-100">
          <div
            className="h-full bg-gradient-to-r from-[#FF671F] to-[#135bec] transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Logo stamp */}
          <div className="flex justify-center -mt-2">
            <DunkinLogo size={68} />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
              {question.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-500">{question.subtitle}</p>
          </div>

          {/* Options Grid */}
          <div className="space-y-3 pt-2">
            {question.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  type="button"
                  className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'border-[#135bec] bg-blue-50/50 shadow-sm ring-2 ring-[#135bec]/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  <div className="pr-4">
                    <p
                      className={`font-bold text-sm md:text-base ${
                        isSelected ? 'text-[#135bec]' : 'text-slate-800'
                      }`}
                    >
                      {opt.label}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{opt.sub}</p>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                      isSelected
                        ? 'bg-[#135bec] border-[#135bec] text-white shadow-sm'
                        : 'border-slate-300 group-hover:border-slate-400 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Survey Rule reminder */}
          <div className="flex items-center gap-2 p-3 bg-amber-50/80 rounded-xl text-amber-800 text-xs border border-amber-200/50">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" />
            <span>
              <strong>Survey Rule:</strong> Answers are validated to prevent duplicate bot entries. Reward unlocks immediately upon final selection.
            </span>
          </div>

          {/* Continue button */}
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`w-full py-4 px-6 rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all ${
              selectedOption
                ? 'bg-[#135bec] hover:bg-[#0f4ac4] text-white shadow-lg shadow-blue-500/25 active:scale-[0.99]'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>{currentStep === QUESTIONS.length - 1 ? 'Unlock My Reward' : 'Continue'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
