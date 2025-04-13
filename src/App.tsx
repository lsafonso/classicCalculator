import React, { useState, useEffect } from 'react';
import { Display } from './components/Display';
import { Keypad } from './components/Keypad';
import { calculateResult, formatNumber, validateNumberInput } from './utils/calculator';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleNumber = (num: string) => {
    setError(null);
    if (!validateNumberInput(display, num, isNewNumber)) return;
    
    const newDisplay = isNewNumber ? num : display + num;
    setDisplay(newDisplay);
    setIsNewNumber(false);
  };

  const handleOperator = (operator: string) => {
    setError(null);
    if (display === 'Error') return;
    
    setEquation(display + ' ' + operator + ' ');
    setIsNewNumber(true);
  };

  const handleEqual = () => {
    if (!equation || display === 'Error') return;
    
    try {
      const result = calculateResult(equation, display);
      setDisplay(formatNumber(result));
      setEquation('');
      setIsNewNumber(true);
      setError(null);
    } catch (err) {
      setDisplay('0');
      setError(err instanceof Error ? err.message : 'Calculation error');
      setEquation('');
      setIsNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setError(null);
  };

  const handleAllClear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
    setError(null);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for calculator keys
      if (
        /[\d+\-*/.=%]/.test(e.key) ||
        e.key === 'Enter' ||
        e.key === 'Escape' ||
        e.key === 'Backspace'
      ) {
        e.preventDefault();
      }

      // Number keys
      if (/\d/.test(e.key)) {
        handleNumber(e.key);
      }
      // Operator keys
      else if (['+', '-', '*', '/', '%'].includes(e.key)) {
        handleOperator(e.key);
      }
      // Equal or Enter key
      else if (e.key === '=' || e.key === 'Enter') {
        handleEqual();
      }
      // Decimal point
      else if (e.key === '.') {
        handleNumber('.');
      }
      // Clear (Escape)
      else if (e.key === 'Escape') {
        handleAllClear();
      }
      // Backspace
      else if (e.key === 'Backspace') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, equation, isNewNumber]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div 
        className="bg-gray-900 p-6 rounded-3xl shadow-2xl w-[320px]"
        role="application"
        aria-label="Calculator"
      >
        <Display
          equation={equation}
          display={display}
          error={error}
        />
        <Keypad
          onNumberClick={handleNumber}
          onOperatorClick={handleOperator}
          onEqualClick={handleEqual}
          onClearClick={handleClear}
          onAllClearClick={handleAllClear}
        />
      </div>
    </div>
  );
}

export default App;