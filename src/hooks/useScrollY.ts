import { useEffect, useRef, useState } from 'react';

export const useScrollY = (): {
	scrollY: number;
	direction: number;
	setScrollY: (y: number) => void;
} => {
	const isBrowser = typeof window !== undefined;
	const timerRef = useRef<ReturnType<typeof setTimeout>>();

	const [scrollY, setScrollY] = useState<number>(0);
	const [direction, setDirection] = useState<number>(0);

	const handleScroll = (e: any): void => {
		clearTimeout(timerRef.current);
		const currentScroll = isBrowser ? window.scrollY : 0;
		setScrollY(currentScroll);
		setDirection(e.deltaY);
		timerRef.current = setTimeout(() => {
			setDirection(-1);
		}, 500);
	};

	useEffect(() => {
		setScrollY(window.scrollY);
		window.addEventListener('wheel', handleScroll, { passive: true });

		setTimeout(() => {
			if (window.pageYOffset > 0) {
				setScrollY(window.pageYOffset);
			}
		}, 1000);

		return () => window.removeEventListener('wheel', handleScroll);
	}, []);

	return { scrollY, direction, setScrollY };
};
