import React from 'react';
import {
  Camera,
  Cpu,
  AlertTriangle,
  UserCheck,
  Play,
  QrCode,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Flag,
  FileCheck
} from 'lucide-react';

const iconMap = {
  camera: Camera,
  cpu: Cpu,
  'alert-triangle': AlertTriangle,
  'user-check': UserCheck,
  play: Play,
  'qr-code': QrCode,
  'check-circle': CheckCircle2,
  'shield-check': ShieldCheck,
  clock: Clock,
  flag: Flag,
  'file-check': FileCheck
};

export default function EventTimeline({ timeline = [] }) {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-slate-400">
        No lifecycle events recorded yet.
      </div>
    );
  }

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
      {timeline.map((step, idx) => {
        const isLatest = idx === timeline.length - 1;
        const IconComponent = iconMap[step.icon] || Clock;

        let iconBg = 'bg-white text-slate-500 border-slate-300';
        if (step.action.toLowerCase().includes('contamination')) {
          iconBg = 'bg-amber-50 text-amber-600 border-amber-300 ring-2 ring-amber-100';
        } else if (step.action.toLowerCase().includes('resolved') || step.action.toLowerCase().includes('completed')) {
          iconBg = 'bg-emerald-50 text-emerald-600 border-emerald-300 ring-2 ring-emerald-100';
        } else if (step.action.toLowerCase().includes('ai') || step.action.toLowerCase().includes('classification')) {
          iconBg = 'bg-blue-50 text-blue-600 border-blue-300 ring-2 ring-blue-100';
        } else if (isLatest) {
          iconBg = 'bg-slate-900 text-white border-slate-900 ring-2 ring-slate-200';
        }

        return (
          <div key={idx} className="relative group">
            {/* Dot / Icon Node */}
            <div
              className={`absolute -left-[30px] top-0.5 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${iconBg}`}
            >
              <IconComponent className="w-3.5 h-3.5" />
            </div>

            {/* Content */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <span className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {step.action}
                </span>
                {step.description && (
                  <p className="text-xs text-slate-500 mt-0.5 max-w-lg leading-relaxed">
                    {step.description}
                  </p>
                )}
                {step.actor && (
                  <div className="mt-1 text-[11px] font-medium text-slate-400">
                    Logged by: <span className="text-slate-600">{step.actor}</span>
                  </div>
                )}
              </div>

              <div className="text-[11px] font-mono font-medium text-slate-400 shrink-0">
                {step.timeString || (step.timestamp ? new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '')}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
