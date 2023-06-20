import api from '@/api';
import useRequest from '@/hooks/useRequest';
import { AppRoutes } from '@/routes/AppRouter';
import { IHomePageData, IUserProfile } from '@/interfaces/api';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

type ILogoutOptions = { openLogin?: boolean } | any;

type State = {
  isLoaded: boolean;
  homepageIsLoading: boolean;
  homePageData: IHomePageData | undefined;
  user: IUserProfile | null;
  setUser: (user: IUserProfile | null) => void;
  logOut: (opt?: ILogoutOptions) => void;
  getProfileData: () => void;
};
type UserProviderProps = { children: React.ReactNode };

const UserContext = createContext<State>({
  isLoaded: false,
  homepageIsLoading: false,
  user: null,
  homePageData: undefined,
  setUser: () => {},
  logOut: () => {},
  getProfileData: () => {}
});

function UserProvider({ children }: UserProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [userPWD, setUserPWD] = useLocalStorage('acc-id', '');
  const [userEmail, setUserEmail] = useLocalStorage('user-email', '');
  const [authToken, setAuthToken] = useLocalStorage('auth-token', '');
  const [, setRefreshToken] = useLocalStorage('refresh-token', '');

  // home sections data
  const { data: homepageData, isLoading: homepageIsLoading } = useRequest<IHomePageData>({
    method: 'GET',
    url: api.homePage.getHomeData('uk')
  });
  const [homePageData, setHomePageData] = useState<IHomePageData | undefined>(undefined);
  // ===

  // const setToken = useCallback((tokenData: string | null) => {
  //   setTokenData(tokenData);
  //   if (tokenData) {
  //     Cookies.set('auth-token', tokenData);
  //   } else {
  //     Cookies.remove('auth-token');
  //   }
  // }, []);

  const logOut = useCallback(async (props: any) => {
		const openLogin = props?.openLogin;
    const res = await api.auth.logout(
      {
        name: null,
        email: userEmail,
        password: userPWD
      },
      'uk'
    );
    if (!res.data.status) return;

    setAuthToken('');
    setUser(null);
    setUserPWD('');
    setUserEmail('');
    setRefreshToken('');
    if (openLogin) {
      window.location.href = `${AppRoutes.HOME}#login`;
    } else {
      window.location.href = AppRoutes.HOME;
    }
  }, []);
  const getProfileData = useCallback(async () => {
    try {
      if (authToken) {
        const { data } = await api.auth.getProfile('uk');
        // const { email } = jwt_decode(tokenData) as any;
        // console.log('tokenData', jwt_decode(tokenData));
        setUser({
          ...data,
          email: userEmail,
          password: userPWD
        });
      }
    } catch {
      setAuthToken(authToken);
    } finally {
      setIsLoaded(true);
    }
  }, [authToken, setAuthToken]);

  useEffect(() => {
    if (authToken) {
      getProfileData();
    }
  }, [authToken]);

  useEffect(() => {
    setHomePageData(homepageData);
  }, [homepageData]);

  const contextValue = useMemo(
    () => ({
      isLoaded,
      user,
      setUser,
      logOut,
      getProfileData,
      homePageData,
      homepageIsLoading
    }),
    [isLoaded, user, logOut, getProfileData, homePageData, homepageIsLoading]
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}

function useProfile() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useProfile must be used within a UserProvider');
  }

  return context;
}

function useInterfaceText() {
  const { homePageData, homepageIsLoading } = useContext(UserContext);
  return { text: homePageData?.interface, isLoading: homepageIsLoading };
}
function useMenu() {
  const { homePageData, homepageIsLoading } = useContext(UserContext);
  return { data: homePageData?.menu, isLoading: homepageIsLoading };
}
function useHomeHero() {
  const { homePageData, homepageIsLoading } = useContext(UserContext);
  return { data: homePageData?.home_hero, isLoading: homepageIsLoading };
}
function useHomeAdvantages() {
  const { homePageData, homepageIsLoading } = useContext(UserContext);
  return { data: homePageData?.home_advantages, isLoading: homepageIsLoading };
}
function useHomeSpeed() {
  const { homePageData, homepageIsLoading } = useContext(UserContext);
  return { data: homePageData?.home_speed, isLoading: homepageIsLoading };
}
function useHomeTarifs() {
  const { homePageData, homepageIsLoading } = useContext(UserContext);
  return { data: homePageData?.home_tarifs, isLoading: homepageIsLoading };
}
function useHomeUsage() {
  const { homePageData, homepageIsLoading } = useContext(UserContext);
  return { data: homePageData?.home_usage, isLoading: homepageIsLoading };
}
function useHomeSocial() {
  const { homePageData, homepageIsLoading } = useContext(UserContext);
  return { data: homePageData?.home_social, isLoading: homepageIsLoading };
}
function useHomeFaq() {
  const { homePageData, homepageIsLoading } = useContext(UserContext);
  return { data: homePageData?.home_faq, isLoading: homepageIsLoading };
}
function useHomeQuestion() {
  const { homePageData, homepageIsLoading } = useContext(UserContext);
  return { data: homePageData?.home_question, isLoading: homepageIsLoading };
}

function useFooterLinks() {
  const { homePageData, homepageIsLoading } = useContext(UserContext);
  return { data: homePageData?.footer_links, isLoading: homepageIsLoading };
}
function useProxyTarifs() {
  const { homePageData, homepageIsLoading } = useContext(UserContext);
  return { data: homePageData?.proxy_tarifs, isLoading: homepageIsLoading };
}
function useSupportLink() {
  const { homePageData, homepageIsLoading } = useContext(UserContext);
  return { data: homePageData?.support_link, isLoading: homepageIsLoading };
}

function useOgContent() {
  const { homePageData, homepageIsLoading } = useContext(UserContext);
  return { data: homePageData?.og_content, isLoading: homepageIsLoading };
}

export {
  UserProvider,
  useProfile,
  useMenu,
  useHomeHero,
  useInterfaceText,
  useHomeAdvantages,
  useHomeSpeed,
  useHomeTarifs,
  useHomeUsage,
  useHomeSocial,
  useHomeQuestion,
  useHomeFaq,
  useFooterLinks,
  useProxyTarifs,
  useSupportLink,
  useOgContent
};
