import { CookieBanner } from '@/components/CookieBanner';
import { CustomHead } from '@/components/CustomHead';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PublicPopups } from '@/components/PopupSystem/publicPopups';
import { Background } from '@/components/shared/Background';
import { CookieBannerBg } from '@/components/shared/Background/CookieBannerBg';
import { FC } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import './PageLayout.scss';

const PageLayout: FC = () => {
	return (
		<div className='PageLayout'>
			<CustomHead />
			<ScrollRestoration />
			<Header type='default' />
			<div className='PageLayout-main page-offset'>
				<Outlet />
			</div>
			<Background color='grey' />
			<PublicPopups />
			<CookieBanner bg={<CookieBannerBg />} />
			<Footer />
		</div>
	);
};

export default PageLayout;
