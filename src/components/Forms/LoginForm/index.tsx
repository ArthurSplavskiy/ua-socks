import { Button } from '@/components/shared/Button';
import { InputField } from '@/components/shared/FormComponents/InputField/InputField';
import { PasswordField } from '@/components/shared/FormComponents/PasswordField/PasswordField';
import { useCommon } from '@/context/CommonContext';
import { useDevice } from '@/context/DeviceContext';
import { useLogin } from '@/hooks/useLogin';
import { Link } from 'react-router-dom';
import { FormFooter } from '../FormFooter';

export const LoginForm = () => {
	const { pageInterfaceText, openRegistration } = useCommon();
	const { isMobile } = useDevice();
	const { onSubmit, formData } = useLogin();
	return (
		<div className='AuthPopup'>
			<h3 className='AuthPopup-title'>{pageInterfaceText?.login_title}</h3>
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

				{isMobile && (
					<div className='FormFooter-policy'>
						Натиснавши на кнопку, ви даєте згоду на обробку персональних даних та погоджуєтеся з
						<Link to='/'>політикою конфіденційності</Link> та{' '}
						<Link to='/'>угодою публічної оферти</Link>
					</div>
				)}

				<Button type='submit' color='primary'>
					{pageInterfaceText?.register_btn}
				</Button>

				{isMobile && (
					<div className='FormFooter-link'>
						<div>{pageInterfaceText?.register_text1}</div>
						<button onClick={openRegistration}>{pageInterfaceText?.register_text2}</button>
					</div>
				)}
			</form>

			{!isMobile && (
				<FormFooter
					leftText={pageInterfaceText?.register_text1}
					rightText={pageInterfaceText?.register_text2}
					linkCallback={openRegistration}
				/>
			)}
		</div>
	);
};
