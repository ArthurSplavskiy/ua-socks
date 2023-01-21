import { FC } from 'react';
import { useInView } from 'react-intersection-observer';
import ReactPlayer from 'react-player';
import './HomeVideo.scss';

export const HomeVideo: FC = () => {
	const { ref, inView } = useInView({
		threshold: 0
	});

	return (
		<div ref={ref} className={`HomeVideo section-offset ${inView}`}>
			<div className='HomeVideo-video'>
				<ReactPlayer url={inView ? 'https://www.youtube.com/watch?v=lR8wafJfSxg' : ''} />
			</div>
		</div>
	);
};
