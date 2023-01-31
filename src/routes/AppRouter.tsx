import { createBrowserRouter, redirect } from 'react-router-dom';
import PageLayout from '@/layouts/PageLayout';
import ErrorPage from '@/pages/ErrorPage';
import HomePage from '@/pages/HomePage';
import AccountLayout, { accountLayoutLoader } from '@/layouts/AccountLayout';
import { AccountDashboard } from '@/pages/AccountPage/AccountDashboard';
import { AccountBuy } from '@/pages/AccountPage/AccountBuy';
import { AccountSettings } from '@/pages/AccountPage/AccountSettings';
import { AccountSupport } from '@/pages/AccountPage/AccountSupport';
import PrivacyPage from '@/pages/PrivacyPage';

export enum AppRoutes {
	HOME = '/',
	ACCOUNT = '/account',
	PRIVACY_POLICY = '/privacy-policy'
}

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
				path: '/account/dashboard',
				element: <AccountDashboard />
			},
			{
				path: '/account/buy',
				element: <AccountBuy />
			},
			{
				path: '/account/settings',
				element: <AccountSettings />
			},
			{
				path: '/account/support',
				element: <AccountSupport />
			}
		]
	},
	{
		path: '/privacy-policy',
		element: <PageLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/privacy-policy',
				element: <PrivacyPage />
			}
		]
	}
]);

export default AppRouter;
