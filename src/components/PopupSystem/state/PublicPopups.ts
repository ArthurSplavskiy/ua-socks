import { create } from 'zustand';

interface IPopup {
  isOpen: boolean;
  message?: string;
}

interface IPublicPopups {
  newPassSendedMessagePopup: IPopup;
  setNewPassSendedMessagePopup: (options: IPopup) => void;

  errorMessagePopup: IPopup;
  setErrorMessagePopup: (options: IPopup) => void;

  confirmEmailSendedMessagePopup: IPopup;
  setConfirmEmailSendedMessagePopup: (options: IPopup) => void;
}

export const usePublicPopups = create<IPublicPopups>()((set) => ({
  // 1
  newPassSendedMessagePopup: {
    isOpen: false
  },
  setNewPassSendedMessagePopup: (options) =>
    set((state) => ({
      newPassSendedMessagePopup: { ...state.newPassSendedMessagePopup, ...options }
    })),

  // 2
  errorMessagePopup: {
    isOpen: false
  },
  setErrorMessagePopup: (options) =>
    set((state) => ({ errorMessagePopup: { ...state.errorMessagePopup, ...options } })),

  // 3
  confirmEmailSendedMessagePopup: {
    isOpen: false
  },
  setConfirmEmailSendedMessagePopup: (options) =>
    set((state) => ({
      confirmEmailSendedMessagePopup: { ...state.confirmEmailSendedMessagePopup, ...options }
    }))
}));
