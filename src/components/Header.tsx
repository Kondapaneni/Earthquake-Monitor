import React from 'react';
import { Activity, AlertCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="glass-effect shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 fade-in">
            <div className="relative">
              <Activity className="h-7 w-7 text-red-500" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Global Earthquake Monitor
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Real-time visualization of seismic activity worldwide
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 fade-in" style={{ animationDelay: '0.2s' }}>
            <AlertCircle className="h-4 w-4" />
            <span>Live Updates Every 5 Minutes</span>
          </div>
        </div>
      </div>
    </header>
  );
}