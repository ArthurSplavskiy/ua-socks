import { useDevice } from '@/context/DeviceContext';
import { IAdvantages } from '@/interfaces/shared';
import React, { FC, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { HoverImage } from './HoverImage';
import { HoverItem } from './HoverItem';
import './HoverTabs.scss';

interface Props {
	data: IAdvantages[];
}

export const HoverTabs: FC<Props> = ({ data }) => {
	const [activeIndex, setActiveIndex] = useState(1);
	const { isMobile } = useDevice();
	const { ref, inView } = useInView({
		threshold: 0.5
	});

	const mouseOverHandler = (e: React.MouseEvent) => {
		const itemIndex = e.currentTarget as HTMLDivElement;
		itemIndex.dataset.id && setActiveIndex(+itemIndex.dataset.id);
	};

	const mouseLeaveHandler = () => {};

	return (
		<div ref={ref} className='HoverTabs'>
			<div className={`HoverTabs-items ${inView && !isMobile ? 'in-view' : ''}`}>
				{data.map((item, idx) => (
					<HoverItem
						key={item.id}
						data-id={item.id}
						activeId={activeIndex}
						title={item.title}
						text={item.text}
						mobileImage={`/images/advantages/0${idx + 1}.svg`}
						onMouseOver={mouseOverHandler}
						onMouseLeave={mouseLeaveHandler}
					/>
				))}
			</div>
			<div className={`HoverTabs-images ${inView && !isMobile ? 'in-view' : ''}`}>
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
