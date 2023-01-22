import { IAdvantages } from '@/interfaces/shared';
import React, { FC, useState } from 'react';
import { HoverImage } from './HoverImage';
import { HoverItem } from './HoverItem';
import './HoverTabs.scss';

interface Props {
	data: IAdvantages[];
}

export const HoverTabs: FC<Props> = ({ data }) => {
	const [activeIndex, setActiveIndex] = useState(1);

	const mouseOverHandler = (e: React.MouseEvent) => {
		const itemIndex = e.currentTarget as HTMLDivElement;
		itemIndex.dataset.id && setActiveIndex(+itemIndex.dataset.id);
	};

	const mouseLeaveHandler = () => {};

	return (
		<div className='HoverTabs'>
			<div className='HoverTabs-items'>
				{data.map((item) => (
					<HoverItem
						key={item.id}
						data-id={item.id}
						activeId={activeIndex}
						title={item.title}
						text={item.text}
						onMouseOver={mouseOverHandler}
						onMouseLeave={mouseLeaveHandler}
					/>
				))}
			</div>
			<div className='HoverTabs-images'>
				{data.map((item, idx) => (
					<HoverImage
						key={item.img}
						data-id={item.id}
						activeId={activeIndex}
						image={`/images/advantages/0${idx + 1}.svg`}
					/>
					//image={item.img}
				))}
			</div>
		</div>
	);
};
