import { DetailedHTMLProps, FC, HTMLAttributes, useEffect, useRef, useState } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	activeId: number;
	title: string;
	text: string;
}

export const HoverItem: FC<Props> = ({ activeId, title, text, ...props }) => {
	const itemTextRef = useRef<HTMLDivElement>(null);
	const itemRef = useRef<HTMLDivElement>(null);
	const [itemHeight, setItemHeight] = useState(0);

	useEffect(() => {
		if (!itemRef.current?.dataset?.id) return;
		if (+itemRef.current.dataset.id === activeId) {
			setItemHeight(itemTextRef.current?.scrollHeight || 0);
		} else {
			setItemHeight(0);
		}
	}, [props]);

	return (
		<div ref={itemRef} className={`HoverTabs-item ${!!itemHeight && 'active'}`} {...props}>
			<div className='HoverTabs-item-title'>{title}</div>
			<div ref={itemTextRef} className='HoverTabs-item-text' style={{ height: itemHeight + 'px' }}>
				{text}
			</div>
		</div>
	);
};
