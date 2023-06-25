import { Button } from '@/components/shared/Button';
import { InputField } from '@/components/shared/FormComponents/InputField/InputField';
import { useExport } from './useExport';
import { ReactSelect } from '@/components/shared/FormComponents/ReactSelect/ReactSelect';
import { CheckBoxGroupe } from '@/components/shared/FormComponents/CheckBoxGroupe/CheckBoxGroupe';
import useRequest from '@/hooks/useRequest';
import { IExportSettings } from '@/interfaces/api';
import api from '@/api';
import { useDevice } from '@/context/DeviceContext';
import { useInterfaceText } from '@/context/UserContext';
import '../AccountForms.scss';

export const ExportForm = () => {
	// const { pageInterfaceText } = useCommon();
	const { text: pageInterfaceText } = useInterfaceText();
	const { isMobile } = useDevice();
	const { onSubmit, formData, isLoadingFormats, formats } = useExport();

	const { data: checkBoxList } = useRequest<IExportSettings[]>({
		method: 'GET',
		url: api.account.getExportSetting('uk')
	});

	return (
		<div className='AccountPopup ExportPopup'>
			<h3 className='AccountPopup-title'>{pageInterfaceText?.acc_export_proxy}</h3>
			<form className='ExportPopup-form' onSubmit={onSubmit}>
				<fieldset className='ExportPopup-form-field'>
					<InputField
						{...formData.format.inputProps}
						value={formData.format.value}
						placeholder={'port-a:login reboot'}
						label={pageInterfaceText?.acc_format}
						errors={formData.format.errors}
					/>
					{!isLoadingFormats && !isMobile && (
						<ReactSelect
							type='usual'
							defaultValue={formats?.[0]}
							label={pageInterfaceText?.acc_payment_type}
							onChange={formData.formatSelect.onChange}
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
							onChange={formData.settings.checkBoxGroupeOnChange}
							initValue={formData.settings.selectedCheckBoxes.current}
							errors={formData.settings.errors}
						/>
					)}
					{!isLoadingFormats && isMobile && (
						<ReactSelect
							type='usual'
							defaultValue={formats?.[0]}
							label={pageInterfaceText?.acc_payment_type}
							onChange={formData.formatSelect.onChange}
							options={formData.formatSelect.inputProps.options}
						/>
					)}
				</fieldset>
				<Button type='submit'>{pageInterfaceText?.acc_export_btn}</Button>
			</form>
		</div>
	);
};
