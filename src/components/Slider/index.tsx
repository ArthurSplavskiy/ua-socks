import { ISlide } from '@/interfaces/shared';
import { FC, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Autoplay, Navigation } from 'swiper';
import './Slider.scss';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { useBrowserTab } from '@/api/hooks/useBrowserTab';

interface Props {
	slides: ISlide[] | undefined;
}

export const Slider: FC<Props> = ({ slides }) => {
	const tabHasFocus = useBrowserTab();
	const [s, sS] = useState<any>();
	const [slasses, setClasses] = useState(['']);
	const sliderRef = useRef<HTMLDivElement>(null);
	const slidesSlide = slides?.length ? slides.length - 1 : 5;
	const slidesDelay = 2000;

	const changeSlide = (swiper: any) => {
		sS(swiper);
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
		pagination.style.animationDuration = animDuration + 20 + 'ms';
	}, [slides]);

	useEffect(() => {
		const pagination = document.querySelector('.swiper-pagination') as HTMLElement;
		if (!tabHasFocus) {
			s?.slideTo(0);
			pagination.classList.add('stop-animate');
		} else {
			pagination.classList.remove('stop-animate');
		}
	}, [tabHasFocus]);

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
					clickable: false
				}}>
				{slides?.map((slideContent, index) => (
					<SwiperSlide key={index}>
						<div className='Slider-slide'>
							<div className='Slider-image'>
								<img src={`/images/slider/01.png`} alt={slideContent.title} />
								{/* {slideContent.img} */}
							</div>
							<div className='Slider-text'>
								<div>
									<span className='Slider-slide-index'>
										{index > 9 ? index + 1 : '0' + (index + 1)}
									</span>
									<h3 className='Slider-slide-title'>{slideContent.title}</h3>
									{slideContent.text.map((t, idx) => (
										<p className='Slider-slide-text' key={idx}>
											{t}
										</p>
									))}
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
