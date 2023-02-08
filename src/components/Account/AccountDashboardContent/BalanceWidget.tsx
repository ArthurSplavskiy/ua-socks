import { Button } from '@/components/shared/Button';
import { ActionType } from '@/context/Account/AccountContext.types';
import { useAccount } from '@/context/Account/AccountContextHooks';
import { useCommon } from '@/context/CommonContext';

export const BalanceWidget = () => {
	const { pageInterfaceText } = useCommon();
	const {
		state: { openAddToBalancePopup, balance }
	} = useAccount();

	return (
		<div className='BalanceWidget'>
			<div className='BalanceWidget-info'>
				<span className='BalanceWidget-balance'>{pageInterfaceText?.acc_balance}</span>
				<span className='BalanceWidget-total'>${balance}</span>
			</div>
			<Button onClick={() => openAddToBalancePopup()}>{pageInterfaceText?.acc_add}</Button>
		</div>
	);
};
