import { Button } from '@/components/shared/Button';
import { InputField } from '@/components/shared/FormComponents/InputField/InputField';
import { useCommon } from '@/context/CommonContext';
import { useBalance } from './useBalance';
import '../AccountForms.scss';
import { useEffect, useState } from 'react';
import { ReactSelect } from '@/components/shared/FormComponents/ReactSelect/ReactSelect';
import useRequest from '@/hooks/useRequest';
import { ISelectOption } from '@/interfaces/shared';
import api from '@/api';

export const AddToBalanceForm = () => {
	const { pageInterfaceText } = useCommon();
	const { onSubmit, formData, variantPrice } = useBalance();
	const [value, setValue] = useState(formData.balance.value);
	const [selectedOption, setSelectedOption] = useState<ISelectOption>();
	const { data: paymentMethods, isLoading } = useRequest<ISelectOption[]>({
		method: 'GET',
		url: api.account.getPaymentMethods
	});

	// useEffect(() => {
	// 	setValue(formData.balance.value);
	// }, [formData.balance.value]);

	const VarriantPrices = () => {
		return (
			<div className='BalancePopup-variants'>
				{variantPrice.map((num, idx) => (
					<Button
						type='button'
						color={`${value === num ? 'primary' : 'outline'}`}
						key={idx}
						size='sm'
						onClick={() => (formData.balance.value = num)}>
						${num}
					</Button>
				))}
			</div>
		);
	};

	return (
		<div className='AccountPopup BalancePopup'>
			<h3 className='AccountPopup-title'>{pageInterfaceText?.acc_add_sum}</h3>
			<div className='AccountPopup-info'>
				{pageInterfaceText?.acc_max_add_sum}
				<span className='AccountPopup-info-primary'> $5 000</span>
			</div>
			<form className='BalancePopup-form' onSubmit={onSubmit}>
				<InputField
					{...formData.balance.inputProps}
					type='number'
					value={formData.balance.value}
					placeholder={pageInterfaceText?.acc_payment_input_text}
					label={pageInterfaceText?.acc_payment_input_text}
					errors={formData.balance.errors}
					buttonsVariantGroup={<VarriantPrices />}
				/>
				{!isLoading && (
					<ReactSelect
						type='usual'
						label={pageInterfaceText?.acc_payment_type}
						defaultValue={paymentMethods?.[0]}
						onChange={setSelectedOption}
						options={paymentMethods}
					/>
				)}

				<Button type='submit'>{pageInterfaceText?.acc_payment_btn_text}</Button>
			</form>
		</div>
	);
};
