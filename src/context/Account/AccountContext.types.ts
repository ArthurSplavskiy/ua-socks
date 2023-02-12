export enum ActionType {
	BALANCE_ADD = 'BALANCE_ADD',
	OPEN_ADD_BALANCE_POPUP = 'OPEN_ADD_BALANCE_POPUP',
	CLOSE_ADD_BALANCE_POPUP = 'CLOSE_ADD_BALANCE_POPUP',
	OPEN_REPLACE_IP_POPUP = 'OPEN_REPLACE_IP_POPUP',
	CLOSE_REPLACE_IP_POPUP = 'CLOSE_REPLACE_IP_POPUP',
	OPEN_EXPORT_POPUP = 'OPEN_EXPORT_POPUP',
	CLOSE_EXPORT_POPUP = 'CLOSE_EXPORT_POPUP',
	OPEN_CONTINUE_POPUP = 'OPEN_CONTINUE_POPUP',
	CLOSE_CONTINUE_POPUP = 'CLOSE_CONTINUE_POPUP'
}
export type Action =
	| { type: ActionType.BALANCE_ADD; payload: number }
	| { type: ActionType.OPEN_ADD_BALANCE_POPUP }
	| { type: ActionType.CLOSE_ADD_BALANCE_POPUP }
	| { type: ActionType.OPEN_REPLACE_IP_POPUP }
	| { type: ActionType.CLOSE_REPLACE_IP_POPUP }
	| { type: ActionType.OPEN_EXPORT_POPUP }
	| { type: ActionType.CLOSE_EXPORT_POPUP }
	| { type: ActionType.OPEN_CONTINUE_POPUP }
	| { type: ActionType.CLOSE_CONTINUE_POPUP };

export type Dispatch = (action: Action) => void;
export type State = {
	balance: number;
	addToBalance: (balance: number) => void;

	isAddToBalancePopup: boolean;
	openAddToBalancePopup: () => void;
	closeAddToBalancePopup: () => void;

	isReplaceIpPopup: boolean;
	openReplaceIpPopup: () => void;
	closeReplaceIpPopup: () => void;

	isExportPopup: boolean;
	openExportPopup: () => void;
	closeExportPopup: () => void;

	isContinuePopup: boolean;
	openContinuePopup: () => void;
	closeContinuePopup: () => void;
};
export type AccountProviderProps = { children: React.ReactNode };
