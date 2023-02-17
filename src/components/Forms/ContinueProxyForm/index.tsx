import { Button } from '@/components/shared/Button';
import { useContinue } from './useContinue';
import { ReactSelect } from '@/components/shared/FormComponents/ReactSelect/ReactSelect';
import { useDevice } from '@/context/DeviceContext';
import { useAccount } from '@/context/Account/AccountContextHooks';
import { useInterfaceText } from '@/context/UserContext';

export const ContinueForm = () => {
	// const { pageInterfaceText } = useCommon();
	const { text: pageInterfaceText } = useInterfaceText();
	const { onSubmit, formData, optionsIsLoading, formattingOptions, notEnoughMoney } = useContinue();
	const { isMobile } = useDevice();
	const {
		state: { openAddToBalancePopup }
	} = useAccount();

	return (
		<div className='AccountPopup ContinuePopup'>
			<h3 className='AccountPopup-title'>{pageInterfaceText?.acc_continue_proxy}</h3>
			<form className='ContinuePopup-form' onSubmit={onSubmit}>
				<div className='ContinuePopup-form-wrap'>
					<fieldset className='ContinuePopup-form-field'>
						{!optionsIsLoading && formattingOptions && (
							<>
								<ReactSelect
									type='usual'
									label={pageInterfaceText?.acc_access_period}
									defaultValue={formattingOptions?.[0]}
									onChange={formData.time.onChange}
									options={formattingOptions}
								/>
								{notEnoughMoney && (
									<span className='InputField-error-message'>
										Недостатньо коштів на вашому балансі
									</span>
								)}
							</>
						)}
						{!isMobile && (
							<Button type='submit' disabled={notEnoughMoney}>
								{pageInterfaceText?.acc_continue_btn}
							</Button>
						)}
					</fieldset>
					<fieldset className='ContinuePopup-form-field'>
						{!isMobile && <label className='InputField-label'>{pageInterfaceText?.acc_paid}</label>}
						<div className='ContinuePopup-price'>
							{isMobile && (
								<label className='InputField-label'>{pageInterfaceText?.acc_paid}:</label>
							)}
							<div className='ContinuePopup-price-inner'>
								<span className='ContinuePopup-price-currency'>$</span>
								<span className='ContinuePopup-price-sum'>
									{formData.time.value ? formData.time.value : formattingOptions?.[0].value}
								</span>
							</div>
						</div>
					</fieldset>
					{isMobile && (
						<Button type='submit' disabled={notEnoughMoney}>
							{pageInterfaceText?.acc_continue_btn}
						</Button>
					)}
				</div>
				<Button onClick={openAddToBalancePopup}>{pageInterfaceText?.acc_payment_btn_text}</Button>
			</form>
		</div>
	);
};
