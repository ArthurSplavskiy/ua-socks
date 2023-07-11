import { usePrivatePopups } from '@/components/PopupSystem/state/PrivatePopups';
import { Button } from '@/components/shared/Button';
import { useAccount } from '@/context/Account/AccountContextHooks';
import { useInterfaceText } from '@/context/UserContext';

export const BalanceWidget = () => {
  // const { pageInterfaceText } = useCommon();
  const { text: pageInterfaceText } = useInterfaceText();
  const {
    state: { balance }
  } = useAccount();
  const setAddToBalancePopup = usePrivatePopups((state) => state.setAddToBalancePopup);

  return (
    <div className='BalanceWidget'>
      <div className='BalanceWidget-info'>
        <span className='BalanceWidget-balance'>{pageInterfaceText?.acc_balance}</span>
        <span className='BalanceWidget-total'>${balance}</span>
      </div>
      <Button onClick={() => setAddToBalancePopup({ isOpen: true })}>
        {pageInterfaceText?.acc_add}
      </Button>
    </div>
  );
};
