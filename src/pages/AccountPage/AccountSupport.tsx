import { AccountSupportContent } from '@/components/Account/AccountSupportContent';
import { useInterfaceText } from '@/context/UserContext';
import { FC } from 'react';

export const AccountSupport: FC = () => {
	// const { pageInterfaceText } = useCommon();
	const { text: pageInterfaceText } = useInterfaceText();
	return (
		<div className='AccountContent'>
			<h2 className='AccountContent-title'>{pageInterfaceText?.account_link_4}</h2>
			<AccountSupportContent />
		</div>
	);
};
