import style from './App.module.css';
import React, { useState } from 'react';

const signs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '+', '=', 'C'];
export const App = () => {
	const [operator, setOperator] = useState('');
	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [result, setResult] = useState(null);

	const handleReset = () => {
		setOperand1('');
		setOperand2('');
		setOperator('');
		setResult(null);
	};

	const mathOperation = () => {
		switch (operator) {
			case '+':
				return setResult(Number(operand1) + Number(operand2));
			case '-':
				return setResult(Number(operand1) - Number(operand2));
		}
	};

	const handleClick = (num) => {
		if (operand1 && operand2 && operator && num === '=') {
			setOperand2('');
			mathOperation();
		}
		if (result) {
			setOperand1(result);
			setResult(null);
		}
		if (num === 'C') return handleReset();
		const isNum = !isNaN(num);
		if (operand1 && !isNum) {
			setOperator(num);
			return;
		}
		if (!operator && isNum) {
			setOperand1((prev) => prev + num);
		} else if (operator && isNum) {
			setOperand2((prev) => prev + num);
		}
	};

	const res = result || operand1 + operator + operand2;
	return (
		<div className={style.wrapper}>
			<input className={style.textField + ' ' + (result && style.active) } disabled type='text' defaultValue={res} />
			<div className={style.calculator}>
				{signs.map((sign, index) => (
					<button onClick={() => handleClick(sign)} key={index}>
						{sign}
					</button>
				))}
			</div>
		</div>
	);
};
