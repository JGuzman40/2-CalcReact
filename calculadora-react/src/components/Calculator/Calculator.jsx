import { useState, useEffect, useCallback } from 'react';
import Display from '../Display/Display';
import Button from '../Button/Button';
import './Calculator.scss';

function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const clearDisplay = useCallback(() => {
    setDisplayValue('0');
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(false);
  }, []);

  const inputDigit = useCallback((digit) => {
    if (waitingForSecondValue) {
      setDisplayValue(String(digit));
      setWaitingForSecondValue(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  }, [waitingForSecondValue, displayValue]);

  const inputDot = useCallback(() => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  }, [displayValue]);

  const calculate = useCallback(() => {
    const inputValue = parseFloat(displayValue);

    if (operator && firstValue !== null) {
      let result;
      switch (operator) {
        case '+':
          result = firstValue + inputValue;
          break;
        case '-':
          result = firstValue - inputValue;
          break;
        case '*':
          result = firstValue * inputValue;
          break;
        case '/':
          result = firstValue / inputValue;
          break;
        default:
          return;
      }

      setDisplayValue(String(result));
      setFirstValue(result);
      setOperator(null);
      setWaitingForSecondValue(true);
    }
  }, [displayValue, operator, firstValue]);

  const handleOperator = useCallback((nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstValue === null) {
      setFirstValue(inputValue);
    } else if (operator) {
      calculate();
    }

    setWaitingForSecondValue(true);
    setOperator(nextOperator);
  }, [displayValue, firstValue, operator, calculate]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (/\d/.test(key)) {
        inputDigit(key);
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleOperator(key);
      } else if (key === '.') {
        inputDot();
      } else if (key === 'Enter' || key === '=') {
        calculate();
      } else if (key === 'Escape' || key === 'C') {
        clearDisplay();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputDigit, handleOperator, inputDot, calculate, clearDisplay]);

  const handleButtonClick = (buttonValue) => {
    if (buttonValue === 'C') {
      clearDisplay();
    } else if (buttonValue === '=') {
      calculate();
    } else if (isOperator(buttonValue)) {
      handleOperator(buttonValue);
    } else {
      inputDigit(buttonValue);
    }
  };

  const isOperator = (value) => {
    return ['+', '-', '*', '/'].includes(value);
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <div className="buttons">
        <div className="row">
          <Button label="7" onClick={handleButtonClick} />
          <Button label="8" onClick={handleButtonClick} />
          <Button label="9" onClick={handleButtonClick} />
          <Button label="/" onClick={handleButtonClick} type="operator" />
        </div>
        <div className="row">
          <Button label="4" onClick={handleButtonClick} />
          <Button label="5" onClick={handleButtonClick} />
          <Button label="6" onClick={handleButtonClick} />
          <Button label="*" onClick={handleButtonClick} type="operator" />
        </div>
        <div className="row">
          <Button label="1" onClick={handleButtonClick} />
          <Button label="2" onClick={handleButtonClick} />
          <Button label="3" onClick={handleButtonClick} />
          <Button label="-" onClick={handleButtonClick} type="operator" />
        </div>
        <div className="row">
          <Button label="0" onClick={handleButtonClick} />
          <Button label="." onClick={handleButtonClick} />
          <Button label="=" onClick={handleButtonClick} type="equal" />
          <Button label="+" onClick={handleButtonClick} type="operator" />
        </div>
        <div className="row">
          <Button label="C" onClick={handleButtonClick} />
        </div>
      </div>
    </div>
  );
}

export default Calculator;
