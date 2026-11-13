import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { ADMISSION_STAGES } from '../data/admissionKnowledge';
import { DocumentChecklist } from './DocumentChecklist';

interface AdmissionJourneyProps {
  onAskMonday?: (prompt: string) => void;
  onAskAstra?: (prompt: string) => void;
}

export const AdmissionJourney: React.FC<AdmissionJourneyProps> = ({ onAskMonday, onAskAstra }) => {
  const ask = onAskMonday || onAskAstra || (() => {});
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  const toggleStep = (step: number) => {
    setExpandedStep((prev) => (prev === step ? null : step));
  };

  return (
    <section id="journey" className="py-20 md:py-28 bg-transparent border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-blue-200 shadow-xs mb-3 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-[#0071E3]" />
            <span className="text-[12px] font-bold text-[#005FCC] uppercase tracking-wider">
              Step-by-Step Roadmap
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            Your Admission Journey
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-800 font-medium leading-relaxed max-w-2xl mx-auto">
            A clear six-stage guide from initial category verification to campus reporting, designed to eliminate confusion at every turn.
          </p>
        </div>

        {/* 6-Stage Timeline Stepper */}
        <div className="max-w-4xl mx-auto space-y-4 mb-16">
          {ADMISSION_STAGES.map((stage) => {
            const isExpanded = expandedStep === stage.step;
            return (
              <div
                key={stage.step}
                className={`bg-white/85 backdrop-blur-md rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'border-[#0071E3] shadow-md shadow-blue-500/5 ring-1 ring-blue-500/10'
                    : 'border-black/[0.07] hover:border-black/[0.12] shadow-2xs'
                }`}
              >
                {/* Stage Header Button */}
                <button
                  onClick={() => toggleStep(stage.step)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${
                        isExpanded
                          ? 'bg-[#0071E3] text-white shadow-sm'
                          : 'bg-slate-100 text-slate-900 border border-slate-200'
                      }`}
                    >
                      {stage.step}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-950 leading-snug">
                        {stage.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium mt-0.5 hidden sm:block">
                        {stage.shortSummary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0071E3] hidden md:inline">
                      {isExpanded ? 'Collapse' : 'View Details'}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-[#0071E3]' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Expandable Content Area */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-t border-black/[0.06] bg-slate-50/40 p-5 sm:p-6 space-y-4"
                    >
                      <p className="text-xs text-slate-700 font-medium sm:hidden">
                        {stage.shortSummary}
                      </p>

                      <div className="space-y-2.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950">
                          Official Guidance & Instructions:
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-[13.5px] text-slate-800 font-medium leading-relaxed">
                          {stage.detailedGuidance.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-[#0071E3] flex-shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {stage.warningNote && (
                        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-950 flex items-start gap-2 text-xs leading-relaxed font-medium">
                          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span>
                            <strong>Important Caveat:</strong> {stage.warningNote}
                          </span>
                        </div>
                      )}

                      {/* Action Links & Monday query */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.05]">
                        {stage.actionUrl && (
                          <a
                            href={stage.actionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0071E3] hover:underline"
                          >
                            <span>{stage.keyAction}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <button
                          onClick={() =>
                            ask(`Explain Stage ${stage.step} of AIT admission: ${stage.title}`)
                          }
                          className="inline-flex items-center gap-1 text-xs text-slate-800 hover:text-[#0071E3] font-semibold transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#0071E3]" />
                          <span>Ask Monday about this step</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Embedded Interactive Document Checklist */}
        <div className="max-w-4xl mx-auto">
          <DocumentChecklist onAskMonday={ask} onAskAstra={ask} />
        </div>
      </div>
    </section>
  );
};
