import { FC } from 'react';
import { SpeedometerArrow, SpeedometerIcon } from '@/assets/icons';
import CountUp from 'react-countup';

interface Props {
	isActive: boolean;
	speedValue: number;
}

export const Speedometer: FC<Props> = ({ isActive, speedValue }) => {
	return (
		<div className={`Speedometer ${isActive && 'active' && 'active-' + speedValue}`}>
			<div className='Speedometer-panel'>
				<SpeedometerIcon className='Speedometer-desk' />
				<SpeedometerArrow className='Speedometer-arrow' />
			</div>
			<div className='Speedometer-value'>
				<CountUp end={isActive ? speedValue : 0} duration={1.1} decimals={2} />
			</div>
			<div className='Speedometer-dimension'>mbps</div>
		</div>
	);
};
