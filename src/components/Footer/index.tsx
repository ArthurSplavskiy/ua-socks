import { Logo } from '@/assets/icons';
import { FC } from 'react';
import { Button } from '../shared/Button';
import { Icon } from '../shared/Icon/Icon';
import { IncreateCopyright } from './IncreateCopyright';
import { Link } from 'react-router-dom';
import { useCommon } from '@/context/CommonContext';
import { useDevice } from '@/context/DeviceContext';
import { scrollToBlock } from '@/helpers/scrollToBlock';
import { AppRoutes } from '@/routes/AppRouter';
import Cookies from 'js-cookie';
import { useFooterLinks, useInterfaceText, useSupportLink } from '@/context/UserContext';
import './Footer.scss';

export const Footer: FC = () => {
	// const { data } = useRequest<IFooterLinks>({
	// 	method: 'GET',
	// 	url: api.homePage.getFooterData
	// });
	const { data } = useFooterLinks();
	const { text: pageInterfaceText } = useInterfaceText();
	const { openLogin } = useCommon();
	const { isMobile } = useDevice();
	const { data: supportLink } = useSupportLink();

	return (
		<footer className='Footer'>
			<div className='Footer-wrapper'>
				<div className='Footer-top'>
					<Logo type={'desktop'} />
					<div className='Footer-menu'>
						<nav className='Footer-menu-nav'>
							<ul>
								{data?.footer_menu.map((item) => (
									<li key={item.id}>
										<Link to={`/#${item.slug}`} onClick={() => scrollToBlock(item.slug)}>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</nav>
						{Cookies.get('auth-token') ? (
							<Link to={AppRoutes.ACCOUNT_DASHBOARD} className='Footer-acc-btn'>
								{pageInterfaceText?.profile_acc_text}
							</Link>
						) : (
							<button className='Footer-acc-btn' onClick={openLogin}>
								{pageInterfaceText?.profile_acc_text}
							</button>
						)}
					</div>
				</div>
				<div className='Footer-bottom'>
					<a className='Footer-telegram' href={supportLink} target='_blank'>
						<span>
							<Icon icon='telegram-outline' color='white' size='8' />
						</span>
						uasocks
					</a>
					<nav className='Footer-bottom-nav'>
						<ul>
							{data?.footer_privacy_links.map((item, idx) => (
								<li key={item.id + idx}>
									<Link to={'/' + item.slug}>{item.name}</Link>
								</li>
							))}
						</ul>
						<Button icon='telegram' btnType='iconLeft' width={isMobile ? 'fullWidth' : undefined}>
							{pageInterfaceText?.question_btn}
						</Button>
					</nav>
				</div>
				<div className='Footer-copyright'>
					<div>©UAsocks</div>
					<IncreateCopyright />
				</div>
			</div>
		</footer>
	);
};
