import React from 'react';
import { Eye, Cpu, CheckSquare, Zap, Camera, BarChart2, ArrowRight } from 'lucide-react';

export default function LoopBanner({ activeStep, compact = false }) {
  const steps = [
    { key: 'detect', label: 'Detect', icon: Eye, desc: 'IoT or Reporter' },
    { key: 'classify', label: 'Classify', icon: Cpu, desc: 'AI Stream Vision' },
    { key: 'verify', label: 'Verify', icon: CheckSquare, desc: 'QR Station Stamp' },
    { key: 'act', label: 'Act', icon: Zap, desc: 'Assigned Crew SLA' },
    { key: 'prove', label: 'Prove', icon: Camera, desc: 'Photographic Audit' },
    { key: 'measure', label: 'Measure', icon: BarChart2, desc: 'Loop Closed & KPI' }
  ];

  if (compact) {
    return (
      <div className="bg-slate-900 text-slate-300 py-1.5 px-3 rounded-lg text-xs flex items-center justify-between overflow-x-auto gap-2 border border-slate-800">
        <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[10px] shrink-0">
          The SwaLoop Loop:
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeStep === s.key;
            return (
              <React.Fragment key={s.key}>
                <span className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  isActive ? 'bg-emerald-500/20 text-emerald-300 font-semibold' : 'text-slate-400'
                }`}>
                  <Icon className="w-3 h-3" />
                  {s.label}
                </span>
                {idx < steps.length - 1 && <span className="text-slate-600 text-[10px]">→</span>}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3.5 mb-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
            Continuous Verification Loop
          </span>
          <h4 className="text-xs sm:text-sm font-medium text-slate-900">
            Every waste event moves through six verifiable stages
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Zero Discrepancy Policy
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = activeStep === s.key;
          return (
            <div
              key={s.key}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                isActive
                  ? 'bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-200'
                  : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-semibold uppercase ${isActive ? 'text-emerald-700' : 'text-slate-400'}`}>
                  0{idx + 1}
                </span>
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-500'}`} />
              </div>
              <div className={`text-xs font-semibold ${isActive ? 'text-emerald-950' : 'text-slate-900'}`}>
                {s.label}
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">
                {s.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
