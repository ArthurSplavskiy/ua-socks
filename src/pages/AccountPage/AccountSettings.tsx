import { AccountSettingsContent } from '@/components/Account/AccountSettingsContent';
import { useInterfaceText } from '@/context/UserContext';
import { FC } from 'react';

export const AccountSettings: FC = () => {
	// const { pageInterfaceText } = useCommon();
	const { text: pageInterfaceText } = useInterfaceText();
	return (
		<div className='AccountContent'>
			<h2 className='AccountContent-title'>{pageInterfaceText?.account_link_3}</h2>
			<AccountSettingsContent />
		</div>
	);
};
