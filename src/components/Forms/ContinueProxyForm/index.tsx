import { Button } from '@/components/shared/Button';
import { useCommon } from '@/context/CommonContext';
import { useContinue } from './useContinue';
import { ReactSelect } from '@/components/shared/FormComponents/ReactSelect/ReactSelect';
import useRequest from '@/hooks/useRequest';
import { ChangeEvent, useEffect, useState } from 'react';
import { ISelectOption } from '@/interfaces/shared';
import api from '@/api';
import { formatter } from '@/helpers';
import { useDevice } from '@/context/DeviceContext';

export const ContinueForm = () => {
	const { pageInterfaceText } = useCommon();
	const { onSubmit, formData } = useContinue();
	const { isMobile } = useDevice();
	const [selectedOption, setSelectedOption] = useState<ISelectOption>();
	const [formattingOptions, setFormattingOptions] = useState<ISelectOption[]>();

	const { data, isLoading } = useRequest<ISelectOption[]>({
		method: 'GET',
		url: api.account.getAccessPeriod
	});

	useEffect(() => {
		if (data) {
			setFormattingOptions(
				data.map((option) => ({
					label: formatter.format(Number(option.label)),
					value: option.value
				}))
			);
			setSelectedOption({
				label: formatter.format(Number(data[0].label)),
				value: data[0].value
			});
		}
	}, [data]);

	return (
		<div className='AccountPopup ContinuePopup'>
			<h3 className='AccountPopup-title'>{pageInterfaceText?.acc_continue_proxy}</h3>
			<form className='ContinuePopup-form' onSubmit={onSubmit}>
				<div className='ContinuePopup-form-wrap'>
					<fieldset className='ContinuePopup-form-field'>
						{!isLoading && selectedOption && (
							<ReactSelect
								type='usual'
								label={pageInterfaceText?.acc_access_period}
								defaultValue={selectedOption}
								onChange={setSelectedOption}
								options={formattingOptions}
							/>
						)}
						{!isMobile && <Button type='submit'>{pageInterfaceText?.acc_continue_btn}</Button>}
					</fieldset>
					<fieldset className='ContinuePopup-form-field'>
						{!isMobile && <label className='InputField-label'>{pageInterfaceText?.acc_paid}</label>}
						<div className='ContinuePopup-price'>
							{isMobile && (
								<label className='InputField-label'>{pageInterfaceText?.acc_paid}:</label>
							)}
							<div className='ContinuePopup-price-inner'>
								<span className='ContinuePopup-price-currency'>$</span>
								<span className='ContinuePopup-price-sum'>{selectedOption?.value}</span>
							</div>
						</div>
					</fieldset>
					{isMobile && <Button type='submit'>{pageInterfaceText?.acc_continue_btn}</Button>}
				</div>
				<Button>{pageInterfaceText?.acc_payment_btn_text}</Button>
			</form>
		</div>
	);
};
