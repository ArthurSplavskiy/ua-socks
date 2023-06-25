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
}));
