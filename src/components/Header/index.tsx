import { Logo } from '@/assets/icons';
import { useDevice } from '@/context/DeviceContext';
import { AppRoutes } from '@/routes/AppRouter';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../shared/Button';
import { Icon } from '../shared/Icon/Icon';
import { HeaderMenu } from './HeaderMenu/HeaderMenu';
import { MenuIcon } from './HeaderMenu/MenuIcon';
import { useCommon } from '@/context/CommonContext';
import { useInterfaceText, useMenu, useProfile } from '@/context/UserContext';
import { useScrollY } from '@/hooks/useScrollY';
import Cookies from 'js-cookie';
import './Header.scss';

interface Props {
	type: 'account' | 'default';
}

export const Header: FC<Props> = ({ type = 'default' }) => {
	const { scrollY, direction } = useScrollY();
	const [menuOpen, setMenuOpen] = useState(false);
	const { isTablet } = useDevice();
	const { user } = useProfile();
	const { openLogin } = useCommon();
	const { text: pageInterfaceText } = useInterfaceText();
	const { data, isLoading } = useMenu();
	// const { data, isLoading } = useRequest<IMenu[]>({
	// 	method: 'GET',
	// 	url: api.homePage.getMenuList
	// });
	//const { data } = useMenuList();

	const handleClick = () => {
		setMenuOpen((prev) => !prev);
	};

	useEffect(() => {
		if (menuOpen) {
			document.body.classList.add('noscroll');
		} else {
			document.body.classList.remove('noscroll');
		}
	}, [menuOpen]);

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
			<Link to={AppRoutes.ACCOUNT_DASHBOARD} className='HeaderAuth-link'>
				<Button color='outline' size='md' icon='account' btnType='iconRight'>
					{!isTablet && pageInterfaceText?.account_btn}
				</Button>
			</Link>
		) : (
			<div className='HeaderAuth-link'>
				<Button color='outline' size='md' icon='account' btnType='iconRight' onClick={openLogin}>
					{!isTablet && pageInterfaceText?.account_btn}
				</Button>
			</div>
		);

	return (
		<>
			<div className={`Header-preloader Header-${type}`}></div>
			<header
				className={`Header Header-${type} page-offset ${scrollY > 50 ? 'Header-scroll' : ''} ${
					direction > 0 && scrollY > 768 ? 'Header-hide' : ''
				} ${isLoading ? 'Header-hide' : ''} ${menuOpen ? 'Header-fixed' : ''}`}>
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
					<HeaderMenu data={data} active={menuOpen} menuHandler={setMenuOpen} />
					<div className='Header-sign'>
						{type === 'default' ? <HeaderSign /> : <HeaderProfile />}
					</div>
				</div>
			</header>
		</>
	);
};
