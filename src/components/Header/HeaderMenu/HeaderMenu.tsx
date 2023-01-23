import { Background } from '@/components/shared/Background';
import { Button } from '@/components/shared/Button';
import { useCommon } from '@/context/CommonContext';
import { IMenu } from '@/interfaces/shared';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import './HeaderMenu.scss';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data?: IMenu[];
	active: boolean;
}

export const HeaderMenu: FC<Props> = ({ data, active, ...props }) => {
	const { pageInterfaceText } = useCommon();

	const handleClick = (hash: string) => {
		location.hash = '#' + hash;
	};

	return (
		<nav className={`${props.className} HeaderMenu ${active && 'HeaderMenu-active'}`}>
			<ul className='HeaderMenu-list'>
				{data?.map((item) => (
					<li className='HeaderMenu-item' key={item.slug} onClick={() => handleClick(item.slug)}>
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
