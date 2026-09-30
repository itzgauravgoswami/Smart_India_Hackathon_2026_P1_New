import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  Filter,
  RefreshCw,
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import LoopBanner from '../components/LoopBanner';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [timeframe, setTimeframe] = useState('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, [timeframe]);

  async function loadAnalytics() {
    setLoading(true);
    try {
      const res = await api.getAnalytics({ timeframe });
      if (res.success) {
        setAnalytics(res);
      }
    } catch (err) {
      console.error('Failed to load analytics:', err);
    } finally {
      setLoading(false);
    }
  }

  const { wasteQualityScore, volumeTrends, complianceTrends, exceptionFrequency, hotspotLocations } = analytics || {};

  return (
    <div className="space-y-6">
      <PageHeader
        title="Operational Analytics & Performance Index"
        subtitle="Audited campus waste flow metrics, stream segregation fidelity, and SLA compliance velocity."
      >
        <div className="flex items-center gap-2">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white font-medium text-slate-700"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last Quarter</option>
          </select>
          <button
            onClick={loadAnalytics}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
        </div>
      </PageHeader>

      <LoopBanner activeStep="measure" />

      {/* CAMPUS WASTE QUALITY SCORE SECTION (Section 36) */}
      <div className="op-card p-5 border-slate-300">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Big Score Box */}
          <div className="flex items-center gap-5 lg:border-r lg:border-slate-200 lg:pr-8">
            <div className="w-20 h-20 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center shrink-0 shadow-sm">
              <span className="text-3xl font-extrabold tracking-tight font-mono text-emerald-400">
                {wasteQualityScore?.overall || 82}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">/ 100</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {wasteQualityScore?.label || 'Campus Waste Quality Score'}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  TARGET EXCEEDED
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-md leading-relaxed">
                Aggregated index scoring segregation purity, collection compliance, and timely sanitation loop closure.
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-2 font-mono">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>{wasteQualityScore?.disclaimer || 'Prototype KPI framework — not a scientifically validated score.'}</span>
              </div>
            </div>
          </div>

          {/* Breakdown Bars (Section 36) */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-5 gap-3">
            {(wasteQualityScore?.breakdown || []).map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] text-slate-500 block truncate font-medium">
                  {item.metric.replace(' Quality', '').replace(' Regularity', '').replace(' Velocity', '')}
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-lg font-bold text-slate-900 font-mono">
                    {item.score}
                  </span>
                  <span className="text-[10px] text-slate-400">/ 100</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1 mt-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.score >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Waste Volume Trends by Stream */}
        <div className="op-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Waste Volume Generation</h3>
              <p className="text-xs text-slate-500">Daily kilograms processed by stream</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600"></span>Dry</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-600"></span>Wet</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Sanitary</span>
            </div>
          </div>

          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeTrends || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px', fontSize: '11px', border: 'none' }} />
                <Bar dataKey="dry" fill="#2563EB" stackId="vol" radius={[0, 0, 0, 0]} />
                <Bar dataKey="wet" fill="#16A34A" stackId="vol" radius={[0, 0, 0, 0]} />
                <Bar dataKey="sanitary" fill="#D97706" stackId="vol" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Collection & Sanitation Compliance SLA */}
        <div className="op-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Operations Compliance Velocity</h3>
              <p className="text-xs text-slate-500">On-time verified collection vs scheduled sanitation SLA (%)</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-600"></span>Collection</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Sanitation</span>
            </div>
          </div>

          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complianceTrends || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} domain={[75, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', color: '#fff', borderRadius: '8px', fontSize: '11px', border: 'none' }} />
                <Line type="monotone" dataKey="collection" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="sanitation" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Exception Frequency Breakdown & Location Hotspots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exception Frequency */}
        <div className="op-card p-4">
          <h3 className="text-sm font-semibold text-slate-900 mb-1">
            Exception Frequency by Classification
          </h3>
          <p className="text-xs text-slate-500 mb-4">Historical distribution of operational anomalies</p>

          <div className="space-y-3">
            {(exceptionFrequency || []).map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{item.type}</span>
                  <span className="font-mono text-slate-900 font-semibold">{item.count} total</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-slate-700 h-full rounded-full"
                    style={{ width: `${(item.count / 24) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hotspot Locations */}
        <div className="op-card p-4">
          <h3 className="text-sm font-semibold text-slate-900 mb-1">
            Campus Location Vulnerability Hotspots
          </h3>
          <p className="text-xs text-slate-500 mb-4">Stations requiring elevated monitoring and awareness campaigns</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-medium">
                  <th className="py-2 px-3">Location</th>
                  <th className="py-2 px-3">Volume (kg)</th>
                  <th className="py-2 px-3">Contamination</th>
                  <th className="py-2 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(hotspotLocations || []).map((loc, idx) => (
                  <tr key={idx} className="op-table-row">
                    <td className="py-2.5 px-3 font-medium text-slate-900">{loc.location}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-700">{loc.volumeKg}</td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-rose-600">
                      {loc.contaminationRate}%
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        loc.status === 'At Risk' ? 'bg-amber-100 text-amber-800' : loc.status === 'Attention' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {loc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
