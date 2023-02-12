import { FormsBg } from '@/components/shared/Background/FormsBg';
import { FC } from 'react';
import { QuestionBox } from './QuestionBox';
import { Icon } from '@/components/shared/Icon/Icon';
import { TextBox } from './TextBox';
import './index.scss';

const textBoxData = [
	{ id: 1, icon: <Icon icon='box' />, text: 'Shipments booked', color: 'purple' },
	{ id: 2, icon: <Icon icon='smale' />, text: 'Happy customers', color: 'green' },
	{ id: 3, icon: <Icon icon='clock' />, text: 'Years of successful operation', color: 'grey' },
	{ id: 4, icon: <Icon icon='connect' />, text: 'Cities and towns covered', color: 'blue' }
];

export const AccountSupportContent: FC = () => {
	return (
		<div className='AccountSupportContent'>
			<QuestionBox bg={<FormsBg />} />
			<div className='AccountSupportContent-options'>
				{textBoxData.map((d) => (
					<TextBox key={d.id} icon={d.icon} text={d.text} color={d.color} />
				))}
			</div>
		</div>
	);
};
