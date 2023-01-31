import { Icon } from '@/components/shared/Icon/Icon';
import { useCommon } from '@/context/CommonContext';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

export const AccountSidebar: FC = () => {
	const { pageInterfaceText } = useCommon();
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
				</ul>
			</nav>
			<button className={'Sidebar-exit'}>
				<Icon icon='exit' />
				<span>Вихід</span>
			</button>
		</div>
	);
};
