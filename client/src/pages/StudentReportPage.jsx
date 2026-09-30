import React, { useState } from 'react';
import {
  Upload,
  Camera,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import LoopBanner from '../components/LoopBanner';

export default function StudentReportPage() {
  const navigate = useNavigate();
  const [stationId, setStationId] = useState('WS-004');
  const [location, setLocation] = useState('Block A Cafeteria');
  const [issueType, setIssueType] = useState('Overflow');
  const [wasteCategory, setWasteCategory] = useState('dry');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [createdEventId, setCreatedEventId] = useState(null);

  function handleFile(e) {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      if (file) formData.append('image', file);
      formData.append('stationId', stationId);
      formData.append('location', location);
      formData.append('wasteCategory', wasteCategory);
      formData.append('description', `[${issueType}] ${description || 'Issue logged via campus citizen portal.'}`);

      const res = await api.createEvent(formData);
      if (res.success && res.event) {
        setCreatedEventId(res.event.eventId);
      }
    } catch (err) {
      alert('Failed to submit report: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Report Campus Waste Issue"
        subtitle="Citizen & student reporting portal. Every reported event generates an audited digital passport."
      />

      <LoopBanner activeStep="detect" />

      {createdEventId ? (
        <div className="max-w-lg mx-auto op-card p-6 sm:p-8 text-center space-y-4 border-emerald-300 bg-emerald-50/20">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <h2 className="text-lg font-bold text-slate-900">
            Report Submitted Successfully
          </h2>

          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            Your report has been securely registered in the campus operations ledger and assigned to the field sanitation crew.
          </p>

          <div className="p-3 bg-white rounded-lg border border-slate-200 inline-block font-mono text-sm font-bold text-blue-600">
            Event ID: #{createdEventId}
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setCreatedEventId(null);
                setDescription('');
                setFile(null);
                setPreview(null);
              }}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Log Another Issue
            </button>
            <button
              onClick={() => navigate(`/events?search=${createdEventId}`)}
              className="px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 flex items-center gap-1.5"
            >
              <span>View Passport</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto op-card p-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Location selector */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Campus Location
              </label>
              <select
                value={stationId}
                onChange={(e) => {
                  setStationId(e.target.value);
                  const map = {
                    'WS-004': 'Block A Cafeteria',
                    'WS-002': 'Central Library Atrium',
                    'WS-007': 'Hostel Block B Courtyard',
                    'WS-001': 'Main Gate Plaza',
                    'WS-003': 'Academic Block A Ground',
                    'WS-012': 'Student Activity Center'
                  };
                  setLocation(map[e.target.value] || 'Campus Station');
                }}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-medium"
              >
                <option value="WS-004">Block A Cafeteria (Station WS-004)</option>
                <option value="WS-002">Central Library Atrium (Station WS-002)</option>
                <option value="WS-007">Hostel Block B Courtyard (Station WS-007)</option>
                <option value="WS-001">Main Gate Plaza (Station WS-001)</option>
                <option value="WS-003">Academic Block A Ground (Station WS-003)</option>
                <option value="WS-012">Student Activity Center (Station WS-012)</option>
              </select>
            </div>

            {/* Issue Type (Section 39) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'Overflow',
                'Wrong Segregation',
                'Litter',
                'Sanitation Issue',
                'Damaged Bin',
                'Other'
              ].map(type => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setIssueType(type)}
                  className={`p-2 rounded-lg border text-center font-medium transition-colors ${
                    issueType === type
                      ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Waste Stream selector */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Waste Category
              </label>
              <select
                value={wasteCategory}
                onChange={(e) => setWasteCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-medium"
              >
                <option value="dry">Dry Waste (Plastic, Paper, Packaging)</option>
                <option value="wet">Wet Waste (Food, Organic Scraps)</option>
                <option value="sanitary">Sanitary Waste (Tissues, Hygiene)</option>
                <option value="special">Special Care Waste (Batteries, Electronics)</option>
              </select>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Attach Photo Evidence (Optional)
              </label>
              <label className="border-2 border-dashed border-slate-200 hover:border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/50">
                {preview ? (
                  <img src={preview} alt="Preview" className="h-28 object-cover rounded-md" />
                ) : (
                  <>
                    <Camera className="w-5 h-5 text-slate-400 mb-1" />
                    <span className="text-slate-600 font-medium">Upload or snap a photo</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>
            </div>

            {/* Description */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Additional Details
              </label>
              <textarea
                rows={3}
                placeholder="Describe the issue, spillage, or urgent hazards..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-xs disabled:opacity-50"
            >
              {submitting ? 'Registering Event...' : 'Submit Issue & Dispatch SLA'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
