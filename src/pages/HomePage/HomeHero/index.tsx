import styles from './HomeHero.module.scss';
import { Button } from '@/components/shared/Button';
import { useHomeHero, useInterfaceText } from '@/context/UserContext';

export const HomeHero = () => {
  // const { pageInterfaceText } = useCommon();
  const { text: pageInterfaceText } = useInterfaceText();
  const { data, isLoading } = useHomeHero();
  // const { data, isLoading } = useRequest<IHomeHero>({
  // 	method: 'GET',
  // 	url: api.homePage.getHeroData
  // });
  return (
    <section className={styles.homeHero}>
      <h1 className={`${styles.title} ${!isLoading && styles.hasMotion}`}>
        <span>{data?.title}</span> <br /> <span>{data?.title_gradient}</span>
      </h1>
      <p className={`HomeHero-subtitle ${styles.subTitle}`}>{data?.subtitle}</p>
      <Button className={styles.buyBtn}>{pageInterfaceText?.buyProxy_btn}</Button>
      <div className={`HomeHero-image`}>
        <img
          className={`${styles.img} ${isLoading ? '' : styles.imgLoaded}`}
          //src={'/images/banner-01.png'}
          src={data?.img}
          alt={data?.title + ' ' + data?.title_gradient}
        />
      </div>
    </section>
  );
};
