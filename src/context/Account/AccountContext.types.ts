export enum ActionType {
	BALANCE_ADD = 'BALANCE_ADD',
	OPEN_ADD_BALANCE_POPUP = 'OPEN_ADD_BALANCE_POPUP',
	CLOSE_ADD_BALANCE_POPUP = 'CLOSE_ADD_BALANCE_POPUP'
}
export type Action =
	| { type: ActionType.BALANCE_ADD; payload: number }
	| { type: ActionType.OPEN_ADD_BALANCE_POPUP }
	| { type: ActionType.CLOSE_ADD_BALANCE_POPUP };

export type Dispatch = (action: Action) => void;
export type State = {
	balance: number;
	addToBalance: (balance: number) => void;
	isAddToBalancePopup: boolean;
	openAddToBalancePopup: () => void;
	closeAddToBalancePopup: () => void;
};
export type AccountProviderProps = { children: React.ReactNode };
