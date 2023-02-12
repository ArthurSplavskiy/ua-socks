import { useCommon } from '@/context/CommonContext';
import { FC } from 'react';
import { BalanceWidget } from '../AccountDashboardContent/BalanceWidget';
import { TelegramWidget } from './TelegramWidget';
import './index.scss';
import { EmailWidget } from './EmailWidget';
import { PasswordWidget } from './PasswordWidget';

export const AccountSettingsContent: FC = () => {
	const { pageInterfaceText } = useCommon();
	return (
		<div className='AccountSettingsContent'>
			<div className='AccountSettingsContent-col'>
				<div className='AccountSettingsWidget blue'>
					<h4 className='AccountSettingsWidget-head'>{pageInterfaceText?.personal_data}</h4>
					<div className='AccountSettingsWidget-form'>
						<TelegramWidget />
					</div>
				</div>
				<BalanceWidget />
			</div>

			<div className='AccountSettingsContent-col'>
				<div className='AccountSettingsWidget pink'>
					<h4 className='AccountSettingsWidget-head'>{pageInterfaceText?.personal_mail}</h4>
					<div className='AccountSettingsWidget-form'>
						<EmailWidget />
					</div>
				</div>
			</div>

			<div className='AccountSettingsContent-col'>
				<div className='AccountSettingsWidget green'>
					<h4 className='AccountSettingsWidget-head'>{pageInterfaceText?.form_password}</h4>
					<div className='AccountSettingsWidget-form'>
						<PasswordWidget />
					</div>
				</div>
			</div>
		</div>
	);
};
