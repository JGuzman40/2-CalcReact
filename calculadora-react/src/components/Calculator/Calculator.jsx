import { useState } from 'react';
import Display from '../Display/Display';
import Button from '../Button/Button';
import './Calculator.scss';

function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

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

  const clearDisplay = () => {
    setDisplayValue('0');
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(false);
  };

  const inputDigit = (digit) => {
    if (waitingForSecondValue) {
      setDisplayValue(String(digit));
      setWaitingForSecondValue(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstValue === null) {
      setFirstValue(inputValue);
    } else if (operator) {
      calculate();
    }

    setWaitingForSecondValue(true);
    setOperator(nextOperator);
  };

  const calculate = () => {
    const inputValue = parseFloat(displayValue);

    switch (operator) {
      case '+':
        setDisplayValue(String(firstValue + inputValue));
        break;
      case '-':
        setDisplayValue(String(firstValue - inputValue));
        break;
      case '*':
        setDisplayValue(String(firstValue * inputValue));
        break;
      case '/':
        setDisplayValue(String(firstValue / inputValue));
        break;
      default:
        return;
    }

    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(true);
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
