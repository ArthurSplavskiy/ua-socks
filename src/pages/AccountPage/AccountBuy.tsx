import { AccountBuyContent } from '@/components/Account/AccountBuyContent';
import { useCommon } from '@/context/CommonContext';
import { FC } from 'react';

export const AccountBuy: FC = () => {
	const { pageInterfaceText } = useCommon();
	return (
		<div className='AccountContent'>
			<h2 className='AccountContent-title'>{pageInterfaceText?.account_link_2}</h2>
			<AccountBuyContent />
		</div>
	);
};
