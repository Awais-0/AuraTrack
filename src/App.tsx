/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { motion, AnimatePresence } from 'motion/react';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full mesh-gradient overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />

        {/* Protected Dashboard Routes */}
        <Route path="/" element={
          <DashboardLayout>
            <PageWrapper><Dashboard /></PageWrapper>
          </DashboardLayout>
        } />

        {/* Placeholders for other routes */}
        <Route path="/sessions" element={
          <DashboardLayout>
            <PageWrapper>
              <div className="flex items-center justify-center h-full text-white/20 font-black text-6xl uppercase tracking-tighter">Sessions</div>
            </PageWrapper>
          </DashboardLayout>
        } />
        <Route path="/analytics" element={
          <DashboardLayout>
            <PageWrapper>
              <div className="flex items-center justify-center h-full text-white/20 font-black text-6xl uppercase tracking-tighter">Analytics</div>
            </PageWrapper>
          </DashboardLayout>
        } />
        <Route path="/goals" element={
          <DashboardLayout>
            <PageWrapper>
              <div className="flex items-center justify-center h-full text-white/20 font-black text-6xl uppercase tracking-tighter">Goals</div>
            </PageWrapper>
          </DashboardLayout>
        } />
        <Route path="/settings" element={
          <DashboardLayout>
            <PageWrapper>
              <div className="flex items-center justify-center h-full text-white/20 font-black text-6xl uppercase tracking-tighter">Settings</div>
            </PageWrapper>
          </DashboardLayout>
        } />
        <Route path="/profile" element={
          <DashboardLayout>
            <PageWrapper>
              <div className="flex items-center justify-center h-full text-white/20 font-black text-6xl uppercase tracking-tighter">Profile</div>
            </PageWrapper>
          </DashboardLayout>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
