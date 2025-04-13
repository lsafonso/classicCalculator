import React from 'react';
import { Button } from './Button';

interface KeypadProps {
  onNumberClick: (num: string) => void;
  onOperatorClick: (operator: string) => void;
  onEqualClick: () => void;
  onClearClick: () => void;
  onAllClearClick: () => void;
}

const operatorLabels: Record<string, string> = {
  '+': 'plus',
  '-': 'minus',
  '*': 'multiply',
  '/': 'divide',
  '%': 'percent'
};

export const Keypad: React.FC<KeypadProps> = ({
  onNumberClick,
  onOperatorClick,
  onEqualClick,
  onClearClick,
  onAllClearClick,
}) => (
  <div 
    className="grid grid-cols-4 gap-3"
    role="group"
    aria-label="Calculator keypad"
  >
    <Button 
      value="AC" 
      onClick={onAllClearClick}
      className="bg-red-500 hover:bg-red-600 text-white h-16"
      ariaLabel="Clear all"
    />
    <Button 
      value="C" 
      onClick={onClearClick}
      className="bg-red-500 hover:bg-red-600 text-white h-16"
      ariaLabel="Clear current value"
    />
    <Button 
      value="%" 
      onClick={() => onOperatorClick('%')}
      className="bg-gray-700 hover:bg-gray-600 text-white h-16"
      ariaLabel="Percent operator"
    />
    <Button 
      value="÷" 
      onClick={() => onOperatorClick('/')}
      className="bg-blue-500 hover:bg-blue-600 text-white h-16"
      ariaLabel="Divide operator"
    />
    
    {[7, 8, 9].map((num) => (
      <Button 
        key={num}
        value={String(num)}
        onClick={() => onNumberClick(String(num))}
        className="bg-gray-700 hover:bg-gray-600 text-white h-16"
        ariaLabel={`Number ${num}`}
      />
    ))}
    <Button 
      value="×" 
      onClick={() => onOperatorClick('*')}
      className="bg-blue-500 hover:bg-blue-600 text-white h-16"
      ariaLabel="Multiply operator"
    />
    
    {[4, 5, 6].map((num) => (
      <Button 
        key={num}
        value={String(num)}
        onClick={() => onNumberClick(String(num))}
        className="bg-gray-700 hover:bg-gray-600 text-white h-16"
        ariaLabel={`Number ${num}`}
      />
    ))}
    <Button 
      value="-" 
      onClick={() => onOperatorClick('-')}
      className="bg-blue-500 hover:bg-blue-600 text-white h-16"
      ariaLabel="Minus operator"
    />
    
    {[1, 2, 3].map((num) => (
      <Button 
        key={num}
        value={String(num)}
        onClick={() => onNumberClick(String(num))}
        className="bg-gray-700 hover:bg-gray-600 text-white h-16"
        ariaLabel={`Number ${num}`}
      />
    ))}
    <Button 
      value="+" 
      onClick={() => onOperatorClick('+')}
      className="bg-blue-500 hover:bg-blue-600 text-white h-16"
      ariaLabel="Plus operator"
    />
    
    <Button 
      value="." 
      onClick={() => onNumberClick('.')}
      className="bg-gray-700 hover:bg-gray-600 text-white h-16"
      ariaLabel="Decimal point"
    />
    <Button 
      value="0" 
      onClick={() => onNumberClick('0')}
      className="bg-gray-700 hover:bg-gray-600 text-white h-16"
      ariaLabel="Number 0"
    />
    <Button 
      value="=" 
      onClick={onEqualClick}
      className="col-span-2 bg-green-500 hover:bg-green-600 text-white h-16"
      ariaLabel="Calculate result"
    />
  </div>
);