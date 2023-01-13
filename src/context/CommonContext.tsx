import api from '@/api';
import { IPageTextInterface } from '@/interfaces/api';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type State = {
	pageInterfaceText: IPageTextInterface | null;
	isRegistrationPopupOpen: boolean;
	isLoginPopupOpen: boolean;
	isErrorPopupOpen: boolean;
	isPopupHide: boolean;
	openRegistration: () => void;
	openLogin: () => void;
	openError: () => void;
	closeRegistration: () => void;
	closeLogin: () => void;
	closeError: () => void;
	popupHide: () => void;
};
type CommonProviderProps = { children: React.ReactNode };

const CommonContext = createContext<State>({
	pageInterfaceText: null,
	isRegistrationPopupOpen: false,
	isLoginPopupOpen: false,
	isErrorPopupOpen: false,
	isPopupHide: false,
	openRegistration: () => {},
	openLogin: () => {},
	openError: () => {},
	closeRegistration: () => {},
	closeLogin: () => {},
	closeError: () => {},
	popupHide: () => {}
});

function CommonProvider({ children }: CommonProviderProps) {
	const [pageInterfaceText, setPageInterfaceText] = useState<IPageTextInterface | null>(null);

	const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
	const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
	const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
	const [isPopupHide, setIsPopupHide] = useState(false);

	const openRegistration = () => {
		closeAllPopups();
		setIsRegistrationPopupOpen(true);
	};
	const openLogin = () => {
		closeAllPopups();
		setIsLoginPopupOpen(true);
	};
	const openError = () => {
		setIsErrorPopupOpen(true);
	};
	const closeRegistration = () => {
		setIsRegistrationPopupOpen(false);
		setIsPopupHide(false);
	};
	const closeLogin = () => {
		setIsLoginPopupOpen(false);
		setIsPopupHide(false);
	};
	const closeError = () => {
		setIsErrorPopupOpen(false);
	};
	const popupHide = () => {
		setIsPopupHide(true);
	};
	function closeAllPopups() {
		closeRegistration();
		closeLogin();
	}

	const loadPageInterfaceText = useCallback(async () => {
		try {
			const { data } = await api.common.getPageInterfaceText();
			setPageInterfaceText(data);
		} catch {
			setPageInterfaceText(null);
		}
	}, []);

	useEffect(() => {
		loadPageInterfaceText();
	}, []);

	const contextValue = useMemo(
		() => ({
			pageInterfaceText,
			openRegistration,
			openLogin,
			openError,
			closeRegistration,
			closeLogin,
			closeError,
			popupHide,
			isRegistrationPopupOpen,
			isLoginPopupOpen,
			isErrorPopupOpen,
			isPopupHide
		}),
		[
			pageInterfaceText,
			openRegistration,
			openLogin,
			openError,
			closeRegistration,
			closeLogin,
			closeError,
			isRegistrationPopupOpen,
			isLoginPopupOpen,
			isErrorPopupOpen,
			isPopupHide,
			popupHide
		]
	);

	return <CommonContext.Provider value={contextValue}>{children}</CommonContext.Provider>;
}

function useCommon() {
	const context = useContext(CommonContext);

	if (context === undefined) {
		throw new Error('useCommon must be used within a CommonProvider');
	}

	return context;
}

export { CommonProvider, useCommon };
