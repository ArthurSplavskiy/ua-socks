import { FC, useEffect, useState } from 'react';
import { MbpsIcon, SpeedometerArrow, SpeedometerIcon } from '@/assets/icons';
import CountUp from 'react-countup';

interface Props {
	isActive: boolean;
	speedValue: number;
}

export const Speedometer: FC<Props> = ({ isActive, speedValue }) => {
	const [jumpStart, setJumpStart] = useState(0);
	const [speedIndex, setSpeedIndex] = useState(0);

	const jumpSpeed = [
		speedValue,
		speedValue - 2,
		speedValue + 2,
		speedValue - 3,
		speedValue + 5,
		speedValue - 2,
		speedValue + 5,
		speedValue - 2,
		speedValue + 3,
		speedValue
	];

	useEffect(() => {
		setJumpStart(0);
		let intervalId: NodeJS.Timer;
		let i = 0;
		setTimeout(() => {
			// setJumpStart(jumpSpeed[speedIndex - 1 < 0 ? 0 : speedIndex - 1]);
			setJumpStart(jumpSpeed[speedIndex < 0 ? 0 : speedIndex]);
			intervalId = setInterval(() => {
				if (i > 10) i = 0;
				setSpeedIndex(i + 1);
				i++;
			}, 1000);
			return () => {
				clearInterval(intervalId);
				setJumpStart(0);
				i = 0;
			};
		}, 1100);
	}, [isActive]);

	return (
		<div
			className={`Speedometer ${isActive && 'active' && 'active-' + speedValue} ${
				jumpStart > 0 ? 'jump' : ''
			}`}>
			<div className='Speedometer-panel'>
				<SpeedometerIcon className='Speedometer-desk' />
				<SpeedometerArrow className='Speedometer-arrow' />
			</div>
			<div className='Speedometer-value'>
				<CountUp
					end={isActive ? jumpSpeed[speedIndex] : 0}
					start={jumpStart}
					duration={1}
					decimals={2}
				/>
			</div>
			<div className='Speedometer-dimension'>
				mbps <MbpsIcon />
			</div>
		</div>
	);
};
