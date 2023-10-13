import { Button } from '@/components/shared/Button';
import { InputField } from '@/components/shared/FormComponents/InputField/InputField';
import { PasswordField } from '@/components/shared/FormComponents/PasswordField/PasswordField';
import { useCommon } from '@/context/CommonContext';
import { useDevice } from '@/context/DeviceContext';
import { useRegistration } from '@/components/Forms/RegisterForm/useRegistration';
import { Link } from 'react-router-dom';
import { FormFooter } from '../FormFooter';
import { useInterfaceText, useSupportLink } from '@/context/UserContext';
import '../AuthForms.scss';

export const RegisterForm = () => {
  const { openLogin, closeRegistration } = useCommon();
  const { text: pageInterfaceText } = useInterfaceText();
  const { isMobile } = useDevice();
  const { onSubmit, formData, isLoading } = useRegistration();
  const { data: supportLink } = useSupportLink();

  return (
    <div className='AuthPopup'>
      {/* <div className='AuthPopup-plug'>
        <p>
          Особистий кабінет у розробці. А поки - купуй проксі напряму у Telegram-сапорта{' '}
          <a href={supportLink} target='_blank'>
            @uasocks
          </a>
          !
        </p>
      </div> */}
      <h3 className='AuthPopup-title'>{pageInterfaceText?.registration_title}</h3>
      <form className='AuthPopup-form' onSubmit={onSubmit}>
        <InputField
          {...formData.email.inputProps}
          value={formData.email.value}
          label={pageInterfaceText?.form_email_new}
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
            Натиснувши на кнопку, ви даєте згоду на обробку персональних даних, погоджуєтеся з
            <Link to='/privacy-policy' onClick={closeRegistration}>
              політикою конфіденційності
            </Link>{' '}
            та{' '}
            <Link to='/oferta' onClick={closeRegistration}>
              угодою публічної оферти
            </Link>
          </div>
        )}

        <Button
          type='submit'
          color='primary'
          width={isMobile ? 'fullWidth' : undefined}
          loading={isLoading}>
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
          close={closeRegistration}
        />
      )}
    </div>
  );
};
