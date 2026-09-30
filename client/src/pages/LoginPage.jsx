import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Lock, Mail, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('manager@econest.campus');
  const [password, setPassword] = useState('manager123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const demoAccounts = [
    {
      role: 'Facility Manager',
      name: 'Ananya Iyer',
      email: 'manager@econest.campus',
      password: 'manager123',
      desc: 'Exceptions, analytics, dispatch & station telemetry'
    },
    {
      role: 'Sanitation Worker',
      name: 'Rahul Verma',
      email: 'worker1@econest.campus',
      password: 'worker123',
      desc: 'Mobile task queue, QR station check-in & photo proof'
    },
    {
      role: 'Campus Student',
      name: 'Aarav Patel',
      email: 'student@econest.campus',
      password: 'student123',
      desc: 'Report overflows, photo upload & citizen tracking'
    },
    {
      role: 'Campus Admin',
      name: 'Dr. Rajesh Sharma',
      email: 'admin@econest.campus',
      password: 'admin123',
      desc: 'User permissions, system audit logs & security'
    }
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  }

  async function handleQuickLogin(account) {
    setEmail(account.email);
    setPassword(account.password);
    setLoading(true);
    setError('');
    try {
      await login(account.email, account.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo */}
        <div className="w-14 h-14 rounded-2xl bg-white mx-auto flex items-center justify-center p-1 border border-slate-200 shadow-sm mb-3 overflow-hidden">
          <img src="/logo.png" alt="EcoNest Logo" className="w-full h-full object-contain" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          EcoNest
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-medium tracking-wide">
          Every waste event. One verified loop.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="op-card p-6 sm:p-8 space-y-6 shadow-sm">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Institutional Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@econest.campus"
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-slate-400 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-slate-400 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign in to Campus Operations'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </form>

          {/* Quick Demo Logins for Hackathon Evaluators (Section 42) */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">
              Quick 1-Click Demo Personas:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {demoAccounts.map(account => (
                <button
                  key={account.role}
                  type="button"
                  onClick={() => handleQuickLogin(account)}
                  className="p-2.5 text-left rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  <div className="font-semibold text-slate-900 truncate">
                    {account.role}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {account.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/landing"
            className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            ← View Public Architecture Showcase
          </Link>
        </div>
      </div>
    </div>
  );
}
