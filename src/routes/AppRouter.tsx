import { createBrowserRouter, RouteObject } from 'react-router-dom';
import PageLayout from '@/layouts/PageLayout';
import ErrorPage from '@/pages/ErrorsPage';
import HomePage from '@/pages/HomePage';
import AccountLayout, { accountLayoutLoader } from '@/layouts/AccountLayout';
import { AccountDashboard } from '@/pages/AccountPage/AccountDashboard';
import { AccountBuy } from '@/pages/AccountPage/AccountBuy';
import { AccountSettings } from '@/pages/AccountPage/AccountSettings';
import { AccountSupport } from '@/pages/AccountPage/AccountSupport';
import PrivacyPage from '@/pages/PrivacyPage';
import { IMenu } from '@/interfaces/shared';

export enum AppRoutes {
  HOME = '/',
  ACCOUNT_DASHBOARD = '/account/dashboard',
  PRIVACY_POLICY = '/privacy-policy'
}

const createStaticRoutes = async (): Promise<RouteObject[]> => {
  let routes: RouteObject[] = [];
  let apiRoutes: string[] = [];
  await fetch(`${import.meta.env.VITE_API_URL}/uk/home`)
    .then((response) => response.json())
    .then(
      (json) => (apiRoutes = json?.footer_links?.footer_privacy_links.map((el: IMenu) => el.slug))
    );

  apiRoutes.forEach((slug: string) => {
    routes.push({
      path: `/${slug}`,
      element: <PageLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: `/${slug}`,
          element: <PrivacyPage slug={slug} />
        }
      ]
    });
  });
  return routes;
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
      },
      {
        path: '/login',
        element: <HomePage />
      }
    ]
  },
  {
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
  ...(await createStaticRoutes())
]);

export default AppRouter;
