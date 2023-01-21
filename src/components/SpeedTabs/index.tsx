import { ITab } from '@/interfaces/shared';
import { FC, useState } from 'react';
import { Button } from '../shared/Button';
import { HideElements } from './HideElements';
import './SpeedTabs.scss';
import { Tab } from './Tab';

interface Props {
	data: ITab[];
}

export const SpeedTabs: FC<Props> = ({ data }) => {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div className='SpeedTabs'>
			<div className='SpeedTabs-btns'>
				{data.map((item, idx) => (
					<Button
						key={idx}
						onClick={() => setActiveTab(idx)}
						color={activeTab === idx ? 'primary' : 'outline'}>
						{item.name}
					</Button>
				))}
			</div>
			<div className='SpeedTabs-tabs'>
				{data.map((item, idx) => (
					<Tab key={idx} data={item} index={idx} isActive={activeTab} />
				))}
			</div>
			<HideElements />
		</div>
	);
};
