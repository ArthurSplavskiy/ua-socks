import { IEventError } from '@/interfaces/shared';
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { usePublicPopups } from '@/components/PopupSystem/state/PublicPopups';

type State = {
  // pageInterfaceText: IPageTextInterface | null;
  error: IEventError | null;
  setError: (error: IEventError | null) => void;
  clearError: () => void;
  isRegistrationPopupOpen: boolean;
  isLoginPopupOpen: boolean;
  isForgotPassPopupOpen: boolean;
  isPopupHide: boolean;
  openRegistration: () => void;
  openLogin: () => void;
  openForgotPass: () => void;
  closeRegistration: () => void;
  closeLogin: () => void;
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
  isForgotPassPopupOpen: false,
  isPopupHide: false,
  openRegistration: () => {},
  openLogin: () => {},
  openForgotPass: () => {},
  closeRegistration: () => {},
  closeLogin: () => {},
  closeForgotPass: () => {},
  popupHide: () => {},
  setNoScroll: (lock: boolean) => {}
});

function CommonProvider({ children }: CommonProviderProps) {
  // const [pageInterfaceText, setPageInterfaceText] = useState<IPageTextInterface | null>(null);
  const { setConfirmEmailSendedMessagePopup } = usePublicPopups((state) => state);
  const [pageError, setPageError] = useState<IEventError | null>(null);
  const [noScroll, setNoScroll] = useState(false);

  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isForgotPassPopupOpen, setIsForgotPassPopupOpen] = useState(false);
  const [isPopupHide, setIsPopupHide] = useState(false);

  const openRegistration = useCallback(() => {
    closeAllPopups();
    setIsRegistrationPopupOpen(true);
  }, []);
  const openLogin = useCallback(() => {
    closeAllPopups();
    setIsLoginPopupOpen(true);
  }, []);
  const openForgotPass = () => {
    closeAllPopups();
    setIsForgotPassPopupOpen(true);
  };
  const closeRegistration = useCallback(() => {
    setIsRegistrationPopupOpen(false);
    setIsPopupHide(false);
  }, []);
  const closeLogin = useCallback(() => {
    setIsLoginPopupOpen(false);
    setIsPopupHide(false);
  }, []);
  const closeForgotPass = () => {
    setIsForgotPassPopupOpen(false);
    setIsPopupHide(false);
  };
  const popupHide = useCallback(() => {
    setIsPopupHide(true);
  }, []);
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

  const clickOnLoginLink = (e: React.MouseEvent<HTMLElement, MouseEvent> | any) => {
    const anchor = e.target as HTMLElement;
    if (anchor.getAttribute('href') === '/login') {
      setConfirmEmailSendedMessagePopup({ isOpen: false });
      openLogin();
    }
  };

  useEffect(() => {
    if (window.location.href.indexOf('/login') !== -1) {
      openLogin();
    }
    addEventListener('click', (e) => clickOnLoginLink(e));
    return () => {
      removeEventListener('click', (e) => clickOnLoginLink(e));
    };
  }, []);

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
      openLogin,
      openForgotPass,
      closeRegistration,
      closeLogin,
      closeForgotPass,
      popupHide,
      isRegistrationPopupOpen,
      isLoginPopupOpen,
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
      openForgotPass,
      closeRegistration,
      closeLogin,
      closeForgotPass,
      isRegistrationPopupOpen,
      isLoginPopupOpen,
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
