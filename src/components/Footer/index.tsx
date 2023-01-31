import { Logo } from '@/assets/icons';
import useRequest from '@/hooks/useRequest';
import { IFooterLinks } from '@/interfaces/api';
import { FC } from 'react';
import { Button } from '../shared/Button';
import { Icon } from '../shared/Icon/Icon';
import { IncreateCopyright } from './IncreateCopyright';
import api from '@/api';
import { Link } from 'react-router-dom';
import { useCommon } from '@/context/CommonContext';
import './Footer.scss';
import { useDevice } from '@/context/DeviceContext';

export const Footer: FC = () => {
	const { data } = useRequest<IFooterLinks>({
		method: 'GET',
		url: api.homePage.getFooterData
	});
	const { pageInterfaceText, openLogin } = useCommon();
	const { isMobile } = useDevice();

	const handleClick = (hash: string) => {
		location.hash = '#' + hash;
	};

	return (
		<footer className='Footer'>
			<div className='Footer-wrapper'>
				<div className='Footer-top'>
					<Logo type={'desktop'} />
					<div className='Footer-menu'>
						<nav className='Footer-menu-nav'>
							<ul>
								{data?.footer_menu.map((item) => (
									<li key={item.id} onClick={() => handleClick(item.slug)}>
										{item.name}
									</li>
								))}
							</ul>
						</nav>
						<button className='Footer-acc-btn' onClick={openLogin}>
							{pageInterfaceText?.profile_acc_text}
						</button>
					</div>
				</div>
				<div className='Footer-bottom'>
					<a className='Footer-telegram' href='http://telegram.com' target='_blank'>
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
