import { useMenuList } from '@/api/hooks/useMenuList';
import { Logo } from '@/assets/icons';
import { useDevice } from '@/context/DeviceContext';
import { AppRoutes } from '@/routes/AppRouter';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../shared/Button';
import { Icon } from '../shared/Icon/Icon';
import { HeaderMenu } from './HeaderMenu/HeaderMenu';
import './Header.scss';
import { MenuIcon } from './HeaderMenu/MenuIcon';
import { useCommon } from '@/context/CommonContext';
import { ModalPopup } from '../PopupSystem/ModalPopup/ModalPopup';
import { TemplateModal } from '../PopupSystem/TemplateModal/TemplateModal';
import { RegisterForm } from '../Forms/RegisterForm';
import { Background } from '../shared/Background';
import { useProfile } from '@/context/UserContext';

interface Props {
	type: 'account' | 'default';
}

export const Header: FC<Props> = ({ type = 'default' }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const { isTablet } = useDevice();
	const { user } = useProfile();
	const {
		pageInterfaceText,
		isRegistrationPopupOpen,
		openRegistration,
		openLogin,
		closeRegistration,
		popupHide,
		isPopupHide
	} = useCommon();
	const { data } = useMenuList();

	// const [isOpen, setIsOpen] = useState(false);
	// const [isHide, setIsHide] = useState(false);
	const [isOpen2, setIsOpen2] = useState(false);
	const [isOpen3, setIsOpen3] = useState(false);

	const handleClick = () => {
		setMenuOpen((prev) => !prev);
	};

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
				<div className='Header-sign'>
					{type === 'default' ? (
						<Link to={AppRoutes.ACCOUNT}>
							<Button color='outline' size='md' icon='account' btnType='iconRight'>
								{!isTablet && pageInterfaceText?.account_btn}
							</Button>
						</Link>
					) : (
						<div className='HeaderProfile'>
							<div className='HeaderProfile-icon'>
								<Icon icon='acc' size='20' color='white' />
							</div>
							<div className='HeaderProfile-email'>{user?.email}</div>
						</div>
					)}
				</div>
			</div>

			<button onClick={openRegistration}>popup open</button>
			<button onClick={openLogin}>popup open 2</button>
		</header>
	);
};
