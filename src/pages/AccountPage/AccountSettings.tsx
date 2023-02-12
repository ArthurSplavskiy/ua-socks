import { AccountSettingsContent } from '@/components/Account/AccountSettingsContent';
import { useCommon } from '@/context/CommonContext';
import { FC } from 'react';

export const AccountSettings: FC = () => {
	const { pageInterfaceText } = useCommon();
	return (
		<div className='AccountContent'>
			<h2 className='AccountContent-title'>{pageInterfaceText?.account_link_3}</h2>
			<AccountSettingsContent />
		</div>
	);
};
