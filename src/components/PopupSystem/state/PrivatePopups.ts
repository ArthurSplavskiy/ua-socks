import { create } from 'zustand';

interface IPopup {
  isOpen: boolean;
  message?: string;
}

interface IPublicPopups {
  successLoginMessagePopup: IPopup;
  setSuccessLoginMessagePopup: (options: IPopup) => void;

  successMessagePopup: IPopup;
  setSuccessMessagePopup: (options: IPopup) => void;

  errorMessagePopup: IPopup;
  setErrorMessagePopup: (options: IPopup) => void;

  addToBalancePopup: IPopup;
  setAddToBalancePopup: (options: IPopup) => void;

  exportProxyPopup: IPopup;
  setExportProxyPopup: (options: IPopup) => void;

  continueProxyPopup: IPopup;
  setContinueProxyPopup: (options: IPopup) => void;
}

export const usePrivatePopups = create<IPublicPopups>()((set) => ({
  // 1
  successLoginMessagePopup: {
    isOpen: false
  },
  setSuccessLoginMessagePopup: (options) =>
    set((state) => ({
      successLoginMessagePopup: { ...state.successLoginMessagePopup, ...options }
    })),

  // 2
  successMessagePopup: {
    isOpen: false
  },
  setSuccessMessagePopup: (options) =>
    set((state) => ({
      successMessagePopup: { ...state.successMessagePopup, ...options }
    })),

  // 3
  errorMessagePopup: {
    isOpen: false
  },
  setErrorMessagePopup: (options) =>
    set((state) => ({ errorMessagePopup: { ...state.errorMessagePopup, ...options } })),

  // 4
  addToBalancePopup: {
    isOpen: false
  },
  setAddToBalancePopup: (options) =>
    set((state) => ({ addToBalancePopup: { ...state.addToBalancePopup, ...options } })),

  exportProxyPopup: {
    isOpen: false
  },
  setExportProxyPopup: (options) =>
    set((state) => ({ exportProxyPopup: { ...state.exportProxyPopup, ...options } })),

  continueProxyPopup: {
    isOpen: false
  },
  setContinueProxyPopup: (options) =>
    set((state) => ({ continueProxyPopup: { ...state.continueProxyPopup, ...options } }))
}));
