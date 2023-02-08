import { FC } from 'react';
import { useAccount } from '@/context/Account/AccountContextHooks';
import { useCommon } from '@/context/CommonContext';
import { AddToBalanceForm } from '../Forms/AddToBalanceForm';
import { Background } from '../shared/Background';
import { ModalPopup } from './ModalPopup/ModalPopup';
import { TemplateModal } from './TemplateModal/TemplateModal';
import { AccountPopupsBg } from '../shared/Background/AccountPopupsBg';

export const PrivatePopups: FC = () => {
	const { pageInterfaceText, isThankPopupOpen, closeThank } = useCommon();
	const {
		state: { isAddToBalancePopup, closeAddToBalancePopup },
		isPopupHide,
		popupHide
	} = useAccount();

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

			{/* Add Balance popup */}
			<ModalPopup
				show={isAddToBalancePopup}
				hide={isPopupHide}
				withBackdrop={false}
				onClose={() => {
					closeAddToBalancePopup();
					popupHide(false);
				}}
				onAnimationHideStart={() => popupHide(true)}>
				<TemplateModal background={<AccountPopupsBg />}>
					<AddToBalanceForm />
				</TemplateModal>
			</ModalPopup>
		</>
	);
};
