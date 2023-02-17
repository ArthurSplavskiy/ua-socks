import { IPageTextInterface } from '@/interfaces/api';
import { IEventError } from '@/interfaces/shared';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type State = {
	// pageInterfaceText: IPageTextInterface | null;
	error: IEventError | null;
	setError: (error: IEventError | null) => void;
	clearError: () => void;
	isRegistrationPopupOpen: boolean;
	isLoginPopupOpen: boolean;
	isErrorPopupOpen: boolean;
	isThankPopupOpen: boolean;
	isForgotPassPopupOpen: boolean;
	isPopupHide: boolean;
	openRegistration: () => void;
	openLogin: () => void;
	openThank: () => void;
	openForgotPass: () => void;
	openError: () => void;
	closeRegistration: () => void;
	closeLogin: () => void;
	closeError: () => void;
	closeThank: () => void;
	closeForgotPass: () => void;
	popupHide: () => void;
	setNoScroll: (lock: boolean) => void;
};
type CommonProviderProps = { children: React.ReactNode };

const CommonContext = createContext<State>({
	// pageInterfaceText: null,
	error: null,
	setError: () => {},
	clearError: () => {},
	isRegistrationPopupOpen: false,
	isLoginPopupOpen: false,
	isErrorPopupOpen: false,
	isThankPopupOpen: false,
	isForgotPassPopupOpen: false,
	isPopupHide: false,
	openRegistration: () => {},
	openLogin: () => {},
	openError: () => {},
	openThank: () => {},
	openForgotPass: () => {},
	closeRegistration: () => {},
	closeLogin: () => {},
	closeError: () => {},
	closeThank: () => {},
	closeForgotPass: () => {},
	popupHide: () => {},
	setNoScroll: (lock: boolean) => {}
});

function CommonProvider({ children }: CommonProviderProps) {
	// const [pageInterfaceText, setPageInterfaceText] = useState<IPageTextInterface | null>(null);
	const [pageError, setPageError] = useState<IEventError | null>(null);
	const [noScroll, setNoScroll] = useState(false);

	const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
	const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
	const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
	const [isThankPopupOpen, setIsThankPopupOpen] = useState(false);
	const [isForgotPassPopupOpen, setIsForgotPassPopupOpen] = useState(false);
	const [isPopupHide, setIsPopupHide] = useState(false);

	const openRegistration = () => {
		closeAllPopups();
		setIsRegistrationPopupOpen(true);
	};
	const openLogin = () => {
		closeAllPopups();
		setIsLoginPopupOpen(true);
	};
	const openForgotPass = () => {
		closeAllPopups();
		setIsForgotPassPopupOpen(true);
	};
	const openError = () => {
		setIsErrorPopupOpen(true);
	};
	const openThank = () => {
		setIsThankPopupOpen(true);
	};
	const closeRegistration = () => {
		setIsRegistrationPopupOpen(false);
		setIsPopupHide(false);
	};
	const closeLogin = () => {
		setIsLoginPopupOpen(false);
		setIsPopupHide(false);
	};
	const closeForgotPass = () => {
		setIsForgotPassPopupOpen(false);
		setIsPopupHide(false);
	};
	const closeError = () => {
		setIsErrorPopupOpen(false);
	};
	const closeThank = () => {
		setIsThankPopupOpen(false);
	};
	const popupHide = () => {
		setIsPopupHide(true);
	};
	function closeAllPopups() {
		closeRegistration();
		closeLogin();
		closeForgotPass();
	}
	const setError = (error: IEventError | null) => {
		setPageError(error);
	};
	const clearError = () => {
		setPageError(null);
	};

	// const { data } = useRequest<IPageTextInterface>({
	// 	method: 'GET',
	// 	url: api.common.getPageInterfaceText
	// });
	// useEffect(() => {
	// 	if (data) {
	// 		setPageInterfaceText(data);
	// 	}
	// }, [data]);

	useEffect(() => {
		if (noScroll) {
			document.body.classList.add('noscroll');
		} else {
			document.body.classList.remove('noscroll');
		}
	}, [noScroll]);

	// const loadPageInterfaceText = useCallback(async () => {
	// 	try {
	// 		document.body.classList.add('interface-text-loading');
	// 		const { data } = await api.common.getPageInterfaceText();
	// 		setPageInterfaceText(data);
	// 	} catch {
	// 		setPageInterfaceText(null);
	// 	} finally {
	// 		setTimeout(() => {
	// 			document.body.classList.remove('interface-text-loading');
	// 		}, 200);
	// 	}
	// }, []);

	// useEffect(() => {
	// 	loadPageInterfaceText();
	// }, []);

	const contextValue = useMemo(
		() => ({
			// pageInterfaceText,
			openRegistration,
			openThank,
			openLogin,
			openError,
			openForgotPass,
			closeRegistration,
			closeThank,
			closeLogin,
			closeError,
			closeForgotPass,
			popupHide,
			isRegistrationPopupOpen,
			isThankPopupOpen,
			isLoginPopupOpen,
			isErrorPopupOpen,
			isForgotPassPopupOpen,
			isPopupHide,
			error: pageError,
			setError,
			clearError,
			setNoScroll
		}),
		[
			// pageInterfaceText,
			openRegistration,
			openLogin,
			openError,
			openThank,
			openForgotPass,
			closeRegistration,
			closeLogin,
			closeError,
			closeThank,
			closeForgotPass,
			isRegistrationPopupOpen,
			isThankPopupOpen,
			isLoginPopupOpen,
			isErrorPopupOpen,
			isForgotPassPopupOpen,
			isPopupHide,
			popupHide,
			pageError,
			setError,
			clearError,
			setNoScroll
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
