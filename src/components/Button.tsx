import React from 'react';

interface ButtonProps {
  value: string;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  value, 
  onClick, 
  className = '',
  ariaLabel
}) => (
  <button
    onClick={onClick}
    className={`text-2xl font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center ${className}`}
    aria-label={ariaLabel || `${value} button`}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }}
  >
    {value}
  </button>
);