import { useCommon } from '@/context/CommonContext';
import { ITab } from '@/interfaces/shared';
import { FC } from 'react';
import { Icon } from '../shared/Icon/Icon';
import { Speedometer } from './Speedometer';

interface Props {
	data: ITab;
	isActive: number;
	index: number;
}

export const Tab: FC<Props> = ({ data, index, isActive }) => {
	const { pageInterfaceText } = useCommon();
	return (
		<div className={`Tab ${index === isActive && 'active'}`}>
			<Speedometer isActive={index === isActive} speedValue={data.speed} />
			<div className='Tab-content'>
				<div className='Tab-stats'>
					<div className='Tab-stat'>
						<div className='Tab-stat-name'>
							<Icon icon='code' color='primary' size='20' />
							{pageInterfaceText?.ping}
						</div>
						<div className='Tab-stat-value'>
							{data.stats.ping}
							<span>ms</span>
						</div>
					</div>
					<div className='Tab-stat'>
						<div className='Tab-stat-name'>
							<Icon icon='download' color='primary' size='20' />
							{pageInterfaceText?.download}
						</div>
						<div className='Tab-stat-value'>
							{data.stats.download}
							<span>mbps</span>
						</div>
					</div>
					<div className='Tab-stat'>
						<div className='Tab-stat-name'>
							<Icon icon='upload' color='primary' size='20' />
							{pageInterfaceText?.upload}
						</div>
						<div className='Tab-stat-value'>
							{data.stats.upload}
							<span>mbps</span>
						</div>
					</div>
				</div>
				<div className='Tab-text'>
					<h3>{data.descr_title}</h3>
					{data.descr.map((p, idx) => (
						<p key={idx}>{p}</p>
					))}
				</div>
			</div>
		</div>
	);
};
