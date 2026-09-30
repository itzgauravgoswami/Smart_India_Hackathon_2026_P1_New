import React from 'react';

export default function StatusBadge({ status, size = 'sm' }) {
  if (!status) return null;
  const normalized = String(status).toLowerCase().replace(/_/g, ' ');

  // Define semantic color tokens
  let dotColor = 'bg-slate-400';
  let badgeClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  if (['healthy', 'completed', 'resolved', 'valid', 'online'].includes(normalized)) {
    dotColor = 'bg-emerald-500';
    badgeClasses = 'bg-emerald-50 text-emerald-800 border-emerald-200/80';
  } else if (['warning', 'at risk', 'almost full', 'pending', 'assigned', 'moderate', 'attention'].includes(normalized)) {
    dotColor = 'bg-amber-500';
    badgeClasses = 'bg-amber-50 text-amber-800 border-amber-200/80';
  } else if (['critical', 'overflow', 'failed', 'overdue', 'invalid'].includes(normalized)) {
    dotColor = 'bg-rose-500';
    badgeClasses = 'bg-rose-50 text-rose-800 border-rose-200/80';
  } else if (['in progress', 'active', 'open', 'scheduled'].includes(normalized)) {
    dotColor = 'bg-blue-500';
    badgeClasses = 'bg-blue-50 text-blue-800 border-blue-200/80';
  } else if (['offline'].includes(normalized)) {
    dotColor = 'bg-slate-500';
    badgeClasses = 'bg-slate-100 text-slate-800 border-slate-300';
  }

  // Capitalize nicely
  const label = normalized.charAt(0).toUpperCase() + normalized.slice(1);

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium border rounded-md ${badgeClasses} ${
      size === 'xs' ? 'px-1.5 py-0.5 text-[11px]' : 'px-2 py-0.5 text-xs'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{label}</span>
    </span>
  );
}
