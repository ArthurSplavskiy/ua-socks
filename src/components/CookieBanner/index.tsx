import { useCommon } from '@/context/CommonContext';
import Cookies from 'js-cookie';
import { FC, ReactNode, useEffect, useState } from 'react';
import { Button } from '../shared/Button';
import './index.scss';

interface Props {
	bg: ReactNode;
}

export const CookieBanner: FC<Props> = ({ bg }) => {
	const { pageInterfaceText } = useCommon();
	const [isOpen, setIsOpen] = useState(true);
	const [noRender, setIsNoRender] = useState(false);

	const handleClick = (answer: boolean) => {
		setIsOpen(false);
		if (answer) {
			Cookies.set('allow-cookie', 'allow');
		}
	};

	useEffect(() => {
		if (Cookies.get('allow-cookie')) {
			setIsNoRender(true);
		}
	}, []);

	if (noRender) {
		return <></>;
	}

	return (
		<div className={`CookieBannerWrapper ${isOpen ? '' : 'CookieBannerWrapper-close'}`}>
			<div className={'CookieBanner'}>
				<img src='images/cookies.png' alt='cookies' />
				<p>{pageInterfaceText?.cookies_agreement_text}</p>
				<div className={'CookieBanner-btns'}>
					<Button onClick={() => handleClick(false)} color='outline'>
						{pageInterfaceText?.no}
					</Button>
					<Button onClick={() => handleClick(true)}>{pageInterfaceText?.yes}</Button>
				</div>
				{bg}
			</div>
		</div>
	);
};
