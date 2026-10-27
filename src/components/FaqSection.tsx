import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Who is this offer for?',
    answer:
      'This promotional savings offer is open to all verified patrons and fans of Dunkin\' Donuts across eligible locations. Check your quick eligibility by clicking Claim Now to get started.',
  },
  {
    question: 'How much can I save?',
    answer:
      'Eligible participants can qualify for up to $100 in Dunkin\' Donuts savings vouchers, digital gift card balance, or promotional coffee and breakfast credits applicable in-store and through the mobile app.',
  },
  {
    question: 'What are sponsored deals?',
    answer:
      'Sponsored deals are quick partner offers, free mobile app trials, entertainment subscriptions, or brief market research surveys provided by verified brand sponsors who fund this rewards program.',
  },
  {
    question: 'How many deals do I need to complete?',
    answer:
      'Typically, you only need to complete 4–5 quick sponsored deals to unlock and claim the full $100 savings package. Progress is tracked automatically as deals are confirmed.',
  },
];

export const FaqSection: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={`w-full max-w-4xl mx-auto ${className}`}>
      <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E1B18] tracking-tight mb-6">
        Frequently asked questions
      </h2>

      <div className="divide-y divide-stone-200/80 border-t border-b border-stone-200/80">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-4 md:py-5">
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between gap-4 text-left group cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="text-base md:text-lg font-bold text-[#1E1B18] group-hover:text-[#FF671F] transition-colors">
                  {faq.question}
                </span>

                <span className="w-7 h-7 flex items-center justify-center text-[#FF671F] shrink-0 font-bold">
                  {isOpen ? (
                    <Minus className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                  )}
                </span>
              </button>

              {isOpen && (
                <div className="pt-3 pr-8 text-sm md:text-base text-[#4A4540] leading-relaxed animate-fadeIn">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
