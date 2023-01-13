import { createBrowserRouter, redirect } from 'react-router-dom';
import PageLayout from '@/layouts/PageLayout';
import ErrorPage from '@/view/pages/ErrorPage';
import HomePage from '@/view/pages/HomePage';
import AccountLayout, { accountLayoutLoader } from '@/layouts/AccountLayout';
import { useProfile } from '@/context/UserContext';

export enum AppRoutes {
	HOME = '/',
	ACCOUNT = '/account'
}

const getUser = async () => {
	return new Promise((resolve) => setTimeout(resolve, 5000));
};

const loader = async () => {
	const user = await getUser();
	if (!user) {
		return redirect('/');
	}
};

const Account: React.FC = () => {
	return <>Account</>;
};

const AppRouter = createBrowserRouter([
	{
		path: '/',
		element: <PageLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <HomePage />
			}
		]
	},
	{
		path: '/account',
		element: <AccountLayout />,
		errorElement: <ErrorPage />,
		loader: accountLayoutLoader,
		children: [
			{
				path: '/account',
				element: <Account />
			}
		]
	}
]);

export default AppRouter;
