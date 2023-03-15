import { ISlide } from '@/interfaces/shared';
import { FC, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Autoplay, Navigation } from 'swiper';
import { useBrowserTab } from '@/api/hooks/useBrowserTab';
import 'swiper/css/effect-fade';
import 'swiper/css';
import './Slider.scss';
import { Icon } from '../shared/Icon/Icon';

interface Props {
	slides: ISlide[] | undefined;
}

export const Slider: FC<Props> = ({ slides }) => {
	//const tabHasFocus = useBrowserTab();
	const [s, sS] = useState<any>();
	const [slasses, setClasses] = useState(['']);
	const sliderRef = useRef<HTMLDivElement>(null);
	const slidesSlide = slides?.length ? slides.length - 1 : 5;
	const slidesDelay = 4000;
	const prevBtn = useRef<HTMLButtonElement>(null);
	const nextBtn = useRef<HTMLButtonElement>(null);
	const paginationRef = useRef<HTMLDivElement>(null);

	const changeSlide = (swiper: any) => {
		// sS(swiper);
		if (slidesSlide === swiper.activeIndex) {
			setClasses((prev) => [...prev, 'line-delay']);
		} else {
			setClasses((prev) => [...prev.filter((i) => i !== 'line-delay')]);
		}
	};

	useEffect(() => {
		const slidesCount = slides?.length || 1;
		const animDuration = slidesCount * slidesDelay - slidesDelay;
		const pagination = document.querySelector('.swiper-pagination') as HTMLElement;
		if (pagination) pagination.style.animationDuration = animDuration + 20 + 'ms';
	}, [slides]);

	// useEffect(() => {
	// 	const pagination = document.querySelector('.swiper-pagination') as HTMLElement;
	// 	if (!tabHasFocus) {
	// 		s?.slideTo(0);
	// 		pagination && pagination.classList.add('stop-animate');
	// 	} else {
	// 		pagination && pagination.classList.remove('stop-animate');
	// 	}
	// }, [tabHasFocus]);

	return (
		<div ref={sliderRef} className={`Slider ${slasses.join(' ')}`}>
			<Swiper
				modules={[Navigation, Pagination, EffectFade, Autoplay]}
				onSlideChange={(swiper) => {
					changeSlide(swiper);
					swiper?.pagination?.bullets.forEach((b) => {
						b.innerHTML = '<span class="swiper-pagination-bullet-circle"></span>';
					});
				}}
				effect='fade'
				speed={0}
				autoHeight={false}
				simulateTouch={false}
				autoplay={{ delay: slidesDelay, disableOnInteraction: false }}
				pagination={{
					el: paginationRef.current,
					clickable: true
				}}
				navigation={{
					prevEl: prevBtn.current,
					nextEl: nextBtn.current
				}}
				onBeforeInit={(swiper: any): void => {
					swiper.params.navigation.prevEl = prevBtn.current;
					swiper.params.navigation.nextEl = nextBtn.current;
					swiper.params.pagination.el = paginationRef.current;
				}}>
				{slides?.map((slideContent, index) => (
					<SwiperSlide key={index}>
						<div className='Slider-slide'>
							<div className='Slider-image'>
								<img src={slideContent.img} alt={slideContent.title} />
								{/* {`/images/banner-02.png`} */}
							</div>
							<div className='Slider-text'>
								<div>
									<span className='Slider-slide-index'>
										{index > 9 ? index + 1 : '0' + (index + 1)}
									</span>
									<h3 className='Slider-slide-title'>{slideContent.title}</h3>
									{Array.isArray(slideContent.text) ? (
										slideContent.text.map((t, idx) => (
											<p className='Slider-slide-text' key={idx}>
												{t}
											</p>
										))
									) : (
										<p className='Slider-slide-text'>{slideContent.text}</p>
									)}
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<div className='Slider-controls'>
				<button className={'Slider-prev'} ref={prevBtn}>
					<Icon icon='arrow-left' color='primary' />
				</button>
				<div className='Slider-pagination' ref={paginationRef}></div>
				<button className={'Slider-next'} ref={nextBtn}>
					<Icon icon='arrow-rigth' color='primary' />
				</button>
			</div>
		</div>
	);
};
