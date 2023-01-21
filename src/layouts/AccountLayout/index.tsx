import { Header } from '@/components/Header';
import { PrivatePopups } from '@/components/PopupSystem/privatePopups';
import { Background } from '@/components/shared/Background';
import { useProfile } from '@/context/UserContext';
import { AppRoutes } from '@/routes/AppRouter';
import Cookies from 'js-cookie';
import { FC } from 'react';
import { Outlet, redirect, useNavigate } from 'react-router-dom';

export async function accountLayoutLoader() {
	const token = Cookies.get('auth-token');
	if (!token) {
		return redirect(AppRoutes.HOME);
	}
	return null;
}

const AccountLayout: FC = () => {
	return (
		<div className='AccountLayout'>
			<Header type='account' />
			<div className='AccountLayout-main'>
				<Outlet />
			</div>
			<Background color='white' />
			<PrivatePopups />
		</div>
	);
};

export default AccountLayout;
