import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface MeetMondaySectionProps {
  onOpenChat: (initialPrompt?: string) => void;
}

export const MeetMondaySection: React.FC<MeetMondaySectionProps> = ({ onOpenChat }) => {
  const capabilities = [
    {
      title: 'Decodes Complex Eligibility & Category Rules',
      description:
        'Simplifies Army Welfare Education Society parentage categories. Quickly explains what serving certificates (Form P1) or ex-servicemen discharge records (Form P2) require.',
      prompt: 'Who is eligible to apply for AIT under Army parentage?',
    },
    {
      title: 'Explores Autonomous Streams & Placements',
      description:
        'Provides genuine clarity on AIT Pune’s 5 autonomous undergraduate branches, from autonomous computing curricula to silicon VLSI labs and ₹52+ LPA placement opportunities.',
      prompt: 'Compare Computer Engineering vs Automation and Robotics at AIT',
    },
    {
      title: 'ChatGPT-Powered & Prospectus Grounded',
      description:
        'Equipped with live ChatGPT integration and an exhaustive institutional knowledge base. Ask Monday any question about campus life, cutoffs, hostels, fees, and rules.',
      prompt: 'Explain the role of JEE Main in the AIT undergraduate admissions',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-transparent border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Vision & Philosophy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-blue-200 shadow-xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#0071E3]" />
              <span className="text-[12px] font-bold text-[#005FCC] uppercase tracking-wider">
                Apple-Grade AI Assistant
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              Meet Monday. <br />
              <span className="text-slate-800 font-semibold">
                Your dedicated AIT admissions and campus AI.
              </span>
            </h2>

            <p className="text-base text-slate-800 font-medium leading-relaxed">
              Navigating engineering admissions, branch selection, and campus transitions can feel overwhelming. Monday combines live ChatGPT intelligence with institutional precision—transforming hundred-page prospectuses into instant, personalized answers.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onOpenChat()}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold bg-[#0071E3] text-white hover:bg-[#0077ED] transition-all active:scale-95 shadow-md shadow-blue-500/20 group"
              >
                <Sparkles className="w-4 h-4 text-sky-200 group-hover:rotate-12 transition-transform" />
                <span>Start a conversation with Monday</span>
                <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: 3 Structured Cards */}
          <div className="lg:col-span-7 space-y-4">
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="bg-white/85 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-black/[0.08] hover:border-black/[0.14] transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-lg font-bold text-slate-950 group-hover:text-[#0071E3] transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-800 font-normal leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <button
                  onClick={() => onOpenChat(cap.prompt)}
                  className="flex-shrink-0 self-start sm:self-center inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-slate-100 hover:bg-blue-50 text-slate-900 hover:text-[#0071E3] border border-slate-200 transition-colors"
                >
                  <span>Ask Monday</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
// Export alias for backwards compatibility
export const MeetAstraSection = MeetMondaySection;
export default MeetMondaySection;
