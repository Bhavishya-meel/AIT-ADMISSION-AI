import React from 'react';
import { BookOpen, ExternalLink, Clock, AlertCircle } from 'lucide-react';
import { OFFICIAL_SOURCES } from '../data/sourceLinks';

export const OfficialSourcesSection: React.FC = () => {
  return (
    <section id="sources" className="py-20 md:py-28 bg-transparent border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-blue-200 shadow-xs mb-3 backdrop-blur-md">
            <BookOpen className="w-3.5 h-3.5 text-[#0071E3]" />
            <span className="text-[12px] font-bold text-[#005FCC] uppercase tracking-wider">
              Verification & Transparency
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            Official Resources & Verification Center
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-800 font-medium leading-relaxed max-w-2xl mx-auto">
            All guidance provided by Monday is strictly grounded in official publications from the Army Institute of Technology, Pune, and the National Testing Agency.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFICIAL_SOURCES.map((source) => (
            <div
              key={source.id}
              className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-black/[0.08] hover:border-black/[0.14] transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-md"
            >
              <div>
                {/* Badge & Year Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white text-slate-900 border border-slate-200">
                    {source.badgeLabel}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      source.isHistorical
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    {source.admissionYear}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-950 group-hover:text-[#0071E3] transition-colors leading-snug">
                  {source.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-slate-800 font-normal mt-2.5 leading-relaxed">
                  {source.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-700 font-semibold">
                  <Clock className="w-3 h-3 text-[#0071E3]" />
                  <span>Verified: {source.lastVerified}</span>
                </div>

                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0071E3] hover:underline"
                >
                  <span>Open link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Advisory Trust Note */}
        <div className="mt-12 p-5 sm:p-6 rounded-3xl bg-white/85 backdrop-blur-md border border-black/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-[13px] text-[#3A3A3C] leading-relaxed">
              <strong className="text-[#1D1D1F]">Official Publication Notice:</strong> Admission rules, eligibility, fees, seat reservation allocations, and entrance schedules are determined solely by the Army Welfare Education Society (AWES) and AIT Pune. Always confirm details using the current official publications on aitpune.com.
            </div>
          </div>

          <a
            href="https://www.aitpune.com/Admissions.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-white border border-black/[0.1] text-[#1D1D1F] hover:bg-black/[0.03] transition-colors"
          >
            <span>Live Notice Board</span>
            <ExternalLink className="w-3 h-3 text-[#0071E3]" />
          </a>
        </div>
      </div>
    </section>
  );
};
