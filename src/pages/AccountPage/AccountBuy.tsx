import { AccountBuyContent } from '@/components/Account/AccountBuyContent';
import { useInterfaceText } from '@/context/UserContext';
import { FC } from 'react';

export const AccountBuy: FC = () => {
	// const { pageInterfaceText } = useCommon();
	const { text: pageInterfaceText } = useInterfaceText();
	return (
		<div className='AccountContent'>
			<h2 className='AccountContent-title'>{pageInterfaceText?.account_link_2}</h2>
			<AccountBuyContent />
		</div>
	);
};
