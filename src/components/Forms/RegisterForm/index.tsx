import { useEffect, useState } from 'react';
import { ModalPopup } from '@/components/PopupSystem/ModalPopup/ModalPopup';
import { TemplateModal } from '@/components/PopupSystem/TemplateModal/TemplateModal';
import { Button } from '@/components/shared/Button';
import { InputField } from '@/components/shared/FormComponents/InputField/InputField';
import { PasswordField } from '@/components/shared/FormComponents/PasswordField/PasswordField';
import { useCommon } from '@/context/CommonContext';
import { useDevice } from '@/context/DeviceContext';
import { eventBus } from '@/helpers/EventBus/EventBus';
import { useRegistration } from '@/hooks/useRegistration';
import { Link } from 'react-router-dom';
import { FormFooter } from '../FormFooter';
import './AuthForms.scss';
import { IEventError } from '@/interfaces/shared';
import { Icon } from '@/components/shared/Icon/Icon';
import { Background } from '@/components/shared/Background';

export const RegisterForm = () => {
	const { pageInterfaceText, openLogin, isErrorPopupOpen, closeError, openError } = useCommon();
	const { isMobile } = useDevice();
	const { onSubmit, formData } = useRegistration();
	const [registrationError, setRegistrationError] = useState<IEventError>();

	const setErrorHandler = (error: any) => {
		setRegistrationError(error.detail);
		openError();
	};

	useEffect(() => {
		eventBus.on('showErrorPopup', setErrorHandler);
		() => {
			eventBus.remove('showErrorPopup', setErrorHandler);
		};
	}, []);

	return (
		<>
			<div className='AuthPopup'>
				<h3 className='AuthPopup-title'>{pageInterfaceText?.registration_title}</h3>
				<form className='AuthPopup-form' onSubmit={onSubmit}>
					<InputField
						{...formData.email.inputProps}
						value={formData.email.value}
						label={pageInterfaceText?.form_email}
						errors={formData.email.errors}
					/>

					<PasswordField
						{...formData.password.inputProps}
						label={pageInterfaceText?.form_password}
						errors={formData.password.errors}
						autoComplete='new-password'
					/>

					<PasswordField
						{...formData.confirm_password.inputProps}
						label={pageInterfaceText?.form_repeat_password}
						errors={formData.confirm_password.errors}
						autoComplete='new-password'
					/>

					{isMobile && (
						<div className='FormFooter-policy'>
							Натиснавши на кнопку, ви даєте згоду на обробку персональних даних та погоджуєтеся з
							<Link to='/'>політикою конфіденційності</Link> та{' '}
							<Link to='/'>угодою публічної оферти</Link>
						</div>
					)}

					<Button type='submit' color='primary' width={isMobile ? 'fullWidth' : undefined}>
						{pageInterfaceText?.register_btn}
					</Button>

					{isMobile && (
						<div className='FormFooter-link'>
							<div>{pageInterfaceText?.register_text1}</div>
							<button onClick={openLogin}>{pageInterfaceText?.register_text2}</button>
						</div>
					)}
				</form>

				{!isMobile && (
					<FormFooter
						leftText={pageInterfaceText?.register_text1}
						rightText={pageInterfaceText?.register_text2}
						linkCallback={openLogin}
					/>
				)}
			</div>
			<ModalPopup show={isErrorPopupOpen} withBackdrop={false} onClose={closeError}>
				<TemplateModal
					color='yellow'
					title={pageInterfaceText?.error_title}
					subTitle={registrationError?.text}
					icon={<Icon icon='info' />}
					background={<Background particleColor='yellow' particleCount='few' color='white' />}
				/>
			</ModalPopup>
		</>
	);
};
