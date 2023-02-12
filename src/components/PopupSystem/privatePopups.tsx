import { FC } from 'react';
import { useAccount } from '@/context/Account/AccountContextHooks';
import { useCommon } from '@/context/CommonContext';
import { AddToBalanceForm } from '../Forms/AddToBalanceForm';
import { Background } from '../shared/Background';
import { ModalPopup } from './ModalPopup/ModalPopup';
import { TemplateModal } from './TemplateModal/TemplateModal';
import { AccountPopupsBg } from '../shared/Background/AccountPopupsBg';
import { AutoReplaceIpForm } from '../Forms/AutoReplaceIpForm';
import { ExportForm } from '../Forms/ExportProxyForm';
import { ContinueForm } from '../Forms/ContinueProxyForm';

export const PrivatePopups: FC = () => {
	const { pageInterfaceText, isThankPopupOpen, closeThank } = useCommon();
	const {
		state: {
			isAddToBalancePopup,
			closeAddToBalancePopup,
			isReplaceIpPopup,
			closeReplaceIpPopup,
			isExportPopup,
			closeExportPopup,
			isContinuePopup,
			closeContinuePopup
		},
		isPopupHide,
		popupHide
	} = useAccount();

	return (
		<>
			{/* Thank popup */}
			<ModalPopup show={isThankPopupOpen} withBackdrop={false} onClose={closeThank}>
				<TemplateModal
					color='primary'
					className='TemplateModal-message'
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

			{/* Proxy continue popup */}
			<ModalPopup
				show={isReplaceIpPopup}
				hide={isPopupHide}
				withBackdrop={false}
				onClose={() => {
					closeReplaceIpPopup();
					popupHide(false);
				}}
				onAnimationHideStart={() => popupHide(true)}>
				<TemplateModal background={<AccountPopupsBg />}>
					<AutoReplaceIpForm />
				</TemplateModal>
			</ModalPopup>

			{/* Proxy export popup */}
			<ModalPopup
				show={isExportPopup}
				hide={isPopupHide}
				withBackdrop={false}
				onClose={() => {
					closeExportPopup();
					popupHide(false);
				}}
				onAnimationHideStart={() => popupHide(true)}>
				<TemplateModal background={<AccountPopupsBg />}>
					<ExportForm />
				</TemplateModal>
			</ModalPopup>

			{/* Proxy continue popup */}
			<ModalPopup
				show={isContinuePopup}
				hide={isPopupHide}
				withBackdrop={false}
				onClose={() => {
					closeContinuePopup();
					popupHide(false);
				}}
				onAnimationHideStart={() => popupHide(true)}>
				<TemplateModal background={<AccountPopupsBg />}>
					<ContinueForm />
				</TemplateModal>
			</ModalPopup>
		</>
	);
};
