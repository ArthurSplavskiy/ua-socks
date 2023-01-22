import { useCommon } from '@/context/CommonContext';
import api from '@/api';
import { IHomeHero } from '@/interfaces/api';
import useRequest from '@/hooks/useRequest';
import { Button } from '@/components/shared/Button';
import { SectionHead } from '@/components/shared/SectionHead';
import './HomeQuestion.scss';

export const HomeQuestion = () => {
	const { pageInterfaceText } = useCommon();
	const { data } = useRequest<IHomeHero>({
		method: 'GET',
		url: api.homePage.getHeroData
	});
	return (
		<section className='HomeQuestion section-offset'>
			<SectionHead title={data?.title} subtitle={data?.subtitle} />
			<Button icon='telegram' btnType='iconLeft'>
				{pageInterfaceText?.question_btn}
			</Button>
			<div className={`HomeQuestion-image`}>
				<img src={'/images/hero-screenshot.svg'} alt={data?.title} />
				{/* {data?.img} */}
			</div>
		</section>
	);
};
