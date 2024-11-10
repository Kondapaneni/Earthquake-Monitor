import React from 'react';
import { Info } from 'lucide-react';

export default function Legend() {
  const magnitudes = [
    { range: '6.0+', color: '#ef4444', label: 'Major' },
    { range: '4.0-5.9', color: '#f97316', label: 'Moderate' },
    { range: '2.0-3.9', color: '#eab308', label: 'Minor' },
    { range: '0-1.9', color: '#22c55e', label: 'Micro' },
  ];

  return (
    <div className="absolute bottom-5 right-5 glass-effect p-4 rounded-xl shadow-lg z-[1000] scale-in">
      <div className="flex items-center gap-2 mb-3">
        <Info className="h-4 w-4 text-gray-500" />
        <h3 className="font-semibold text-sm text-gray-700">Magnitude Scale</h3>
      </div>
      <div className="space-y-2">
        {magnitudes.map(({ range, color, label }) => (
          <div key={range} className="flex items-center gap-3 group">
            <div
              className="w-4 h-4 rounded-full transition-transform duration-200 group-hover:scale-125"
              style={{ backgroundColor: color }}
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-700">{range}</span>
              <span className="ml-2 text-xs text-gray-500">({label})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}