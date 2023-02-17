import { Icon } from '@/components/shared/Icon/Icon';
import { useDevice } from '@/context/DeviceContext';
import { useInterfaceText, useProfile } from '@/context/UserContext';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

export const AccountSidebar: FC = () => {
	// const { pageInterfaceText } = useCommon();
	const { text: pageInterfaceText } = useInterfaceText();
	const { isTablet } = useDevice();
	const { logOut } = useProfile();

	return (
		<div className={'Sidebar'}>
			<nav className={'Sidebar-nav'}>
				<ul className={'Sidebar-nav-list'}>
					<li className={'Sidebar-nav-item'}>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'Sidebar-nav-link is-active' : 'Sidebar-nav-link'
							}
							to={'/account/dashboard'}>
							<span className={'Sidebar-nav-icon'}>
								<Icon icon='proxy' />
							</span>
							<span className={'Sidebar-nav-text'}>{pageInterfaceText?.account_link_1}</span>
						</NavLink>
					</li>
					<li className={'Sidebar-nav-item'}>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'Sidebar-nav-link is-active' : 'Sidebar-nav-link'
							}
							to={'/account/buy'}>
							<span className={'Sidebar-nav-icon'}>
								<Icon icon='coin' />
							</span>
							<span className={'Sidebar-nav-text'}>{pageInterfaceText?.account_link_2}</span>
						</NavLink>
					</li>
					<li className={'Sidebar-nav-item'}>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'Sidebar-nav-link is-active' : 'Sidebar-nav-link'
							}
							to={'/account/settings'}>
							<span className={'Sidebar-nav-icon'}>
								<Icon icon='setting' />
							</span>
							<span className={'Sidebar-nav-text'}>{pageInterfaceText?.account_link_3}</span>
						</NavLink>
					</li>
					<li className={'Sidebar-nav-item'}>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'Sidebar-nav-link is-active' : 'Sidebar-nav-link'
							}
							to={'/account/support'}>
							<span className={'Sidebar-nav-icon'}>
								<Icon icon='support' />
							</span>
							<span className={'Sidebar-nav-text'}>{pageInterfaceText?.account_link_4}</span>
						</NavLink>
					</li>
					{isTablet && (
						<button className={'Sidebar-exit'} onClick={logOut}>
							<span>
								<Icon icon='exit' />
							</span>
							<span>Вихід</span>
						</button>
					)}
				</ul>
			</nav>
			{!isTablet && (
				<button className={'Sidebar-exit'} onClick={logOut}>
					<span>
						<Icon icon='exit' />
					</span>
					<span>Вихід</span>
				</button>
			)}
		</div>
	);
};
