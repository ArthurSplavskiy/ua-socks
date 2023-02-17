import { Button } from '@/components/shared/Button';
import { useAccount } from '@/context/Account/AccountContextHooks';
import { useInterfaceText } from '@/context/UserContext';

export const BalanceWidget = () => {
	// const { pageInterfaceText } = useCommon();
	const { text: pageInterfaceText } = useInterfaceText();
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
