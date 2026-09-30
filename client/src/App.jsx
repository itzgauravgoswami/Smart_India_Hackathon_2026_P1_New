import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import AppLayout from './layouts/AppLayout';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import EventsPage from './pages/EventsPage';
import StationsPage from './pages/StationsPage';
import OperationsMapPage from './pages/OperationsMapPage';
import ClassifierPage from './pages/ClassifierPage';
import CollectionPage from './pages/CollectionPage';
import SanitationPage from './pages/SanitationPage';
import ExceptionsPage from './pages/ExceptionsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportsPage from './pages/ReportsPage';
import StudentReportPage from './pages/StudentReportPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Home & Landing */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/landing" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Operational Platform Routes inside AppLayout */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/stations" element={<StationsPage />} />
            <Route path="/map" element={<OperationsMapPage />} />
            <Route path="/classifier" element={<ClassifierPage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/sanitation" element={<SanitationPage />} />
            <Route path="/exceptions" element={<ExceptionsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/student-report" element={<StudentReportPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
