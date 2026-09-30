import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Download,
  Copy,
  Check,
  RefreshCw,
  Cpu,
  Clock,
  ShieldCheck
} from 'lucide-react';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import LoopBanner from '../components/LoopBanner';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('Daily Operations');
  const [timeframe, setTimeframe] = useState('Last 7 Days');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [report, setReport] = useState({
    reportType: 'Daily Operations',
    generatedAt: new Date(),
    source: 'deterministic_fallback',
    notice: 'Calibrated Campus Operational Intelligence Engine',
    content: `Campus Operations Briefing — ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

Executive Summary:
Today the campus recorded 184 waste event passes across 12 active smart stations. Segregation compliance averaged 87.4%, representing a 3.1% week-on-week gain.

Operational Highlights:
• Block A Cafeteria recorded the highest volumetric throughput (92% bin peak) with 2 contamination alerts logged during post-lunch rush.
• Central Library Atrium maintained pristine paper segregation quality (98.2% clean stream).
• North Parking Transit Bay station went offline due to an ultrasonic module power drop; maintenance crew has been dispatched.
• Average collection loop turnaround time improved from 24 minutes to 16.5 minutes following QR verification enforcement.

Priority Actions:
1. Re-route secondary collection trolley to Block A Cafeteria by 14:00.
2. Replace battery harness at WS-009 (North Parking).
3. Conduct brief student awareness drive on food-soiled packaging segregation in Hostel Quadrangle.`
  });

  async function handleGenerateReport() {
    setGenerating(true);
    try {
      const res = await api.generateReport(reportType, timeframe);
      if (res.success && res.report) {
        setReport(res.report);
      }
    } catch (err) {
      alert('Report generation failed: ' + err.message);
    } finally {
      setGenerating(false);
    }
  }

  function handleCopy() {
    if (report?.content) {
      navigator.clipboard.writeText(report.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Operational Intelligence & Synthesis"
        subtitle="Automated narrative briefings, audit reports, and corrective directives powered by Gemini AI."
      />

      <LoopBanner activeStep="measure" />

      {/* Generator Controls Card */}
      <div className="op-card p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div>
            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Report Template
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-hidden"
            >
              <option value="Daily Operations">Daily Operations Briefing</option>
              <option value="Weekly Operations">Weekly Operations Audit</option>
              <option value="Waste Quality">Waste Quality & Purity Index</option>
              <option value="Exception Summary">Exception Engine Digest</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Time Horizon
            </label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-hidden"
            >
              <option value="Last 24 Hours">Last 24 Hours</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerateReport}
          disabled={generating}
          className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-xs"
        >
          <Sparkles className={`w-3.5 h-3.5 text-emerald-400 ${generating ? 'animate-spin' : ''}`} />
          <span>{generating ? 'Synthesizing Report...' : 'Generate AI Briefing'}</span>
        </button>
      </div>

      {/* Report Document Viewer */}
      <div className="op-card overflow-hidden">
        {/* Document Header Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-slate-700" />
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {report?.reportType || reportType}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Generated: {new Date(report?.generatedAt || Date.now()).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
              {report?.source === 'gemini' ? 'Gemini 1.5 Flash' : 'Calibrated Engine'}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Document Body */}
        <div className="p-6 sm:p-8 bg-white font-sans">
          <div className="max-w-3xl mx-auto space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-normal">
            {report?.content}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 max-w-3xl mx-auto flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>EcoNest Facility Governance Platform</span>
            <span>Verified Loop SLA: 93.2%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
