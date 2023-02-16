import { Button } from '@/components/shared/Button';
import { InputField } from '@/components/shared/FormComponents/InputField/InputField';
import { useAccount } from '@/context/Account/AccountContextHooks';
import { useCommon } from '@/context/CommonContext';
import { useReplaceIp } from './useReplaceIp';
import '../AccountForms.scss';

export const AutoReplaceIpForm = () => {
	const { pageInterfaceText } = useCommon();
	const { onSubmit, formData } = useReplaceIp();
	const {
		state: { closeReplaceIpPopup }
	} = useAccount();

	return (
		<div className='AccountPopup ReplacePopup'>
			<h3 className='AccountPopup-title'>{pageInterfaceText?.acc_auto_replace_ip}</h3>
			<div className='AccountPopup-info'>
				<form className='ReplacePopup-form' onSubmit={onSubmit}>
					<div className='ReplacePopup-form-btns'>
						<Button type='submit'>{pageInterfaceText?.apply}</Button>
						<Button type='submit' color='outline' onClick={closeReplaceIpPopup}>
							{pageInterfaceText?.cancel}
						</Button>
					</div>
					<InputField {...formData.time.inputProps} value={'1 - 60'} rightPrefix={'хв'} disabled />
				</form>
			</div>
		</div>
	);
};
