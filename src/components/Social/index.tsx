import { Logo } from '@/assets/icons';
import { SocialLine } from '@/assets/icons/SocialLine';
import { ISocial } from '@/interfaces/shared';
import { FC } from 'react';
import { useInView } from 'react-intersection-observer';
import './Social.scss';

interface Props {
	data?: ISocial[];
}

export const Social: FC<Props> = ({ data }) => {
	// const leftIcons: (ISocial | undefined)[] = [data?.[0], data?.[1], data?.[2], data?.[3]];
	// const rightIcons: (ISocial | undefined)[] = [data?.[4], data?.[5], data?.[6], data?.[7]];

	const { ref, inView } = useInView({
		threshold: 1
	});
	const { ref: ref2, inView: inView2 } = useInView({
		threshold: 1
	});
	const { ref: ref3, inView: inView3 } = useInView({
		threshold: 1
	});
	const { ref: ref4, inView: inView4 } = useInView({
		threshold: 0.8
	});

	const { ref: logoRef, inView: inViewLogo } = useInView({
		threshold: 0.8
	});

	return (
		<div className={'Social'}>
			<div className={'Social-left'}>
				{/* {leftIcons?.map((icon, index) => (
					<div key={index} className='Social-item'>
						<a ref={ref} href={icon?.link} target='_blank' className={`Social-icon ${inView && 'fadeIn'}`}>
							<img src={icon?.icon} alt={icon?.name} />
						</a>
						<SocialLine className={`Social-line ${inView && 'draw'}`} index={index + 1} />
					</div>
				))} */}
				<div className='Social-item'>
					<a
						ref={ref}
						href={data?.[0].link}
						target='_blank'
						className={`Social-icon ${inView && 'fadeIn'}`}>
						<img src={data?.[0].icon} alt={data?.[0].name} />
						<div className='Social-icon-name'>{data?.[0].name}</div>
					</a>
					<SocialLine className={`Social-line ${inView && 'draw'}`} index={1} />
				</div>
				<div className='Social-item'>
					<a
						ref={ref2}
						href={data?.[1].link}
						target='_blank'
						className={`Social-icon ${inView2 && 'fadeIn'}`}>
						<img src={data?.[1].icon} alt={data?.[1].name} />
						<div className='Social-icon-name'>{data?.[1].name}</div>
					</a>
					<SocialLine className={`Social-line ${inView2 && 'draw'}`} index={2} />
				</div>
				<div className='Social-item'>
					<a
						ref={ref3}
						href={data?.[2].link}
						target='_blank'
						className={`Social-icon ${inView3 && 'fadeIn'}`}>
						<img src={data?.[2].icon} alt={data?.[2].name} />
						<div className='Social-icon-name'>{data?.[2].name}</div>
					</a>
					<SocialLine className={`Social-line ${inView3 && 'draw'}`} index={3} />
				</div>
				<div className='Social-item'>
					<a
						ref={ref4}
						href={data?.[3].link}
						target='_blank'
						className={`Social-icon ${inView4 && 'fadeIn'}`}>
						<img src={data?.[3].icon} alt={data?.[3].name} />
						<div className='Social-icon-name'>{data?.[3].name}</div>
					</a>
					<SocialLine className={`Social-line ${inView4 && 'draw'}`} index={4} />
				</div>
			</div>
			<div ref={logoRef} className={`Social-logo ${inViewLogo && 'fadeIn'}`}>
				<img src='src/assets/images/ua-big.svg' alt='ua socks' />
			</div>
			<div className={'Social-right'}>
				{/* {rightIcons?.map((icon, index) => (
					<div key={index} className='Social-item'>
						<SocialLine className='Social-line Social-line-right' index={4 + index + 1} />
						<a href={icon?.link} target='_blank' className={`Social-icon ${inView && 'fadeIn'}`}>
							<img src={icon?.icon} alt={icon?.name} />
						</a>
					</div>
				))} */}
				<div className='Social-item'>
					<a href={data?.[4].link} target='_blank' className={`Social-icon ${inView && 'fadeIn'}`}>
						<img src={data?.[4].icon} alt={data?.[4].name} />
						<div className='Social-icon-name'>{data?.[4].name}</div>
					</a>
					<SocialLine className={`Social-line ${inView && 'draw'}`} index={5} />
				</div>
				<div className='Social-item'>
					<a href={data?.[5].link} target='_blank' className={`Social-icon ${inView2 && 'fadeIn'}`}>
						<img src={data?.[5].icon} alt={data?.[5].name} />
						<div className='Social-icon-name'>{data?.[5].name}</div>
					</a>
					<SocialLine className={`Social-line ${inView2 && 'draw'}`} index={6} />
				</div>
				<div className='Social-item'>
					<a href={data?.[6].link} target='_blank' className={`Social-icon ${inView3 && 'fadeIn'}`}>
						<img src={data?.[6].icon} alt={data?.[6].name} />
						<div className='Social-icon-name'>{data?.[6].name}</div>
					</a>
					<SocialLine className={`Social-line ${inView3 && 'draw'}`} index={7} />
				</div>
				<div className='Social-item'>
					<a href={data?.[7].link} target='_blank' className={`Social-icon ${inView4 && 'fadeIn'}`}>
						<img src={data?.[7].icon} alt={data?.[7].name} />
						<div className='Social-icon-name'>{data?.[7].name}</div>
					</a>
					<SocialLine className={`Social-line ${inView4 && 'draw'}`} index={8} />
				</div>
			</div>
		</div>
	);
};
