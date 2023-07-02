import { IProxy } from '@/interfaces/shared';

export const initialState = {
  state: {
    balance: 0,
    proxyList: [],
    selectedProxy: [],

    selectProxy: (proxyId: number) => {},
    unselectProxy: (proxyId: number) => {},
    setProxyList: (proxyList: IProxy[] | []) => {},
    addToBalance: (balance: number) => {},

    isAddToBalancePopup: false,
    openAddToBalancePopup: () => {},
    closeAddToBalancePopup: () => {},

    isReplaceIpPopup: false,
    openReplaceIpPopup: () => {},
    closeReplaceIpPopup: () => {},

    isExportPopup: false,
    openExportPopup: () => {},
    closeExportPopup: () => {},

    isContinuePopup: false,
    openContinuePopup: () => {}, // proxyId: number | number[]
    closeContinuePopup: () => {}
  },
  dispatch: () => {},
  isPopupHide: false,
  popupHide: () => {}
};
