import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PublicPopups } from '@/components/PopupSystem/publicPopups';
import { Background } from '@/components/shared/Background';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import './PageLayout.scss';

const PageLayout: FC = () => {
	return (
		<div className='PageLayout'>
			<Header type='default' />
			<div className='PageLayout-main page-offset'>
				<Outlet />
			</div>
			<Background color='grey' />
			<PublicPopups />
			<Footer />
		</div>
	);
};

export default PageLayout;
