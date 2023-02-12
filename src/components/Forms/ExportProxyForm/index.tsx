import { Button } from '@/components/shared/Button';
import { InputField } from '@/components/shared/FormComponents/InputField/InputField';
import { useCommon } from '@/context/CommonContext';
import { useExport } from './useExport';
import '../AccountForms.scss';
import { ReactSelect } from '@/components/shared/FormComponents/ReactSelect/ReactSelect';
import { CheckBoxGroupe } from '@/components/shared/FormComponents/CheckBoxGroupe/CheckBoxGroupe';
import useRequest from '@/hooks/useRequest';
import { IExportSettings } from '@/interfaces/api';
import api from '@/api';
import { useCheckBoxGroupe } from '@/hooks/inputHooks/useCheckBoxGroupe';
import { ChangeEvent, useState } from 'react';
import { ISelectOption } from '@/interfaces/shared';
import { useDevice } from '@/context/DeviceContext';

export const ExportForm = () => {
	const { pageInterfaceText } = useCommon();
	const { onSubmit, formData } = useExport();
	const { isMobile } = useDevice();
	const [selectedOption, setSelectedOption] = useState<ISelectOption>();

	const { data: checkBoxList } = useRequest<IExportSettings[]>({
		method: 'GET',
		url: api.account.getExportSetting
	});
	const { data: formats, isLoading: isLoadingFormats } = useRequest<ISelectOption[]>({
		method: 'GET',
		url: api.account.getExportFormats
	});

	//{ initValue: checkBoxList }
	const list = useCheckBoxGroupe({ isRequired: true });

	const onChangeCheck = (e: ChangeEvent<HTMLInputElement>) => {};

	return (
		<div className='AccountPopup ExportPopup'>
			<h3 className='AccountPopup-title'>{pageInterfaceText?.acc_export_proxy}</h3>
			<form className='ExportPopup-form' onSubmit={onSubmit}>
				<fieldset className='ExportPopup-form-field'>
					<InputField
						{...formData.balance.inputProps}
						type='number'
						value={formData.balance.value}
						placeholder={'port-a:login reboot'}
						label={pageInterfaceText?.acc_format}
						errors={formData.balance.errors}
					/>
					{!isLoadingFormats && !isMobile && (
						<ReactSelect
							type='usual'
							label={pageInterfaceText?.acc_payment_type}
							defaultValue={formats?.[0]}
							onChange={setSelectedOption}
							options={formats}
						/>
					)}
				</fieldset>
				<fieldset className='ExportPopup-form-field'>
					<h5>{pageInterfaceText?.acc_export_setting}</h5>
					<p>{pageInterfaceText?.acc_export_setting_label}</p>
					{checkBoxList?.length && (
						<CheckBoxGroupe
							checkBoxList={checkBoxList}
							onChange={onChangeCheck}
							initValue={list.selectedCheckBoxes.current}
							errors={list.errors}
						/>
					)}
					{!isLoadingFormats && isMobile && (
						<ReactSelect
							type='usual'
							label={pageInterfaceText?.acc_payment_type}
							defaultValue={formats?.[0]}
							onChange={setSelectedOption}
							options={formats}
						/>
					)}
				</fieldset>
				<Button type='submit'>{pageInterfaceText?.acc_export_btn}</Button>
			</form>
		</div>
	);
};
