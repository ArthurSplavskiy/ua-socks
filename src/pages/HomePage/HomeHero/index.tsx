import { useCommon } from '@/context/CommonContext';
import styles from './HomeHero.module.scss';
import api from '@/api';
import { IHomeHero } from '@/interfaces/api';
import useRequest from '@/hooks/useRequest';
import { Button } from '@/components/shared/Button';

export const HomeHero = () => {
	const { pageInterfaceText } = useCommon();
	const { data, isLoading } = useRequest<IHomeHero>({
		method: 'GET',
		url: api.homePage.getHeroData
	});
	return (
		<section className={styles.homeHero}>
			<h1 className={`${styles.title} ${!isLoading && styles.hasMotion}`}>
				<span>{data?.title}</span> <br /> <span>{data?.title_gradient}</span>
			</h1>
			<p className={`HomeHero-subtitle ${styles.subTitle}`}>{data?.subtitle}</p>
			<Button className={styles.buyBtn}>{pageInterfaceText?.buyProxy_btn}</Button>
			<div className={`HomeHero-image`}>
				<img
					className={styles.img}
					src={'/images/hero-screenshot.svg'}
					//src={data?.img}
					alt={data?.title + ' ' + data?.title_gradient}
				/>
			</div>
		</section>
	);
};
