import { DetailedHTMLProps, FC, HTMLAttributes, useEffect, useRef, useState } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	activeId: number;
	image: string;
}

export const HoverImage: FC<Props> = ({ activeId, image, ...props }) => {
	const imgRef = useRef<HTMLDivElement>(null);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if (!imgRef.current?.dataset?.id) return;
		+imgRef.current.dataset.id === activeId ? setIsActive(true) : setIsActive(false);
	}, [props]);

	return (
		<div ref={imgRef} className={`HoverTabs-img ${isActive && 'active'}`} {...props}>
			<img src={image} />
		</div>
	);
};
