import { AccountSidebar } from '@/components/Account';
import { Header } from '@/components/Header';
import { PrivatePopups } from '@/components/PopupSystem/privatePopups';
import { Background } from '@/components/shared/Background';
import { AccountProvider } from '@/context/Account/AccountContextProvider';
import { AppRoutes } from '@/routes/AppRouter';
import { FC, useEffect } from 'react';
import { Outlet, redirect } from 'react-router-dom';
import './AccountLayout.scss';

export async function accountLayoutLoader() {
  if (!localStorage.getItem('auth-token')) {
    return redirect(AppRoutes.HOME);
  }
  return null;
}

const AccountLayout: FC = () => {
  return (
    <AccountProvider>
      <div className='AccountLayout'>
        <Header type='account' />
        <div className='AccountLayout-main'>
          <AccountSidebar />
          <Outlet />
        </div>
        <Background color='white' />
        <PrivatePopups />
      </div>
    </AccountProvider>
  );
};

export default AccountLayout;
