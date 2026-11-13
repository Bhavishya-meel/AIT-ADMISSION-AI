import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenChat: (initialPrompt?: string) => void;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenChat, onNavigate }) => {
  const samplePrompts = [
    { label: 'Check my eligibility', query: 'Am I eligible to apply to AIT?' },
    { label: 'Explore engineering branches', query: 'Which engineering branches are offered at AIT?' },
    { label: 'View required documents', query: 'What documents should I prepare for AIT admission?' },
  ];

  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-50/50 via-sky-50/20 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Headline Group */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-blue-200 shadow-xs mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
            <span className="text-[12px] font-bold tracking-wider text-[#005FCC] uppercase">
              ADMISSIONS, MADE CLEARER
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#0F172A] leading-[1.08] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            Your journey to AIT <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#0F172A] via-[#0071E3] to-[#801426] bg-clip-text text-transparent">
              starts here.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[#1E293B] font-medium leading-relaxed max-w-2xl mx-auto">
            From understanding eligibility to preparing your documents, get clear, personalized guidance throughout your AIT Pune admission journey.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => onOpenChat()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-[15px] font-semibold bg-[#0071E3] text-white hover:bg-[#0077ED] active:scale-[0.98] transition-all duration-200 shadow-md shadow-blue-500/20 group"
              id="hero-ask-monday-btn"
            >
              <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform duration-200" />
              <span>Ask Monday</span>
              <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('journey')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-semibold bg-white text-[#0F172A] hover:bg-slate-50 border border-slate-300 active:scale-[0.98] transition-all duration-200 shadow-sm"
              id="hero-explore-steps-btn"
            >
              <span>Explore Admission Steps</span>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>

          {/* Subtle Trust Line */}
          <p className="mt-4 text-[13px] text-slate-800 font-semibold">
            Built to simplify admission guidance for students and families.
          </p>
        </div>

        {/* Dual Showcase: Campus Photography & Chat Preview */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Campus Photography Frame */}
          <div className="lg:col-span-7">
            <div className="group relative rounded-3xl overflow-hidden border border-black/[0.08] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.08)] bg-white/85 backdrop-blur-md">
              <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
                <img
                  src="/images/ait-campus-hero.jpg"
                  alt="Army Institute of Technology Pune Academic Campus"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                
                {/* Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
                  <div className="flex items-center gap-2 text-xs font-medium text-white/80 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Dighi Hills, Pune, Maharashtra</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
                    Army Institute of Technology
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 mt-1 line-clamp-1">
                    Permanently Affiliated to SPPU · Autonomous College from AY 2025–26 · NAAC 'A' Grade
                  </p>
                </div>
              </div>

              {/* Institution Key Meta Pills */}
              <div className="p-4 sm:p-5 bg-white/70 border-t border-black/[0.05] grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-2.5 rounded-xl bg-slate-100/90 border border-slate-200/60">
                  <p className="text-[11px] text-slate-700 uppercase tracking-wider font-bold">Established</p>
                  <p className="text-sm font-bold text-slate-950 mt-0.5">1994 (AWES)</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100/90 border border-slate-200/60">
                  <p className="text-[11px] text-slate-700 uppercase tracking-wider font-bold">Status</p>
                  <p className="text-sm font-bold text-slate-950 mt-0.5">Autonomous</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100/90 border border-slate-200/60">
                  <p className="text-[11px] text-slate-700 uppercase tracking-wider font-bold">Selection</p>
                  <p className="text-sm font-bold text-slate-950 mt-0.5">JEE Main CRL</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100/90 border border-slate-200/60">
                  <p className="text-[11px] text-slate-700 uppercase tracking-wider font-bold">Campuses</p>
                  <p className="text-sm font-bold text-slate-950 mt-0.5">100% Residential</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Preview Interactive Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-black/[0.08] bg-white/85 backdrop-blur-md p-5 sm:p-6 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.06)] relative">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0071E3] via-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-sm">
                    <Sparkles className="w-4 h-4 text-amber-200" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                      Monday
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </h4>
                    <p className="text-[11px] text-slate-700 font-semibold">AIT Admissions & Campus AI</p>
                  </div>
                </div>
                <button
                  onClick={() => onOpenChat()}
                  className="text-xs font-bold text-[#0071E3] hover:underline flex items-center gap-1"
                >
                  Open Chat <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Sample Dialogue Bubble Sequence */}
              <div className="py-4 space-y-3.5 text-xs sm:text-[13px] leading-relaxed">
                {/* Student Bubble */}
                <div className="flex justify-end">
                  <div className="bg-[#0071E3] text-white px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%] font-medium shadow-sm">
                    I'm planning to apply to AIT. Where should I begin?
                  </div>
                </div>

                {/* Monday Assistant Bubble */}
                <div className="flex justify-start">
                  <div className="bg-[#F5F5F7] text-slate-900 border border-black/[0.06] px-4 py-3 rounded-2xl rounded-tl-sm max-w-[92%] space-y-2">
                    <p className="font-bold text-slate-950">
                      Welcome! Let's make the process easier.
                    </p>
                    <p className="text-slate-800 font-medium">
                      Start by checking the eligibility requirements, reviewing the latest official prospectus, and understanding the entrance examination and application procedure.
                    </p>
                    <div className="pt-1 flex items-center gap-1 text-[11px] text-[#0071E3] font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified against official AIT prospectus rules</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clickable Suggestion Chips */}
              <div className="pt-2 border-t border-black/[0.05]">
                <p className="text-[11px] text-slate-800 mb-2 font-bold">Quick prompt chips (click to ask):</p>
                <div className="flex flex-wrap gap-2">
                  {samplePrompts.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => onOpenChat(item.query)}
                      className="text-left text-xs px-3 py-1.5 rounded-full bg-blue-50 text-[#0071E3] hover:bg-blue-100 hover:text-blue-800 transition-colors font-medium border border-blue-100 active:scale-95 flex items-center gap-1"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
