import { useCommon } from '@/context/CommonContext';
import { FC } from 'react';
import { Background } from '../shared/Background';
import { ModalPopup } from './ModalPopup/ModalPopup';
import { TemplateModal } from './TemplateModal/TemplateModal';

export const PrivatePopups: FC = () => {
	const { pageInterfaceText, isThankPopupOpen, closeThank } = useCommon();

	return (
		<>
			{/* Thank popup */}
			<ModalPopup show={isThankPopupOpen} withBackdrop={false} onClose={closeThank}>
				<TemplateModal
					color='primary'
					title={pageInterfaceText?.thank_text}
					subTitle={pageInterfaceText?.thank_message}
					background={<Background particleColor='primary' particleCount='few' color='white' />}
				/>
			</ModalPopup>
		</>
	);
};
