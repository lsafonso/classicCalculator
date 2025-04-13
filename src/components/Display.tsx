import React from 'react';
import { AlertCircle } from 'lucide-react';

interface DisplayProps {
  equation: string;
  display: string;
  error: string | null;
}

export const Display: React.FC<DisplayProps> = ({ equation, display, error }) => (
  <div 
    className="bg-gray-800 p-4 rounded-xl mb-4"
    role="region"
    aria-label="Calculator Display"
  >
    <div 
      className="text-gray-400 text-right text-sm h-6"
      aria-label="Current equation"
      role="status"
    >
      {equation}
    </div>
    <div 
      className="text-white text-right text-4xl font-bold tracking-wider overflow-hidden"
      aria-label="Current value"
      role="status"
      aria-live="polite"
    >
      {display}
    </div>
    {error && (
      <div 
        className="flex items-center justify-end gap-1 mt-2 text-red-500 text-sm"
        role="alert"
        aria-live="assertive"
      >
        <AlertCircle size={16} aria-hidden="true" />
        <span>{error}</span>
      </div>
    )}
  </div>
);