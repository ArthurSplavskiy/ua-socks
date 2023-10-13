import { FormsBg } from '@/components/shared/Background/FormsBg';
import { FC } from 'react';
import { QuestionBox } from './QuestionBox';
import { Icon } from '@/components/shared/Icon/Icon';
import { TextBox } from './TextBox';
import './index.scss';

const textBoxData = [
	{ id: 1, icon: <Icon icon='box' />, text: 'Сповіщення про технічні роботи у телеграм', color: 'purple' },
	{ id: 2, icon: <Icon icon='smale' />, text: 'Ой у лузі червона калина..', color: 'green' },
	{ id: 3, icon: <Icon icon='clock' />, text: 'Відповідаємо протягом 3 хвилин', color: 'grey' },
	{ id: 4, icon: <Icon icon='connect' />, text: 'Стаємо краще з кожним днем!', color: 'blue' }
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
