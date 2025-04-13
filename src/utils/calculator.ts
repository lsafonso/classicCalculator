export const MAX_DIGITS = 12;
export const MAX_DECIMALS = 8;

export const formatNumber = (num: number): string => {
  if (isNaN(num)) return 'Error';
  if (!isFinite(num)) return num > 0 ? 'Infinity' : '-Infinity';
  
  const numStr = num.toFixed(MAX_DECIMALS);
  const formatted = numStr.replace(/\.?0+$/, '');
  
  if (formatted.replace(/[-.]/g, '').length > MAX_DIGITS) {
    return num.toExponential(MAX_DECIMALS - 1);
  }
  
  return formatted;
};

export const calculateResult = (equation: string, currentNumber: string): number => {
  const expression = equation + currentNumber;
  
  const processedExpression = expression.replace(/(\d+\.?\d*)\s*%/g, (_, num) => {
    return String(parseFloat(num) / 100);
  });
  
  const tokens = processedExpression.split(' ').filter(token => token !== '');
  if (tokens.length !== 3) throw new Error('Invalid expression');
  
  const [num1, operator, num2] = tokens;
  const a = parseFloat(num1);
  const b = parseFloat(num2);
  
  if (isNaN(a) || isNaN(b)) throw new Error('Invalid numbers');
  
  switch (operator) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/':
      if (b === 0) throw new Error('Division by zero');
      return a / b;
    default:
      throw new Error('Invalid operator');
  }
};

export const validateNumberInput = (
  currentDisplay: string,
  newDigit: string,
  isNewNumber: boolean
): boolean => {
  const newDisplay = isNewNumber ? newDigit : currentDisplay + newDigit;
  
  if (newDigit === '.' && currentDisplay.includes('.')) return false;
  if (newDisplay.split('.')[0].length > MAX_DIGITS) return false;
  if (newDisplay.includes('.') && newDisplay.split('.')[1]?.length > MAX_DECIMALS) return false;
  
  return true;
};