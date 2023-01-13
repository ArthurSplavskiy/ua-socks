import api from '@/api';
import { IUserProfile } from '@/interfaces/api';
import Cookies from 'js-cookie';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// "user": {
// 	"userId": "12345",
// 	"email": "useremail@gmail.com",
// 	"telegram": "@telegram.account",
// 	"balance": 450,
// 	"password": "some_pass"
// }

type State = {
	isLoaded: boolean;
	user: IUserProfile | null;
	token: string | null;
	setUser: (user: IUserProfile | null) => void;
	setToken: (token: string) => void;
	logOut: () => void;
};
type UserProviderProps = { children: React.ReactNode };

const UserContext = createContext<State>({
	isLoaded: false,
	user: null,
	token: null,
	setUser: () => {},
	setToken: () => {},
	logOut: () => {}
});

function UserProvider({ children }: UserProviderProps) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [user, setUser] = useState<IUserProfile | null>(null);
	const [token, setTokenData] = useState<string | null>(null);

	const setToken = useCallback((tokenData: string | null) => {
		setTokenData(tokenData);
		console.log('tokenData1', tokenData);
		if (tokenData) {
			Cookies.set('auth-token', tokenData);
			console.log('tokenData', tokenData);
		} else {
			Cookies.remove('auth-token');
		}
	}, []);

	const logOut = useCallback(() => {
		setToken(null);
		setUser(null);
	}, []);

	const loadData = useCallback(async () => {
		const tokenData = Cookies.get('auth-token');
		setTokenData(tokenData || null);

		try {
			// if (tokenData) {
			// 	const { data } = await api.auth.getProfile();
			// 	setUser(data);
			// }
		} catch {
			setToken(null);
		} finally {
			setIsLoaded(true);
		}
	}, [setToken]);

	useEffect(() => {
		loadData();
	}, [loadData]);

	const contextValue = useMemo(
		() => ({
			isLoaded,
			user,
			token,
			setUser,
			setToken,
			logOut
		}),
		[isLoaded, user, token, setToken, logOut]
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

export { UserProvider, useProfile };
