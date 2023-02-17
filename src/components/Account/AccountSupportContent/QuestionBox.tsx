import { Button } from '@/components/shared/Button';
import { useInterfaceText } from '@/context/UserContext';
import { FC, ReactNode } from 'react';

interface Props {
	bg: ReactNode;
}

export const QuestionBox: FC<Props> = ({ bg }) => {
	// const { pageInterfaceText } = useCommon();
	const { text: pageInterfaceText } = useInterfaceText();
	return (
		<div className='QuestionBox'>
			<div className='QuestionBox-content'>
				<h3>{pageInterfaceText?.support_info}</h3>
				<p>{pageInterfaceText?.support_feedback}</p>
				<Button icon='telegram' btnType='iconLeft'>
					{pageInterfaceText?.question_btn}
				</Button>
			</div>
			{bg}
		</div>
	);
};
