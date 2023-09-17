import styles from './HomeHero.module.scss';
import { Button } from '@/components/shared/Button';
import { useCommon } from '@/context/CommonContext';
import { useHomeHero, useInterfaceText } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';

export const HomeHero = () => {
  // const { pageInterfaceText } = useCommon();
  const { text: pageInterfaceText } = useInterfaceText();
  const { data, isLoading } = useHomeHero();
  const navigate = useNavigate();
  const { openLogin } = useCommon();
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
      <Button
        className={styles.buyBtn}
        onClick={() => {
          if (!!localStorage.getItem('auth-token') === false) {
            openLogin();
            return;
          }
          if (location.pathname === '/') {
            navigate('/account/buy');
          }
        }}>
        {pageInterfaceText?.buyProxy_btn}
      </Button>
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
