import { Action, ActionType, State } from './AccountContext.types';

export function AccountReducer(state: State, action: Action) {
	switch (action.type) {
		case ActionType.BALANCE_ADD: {
			return {
				...state,
				balance: state.balance + action.payload
			};
		}

		case ActionType.OPEN_ADD_BALANCE_POPUP: {
			return {
				...state,
				isAddToBalancePopup: true
			};
		}

		case ActionType.CLOSE_ADD_BALANCE_POPUP: {
			return {
				...state,
				isAddToBalancePopup: false
			};
		}

		default: {
			throw new Error(`Unhandled action type:`); //${action.type}
		}
	}
}
