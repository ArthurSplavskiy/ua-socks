import { useMenuList } from '@/api/hooks/useMenuList';
import { Logo } from '@/assets/icons';
import { useDevice } from '@/context/DeviceContext';
import { AppRoutes } from '@/routes/AppRouter';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../shared/Button';
import { Icon } from '../shared/Icon/Icon';
import { HeaderMenu } from './HeaderMenu/HeaderMenu';
import { MenuIcon } from './HeaderMenu/MenuIcon';
import { useCommon } from '@/context/CommonContext';
import { useProfile } from '@/context/UserContext';
import Cookies from 'js-cookie';
import useRequest from '@/hooks/useRequest';
import api from '@/api';
import './Header.scss';
import { IMenu } from '@/interfaces/shared';

interface Props {
	type: 'account' | 'default';
}

export const Header: FC<Props> = ({ type = 'default' }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const { isTablet } = useDevice();
	const { user } = useProfile();
	const { pageInterfaceText, openLogin } = useCommon();
	const { data } = useRequest<IMenu[]>({
		method: 'GET',
		url: api.homePage.getMenuList
	});
	//const { data } = useMenuList();

	const handleClick = () => {
		setMenuOpen((prev) => !prev);
	};

	const HeaderProfile = () => (
		<div className='HeaderProfile'>
			<div className='HeaderProfile-icon'>
				<Icon icon='acc' size='20' color='white' />
			</div>
			<div className='HeaderProfile-email'>{user?.email}</div>
		</div>
	);

	const HeaderSign = () =>
		Cookies.get('auth-token') ? (
			<Link to={AppRoutes.ACCOUNT} className='HeaderAuth-link'>
				<Button color='outline' size='md' icon='account' btnType='iconRight'>
					{!isTablet && pageInterfaceText?.account_btn}
				</Button>
			</Link>
		) : (
			<Link to={AppRoutes.ACCOUNT} className='HeaderAuth-link'>
				<Button color='outline' size='md' icon='account' btnType='iconRight' onClick={openLogin}>
					{!isTablet && pageInterfaceText?.account_btn}
				</Button>
			</Link>
		);

	return (
		<header className={`Header Header-${type} page-offset`}>
			<div className='Header-wrapper'>
				{type === 'default' && (
					<div className='Header-menu-icon'>
						<MenuIcon active={menuOpen} onClick={handleClick} />
					</div>
				)}
				<div className='Header-logo'>
					<Link to={AppRoutes.HOME}>
						<Logo type={isTablet ? 'mobile' : 'desktop'} />
					</Link>
					{type === 'account' && (
						<div className={`Header-userId`}>
							ID:&nbsp;<span>12345</span>
						</div>
					)}
				</div>
				<HeaderMenu data={data} active={menuOpen} />
				<div className='Header-sign'>{type === 'default' ? <HeaderSign /> : <HeaderProfile />}</div>
			</div>
		</header>
	);
};
