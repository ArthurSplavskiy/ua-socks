import { useEffect, useMemo, useReducer, useState } from 'react';
import { AccountProviderProps, ActionType } from './AccountContext.types';
import { AccountReducer } from './AccountContextReducer';
import { AccountStateContext } from './AccountContextStore';

export function AccountProvider({ children }: AccountProviderProps) {
	const [state, dispatch] = useReducer(AccountReducer, {
		balance: 0,
		addToBalance: (balance: number) => dispatch({ type: ActionType.BALANCE_ADD, payload: balance }),
		isAddToBalancePopup: false,
		openAddToBalancePopup: () => dispatch({ type: ActionType.OPEN_ADD_BALANCE_POPUP }),
		closeAddToBalancePopup: () => dispatch({ type: ActionType.CLOSE_ADD_BALANCE_POPUP })
	});

	const [isPopupHide, setIsPopupHide] = useState(false);
	const popupHide = (status: boolean) => {
		setIsPopupHide(status);
	};

	const value = useMemo(
		() => ({
			state,
			dispatch,
			isPopupHide,
			popupHide
		}),
		[state, dispatch, popupHide, isPopupHide]
	);
	return <AccountStateContext.Provider value={value}>{children}</AccountStateContext.Provider>;
}
