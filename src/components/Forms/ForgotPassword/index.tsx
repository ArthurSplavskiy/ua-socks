import { Button } from '@/components/shared/Button';
import { InputField } from '@/components/shared/FormComponents/InputField/InputField';
import { PasswordField } from '@/components/shared/FormComponents/PasswordField/PasswordField';
import { useCommon } from '@/context/CommonContext';
import { useDevice } from '@/context/DeviceContext';
import { useLogin } from '@/components/Forms/LoginForm/useLogin';
import { Link } from 'react-router-dom';
import { FormFooter } from '../FormFooter';

export const ForgotPassword = () => {
	const { pageInterfaceText, openRegistration } = useCommon();
	const { isMobile } = useDevice();
	const { onSubmit, formData, isLoading } = useLogin();
	return (
		<div className='AuthPopup'>
			<h3 className='AuthPopup-title'>{pageInterfaceText?.forgot_password}</h3>
			<p className='AuthPopup-subtitle'>{pageInterfaceText?.forgot_pass_info}</p>
			<span className='AuthPopup-info'>{pageInterfaceText?.spam_check}</span>
			<form className='AuthPopup-form' onSubmit={onSubmit}>
				<InputField
					{...formData.email.inputProps}
					value={formData.email.value}
					label={pageInterfaceText?.form_email}
					errors={formData.email.errors}
				/>

				{isMobile && (
					<div className='FormFooter-policy'>
						Натиснавши на кнопку, ви даєте згоду на обробку персональних даних та погоджуєтеся з
						<Link to='/'>політикою конфіденційності</Link> та{' '}
						<Link to='/'>угодою публічної оферти</Link>
					</div>
				)}

				<Button type='submit' color='primary' loading={isLoading}>
					{pageInterfaceText?.send}
				</Button>

				{isMobile && (
					<div className='FormFooter-link'>
						<div>{pageInterfaceText?.no_have_acc}</div>
						<button onClick={openRegistration}>{pageInterfaceText?.registration_link}</button>
					</div>
				)}
			</form>

			{!isMobile && (
				<FormFooter
					leftText={pageInterfaceText?.no_have_acc}
					rightText={pageInterfaceText?.registration_link}
					linkCallback={openRegistration}
				/>
			)}
		</div>
	);
};
