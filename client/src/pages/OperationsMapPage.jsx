import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  RefreshCw,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Clock,
  ArrowRight
} from 'lucide-react';
import L from 'leaflet';
import api from '../services/api';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';

export default function OperationsMapPage() {
  const navigate = useNavigate();
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    loadStations();
  }, []);

  async function loadStations() {
    setLoading(true);
    try {
      const res = await api.getStations();
      if (res.success) {
        setStations(res.stations);
        if (res.stations.length > 0 && !selectedStation) {
          const alertStation = res.stations.find(s => s.status === 'overflow' || s.status === 'at_risk');
          setSelectedStation(alertStation || res.stations[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load stations:', err);
    } finally {
      setLoading(false);
    }
  }

  // Filtered list
  const filtered = stations.filter(s => {
    if (statusFilter === 'all') return true;
    return s.status === statusFilter;
  });

  // Map Setup
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const campusCenter = [28.5468, 77.1942];
      const map = L.map(mapContainerRef.current, {
        center: campusCenter,
        zoom: 16,
        zoomControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    filtered.forEach(st => {
      const coords = st.location?.coordinates;
      if (!coords || !coords.lat || !coords.lng) return;

      const isSelected = selectedStation?.stationId === st.stationId;
      const status = st.status;

      let pinColor = '#10B981';
      if (status === 'at_risk') pinColor = '#F59E0B';
      if (status === 'overflow') pinColor = '#EF4444';
      if (status === 'offline') pinColor = '#64748B';

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            background-color: ${pinColor};
            width: ${isSelected ? '28px' : '20px'};
            height: ${isSelected ? '28px' : '20px'};
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.35);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: ${isSelected ? '10px' : '8px'};
            font-weight: bold;
            transition: all 0.2s ease;
          ">
            ${st.fillLevel}%
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([coords.lat, coords.lng], { icon: customIcon }).addTo(map);
      marker.on('click', () => {
        setSelectedStation(st);
      });
      markersRef.current.push(marker);
    });
  }, [filtered, selectedStation]);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Campus Infrastructure Map"
        subtitle="Real-time spatial visualization of all 12 smart campus stations with IoT fill telemetry."
      >
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white font-medium text-slate-700"
          >
            <option value="all">All Stations</option>
            <option value="overflow">Overflowing (&gt;90%)</option>
            <option value="at_risk">At Risk (&gt;75%)</option>
            <option value="healthy">Healthy (&lt;75%)</option>
            <option value="offline">Offline Sensors</option>
          </select>

          <button
            onClick={loadStations}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
        </div>
      </PageHeader>

      {/* Main Map Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Full Interactive Map Container (8 cols) */}
        <div className="lg:col-span-8 op-card p-3 h-[600px] flex flex-col">
          <div className="flex items-center justify-between mb-2 px-1 text-xs">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Active Spatial Grid
            </span>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>Healthy</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span>At Risk</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span>Overflow</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400"></span>Offline</span>
            </div>
          </div>

          <div className="flex-1 rounded-lg overflow-hidden border border-slate-200">
            <div ref={mapContainerRef} className="w-full h-full" />
          </div>
        </div>

        {/* Station Detail Drawer (4 cols) (Section 26) */}
        <div className="lg:col-span-4 space-y-4">
          {selectedStation ? (
            <div className="op-card p-5 space-y-4">
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="font-mono text-xs font-bold text-blue-600">
                    {selectedStation.stationId}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    {selectedStation.name}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedStation.location?.name}</p>
                </div>
                <StatusBadge status={selectedStation.status} />
              </div>

              {/* Station telemetry stats */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-400 text-[11px] block">Fill Capacity</span>
                  <span className="text-xl font-bold text-slate-900 font-mono mt-0.5 block">
                    {selectedStation.fillLevel}% full
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-400 text-[11px] block">Weight</span>
                  <span className="text-xl font-bold text-slate-900 font-mono mt-0.5 block">
                    {selectedStation.weightKg} kg
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Sensor Telemetry:</span>
                  <span className="font-medium text-emerald-700">Online • 94% Battery</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Last Collection:</span>
                  <span className="font-mono font-medium text-slate-800">2:15 PM Today</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Next Recommended:</span>
                  <span className="font-mono font-bold text-amber-700">4:00 PM (1h 10m)</span>
                </div>
              </div>

              <button
                onClick={() => navigate(`/events?search=${selectedStation.stationId}`)}
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>View Station Event Ledger</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="op-card p-12 text-center text-xs text-slate-400">
              Select a station pin on the map to inspect telemetry
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
