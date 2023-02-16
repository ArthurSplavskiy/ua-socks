import { useCommon } from '@/context/CommonContext';
import api from '@/api';
import { IHomeQuestion } from '@/interfaces/api';
import useRequest from '@/hooks/useRequest';
import { Button } from '@/components/shared/Button';
import { SectionHead } from '@/components/shared/SectionHead';
import './HomeQuestion.scss';

export const HomeQuestion = () => {
	const { pageInterfaceText } = useCommon();
	const { data } = useRequest<IHomeQuestion>({
		method: 'GET',
		url: api.homePage.getQuestion
	});

	return (
		<section id='support' className={`HomeQuestion section-offset`}>
			<SectionHead title={data?.title} subtitle={data?.subtitle} />
			<Button icon='telegram' btnType='iconLeft'>
				{pageInterfaceText?.question_btn}
			</Button>
			<div className={`HomeQuestion-image`}>
				<img src={'/images/banner-02.png'} alt={data?.title} />
				{/* {data?.img} */}
			</div>
		</section>
	);
};
