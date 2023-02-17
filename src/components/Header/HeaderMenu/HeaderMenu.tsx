import { Background } from '@/components/shared/Background';
import { Button } from '@/components/shared/Button';
import { useInterfaceText } from '@/context/UserContext';
import { scrollToBlock } from '@/helpers/scrollToBlock';
import { IMenu } from '@/interfaces/shared';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import './HeaderMenu.scss';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data?: IMenu[];
	active: boolean;
	menuHandler: (s: boolean) => void;
}

export const HeaderMenu: FC<Props> = ({ data, active, menuHandler, ...props }) => {
	// const { pageInterfaceText } = useCommon();
	const { text: pageInterfaceText } = useInterfaceText();

	const handleClick = (hash: string) => {
		scrollToBlock(hash);
		menuHandler(false);
	};

	return (
		<nav className={`${props.className} HeaderMenu ${active && 'HeaderMenu-active'}`}>
			<ul className='HeaderMenu-list'>
				{data?.map((item) => (
					<li className='HeaderMenu-item' key={item.slug}>
						<Link
							onClick={() => handleClick(item.slug)}
							to={`/#${item.slug}`}
							reloadDocument={false}>
							{item.name}
						</Link>
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
