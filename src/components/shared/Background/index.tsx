import { FC, useEffect, useRef, useState } from 'react';
import './Background.scss';

interface Props {
	color: 'grey' | 'white';
	particleColor?: 'yellow' | 'green' | 'red' | 'primary';
	particleCount?: 'many' | 'few';
}

export const Background: FC<Props> = ({ color, particleColor, particleCount }) => {
	const resizeHandler = () => {
		let vh = window.innerHeight * 0.01;
		if (window.innerWidth > 992) {
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}
	};

	useEffect(() => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		window.addEventListener('resize', resizeHandler);
		() => window.removeEventListener('resize', resizeHandler);
	}, []);
	return (
		<div
			className={`Background ${
				color === 'white' ? 'bgWhite' : 'bgGrey'
			} ${particleColor} ${particleCount}`}>
			<div className={`circle systemAqua`}></div>
			<div className={`elementsRed`}></div>
			<div className={`circle elementsRed`}></div>
			<div className={`circle primary60`}></div>
			<div className={`circle systemRed`}></div>
			<div className={`elementsRed`}></div>
			<div className={`circle systemAqua`}></div>
			<div className={`circle systemAqua`}></div>
			<div className={`circle primary60`}></div>
			<div className={`primary20`}></div>
			<div className={`circle systemAqua`}></div>
			<div className={`primary20`}></div>
			<div className={`circle elementsGreen`}></div>
			<div className={`elementsGreen`}></div>
			<div className={`circle systemAqua`}></div>
			<div className={`primary20`}></div>
			<div className={`primary20`}></div>
			<div className={`circle systemAqua`}></div>
			<div className={`primary20`}></div>
			<div className={`circle primary60`}></div>
			<div className={`circle systemRed`}></div>
			<div className={`elementsRed`}></div>
			<div className={`circle primary60`}></div>
			<div className={`elementsRed`}></div>
			<div className={`circle systemRed`}></div>
			<div className={`primary20`}></div>
			<div className={`elementsGreen`}></div>
			<div className={`circle systemAqua`}></div>
			<div className={`primary20`}></div>
			<div className={`primary20`}></div>
			<div className={`circle systemAqua`}></div>
			<div className={`primary20`}></div>
			<div className={`circle primary60`}></div>
			<div className={`circle systemRed`}></div>
			<div className={`elementsRed`}></div>
			<div className={`circle primary60`}></div>
			<div className={`elementsRed`}></div>
			<div className={`circle systemRed`}></div>
			<div className={`primary20`}></div>
		</div>
	);
};
