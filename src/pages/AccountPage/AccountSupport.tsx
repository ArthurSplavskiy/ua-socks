import { AccountSupportContent } from '@/components/Account/AccountSupportContent';
import { useCommon } from '@/context/CommonContext';
import { FC } from 'react';

export const AccountSupport: FC = () => {
	const { pageInterfaceText } = useCommon();
	return (
		<div className='AccountContent'>
			<h2 className='AccountContent-title'>{pageInterfaceText?.account_link_4}</h2>
			<AccountSupportContent />
		</div>
	);
};
