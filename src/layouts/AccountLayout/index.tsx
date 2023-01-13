import { Header } from '@/components/Header';
import { Background } from '@/components/shared/Background';
import { useProfile } from '@/context/UserContext';
import { AppRoutes } from '@/routes/AppRouter';
import Cookies from 'js-cookie';
import { FC } from 'react';
import { Outlet, redirect, useNavigate } from 'react-router-dom';

//const { user } = useProfile();

export async function accountLayoutLoader() {
	const token = Cookies.get('auth-token');
	if (!token) {
		return redirect(AppRoutes.HOME);
	}
	return null;
}

const AccountLayout: FC = (): any => {
	// const { user } = useProfile();
	// console.log(user);
	// if (!user) {
	// 	return redirect('/login');
	// }
	// const loader = async () => {
	// 	if (!user) {
	// 		return redirect(AppRoutes.HOME);
	// 	}
	// };

	return (
		<div className='AccountLayout'>
			<Header type='account' />
			<div className='AccountLayout-main'>
				<Outlet />
			</div>
			<Background color='white' />
		</div>
	);
};

export default AccountLayout;
