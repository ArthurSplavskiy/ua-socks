import { Button } from '@/components/shared/Button';
import { SectionHead } from '@/components/shared/SectionHead';
import { useHomeQuestion, useInterfaceText } from '@/context/UserContext';
import './HomeQuestion.scss';

export const HomeQuestion = () => {
	const { text: pageInterfaceText } = useInterfaceText();
	const { data } = useHomeQuestion();
	// const { pageInterfaceText } = useCommon();
	// const { data } = useRequest<IHomeQuestion>({
	// 	method: 'GET',
	// 	url: api.homePage.getQuestion
	// });

	return (
		<section id='support' className={`HomeQuestion section-offset`}>
			<SectionHead title={data?.title} subtitle={data?.subtitle} />
			<Button icon='telegram' btnType='iconLeft'>
				{pageInterfaceText?.question_btn}
			</Button>
			<div className={`HomeQuestion-image`}>
				<img src={data?.img} alt={data?.title} />
				{/* {'/images/banner-02.png'} */}
			</div>
		</section>
	);
};
