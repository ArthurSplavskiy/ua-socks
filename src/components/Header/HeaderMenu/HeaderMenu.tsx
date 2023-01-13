import { Background } from '@/components/shared/Background';
import { Button } from '@/components/shared/Button';
import { useCommon } from '@/context/CommonContext';
import { IMenu } from '@/interfaces/api';
import { FC } from 'react';
import './HeaderMenu.scss';

interface Props {
	data: IMenu[];
	active: boolean;
}

export const HeaderMenu: FC<Props> = ({ data, active }) => {
	const { pageInterfaceText } = useCommon();
	return (
		<nav className={`HeaderMenu ${active && 'HeaderMenu-active'}`}>
			<ul className='HeaderMenu-list'>
				{data.map((item) => (
					<li className='HeaderMenu-item' key={item.slug}>
						{item.name}
					</li>
				))}
			</ul>
			<div className='HeaderMenu-footer'>
				<Button icon='telegram' btnType='iconLeft' btnLink width='fullWidth'>
					{pageInterfaceText?.question_btn}
				</Button>
			</div>
			<Background color='grey' />
		</nav>
	);
};
