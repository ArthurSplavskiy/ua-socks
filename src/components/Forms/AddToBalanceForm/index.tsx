import { Button } from '@/components/shared/Button';
import { InputField } from '@/components/shared/FormComponents/InputField/InputField';
import { useBalance } from './useBalance';
import { useEffect, useState } from 'react';
import { ReactSelect } from '@/components/shared/FormComponents/ReactSelect/ReactSelect';
import { IGateways, ISelectOption } from '@/interfaces/shared';
import { useInterfaceText } from '@/context/UserContext';
import '../AccountForms.scss';
import { useQuery } from 'react-query';
import api from '@/api';
import { LiqpayWidget } from '@/components/Liqpay';

export const AddToBalanceForm = () => {
  // const { pageInterfaceText } = useCommon();
  const { text: pageInterfaceText } = useInterfaceText();

  const { data: gateways } = useQuery<IGateways | undefined>('account.gateways', () =>
    api.account.getGateways('uk')
  );

  const [selectedOption, setSelectedOption] = useState<ISelectOption>();
  const { onSubmit, formData, variantPrice, liqpayResponse } = useBalance({
    payment: selectedOption
  });
  // const { data: paymentMethods, isLoading } = useRequest<ISelectOption[]>({
  // 	method: 'GET',
  // 	url: api.account.getPaymentMethods('uk')
  // });
  const [paymentMethods, setPaymentMethods] = useState<ISelectOption[]>([]);

  useEffect(() => {
    if (gateways?.gateways) {
      setPaymentMethods(
        gateways.gateways.map((item, idx) => ({ id: idx, label: item, value: item }))
      );
      setSelectedOption({ id: 0, label: gateways.gateways[0], value: gateways.gateways[0] });
    }
  }, [gateways]);

  const VarriantPrices = () => {
    return (
      <div className='BalancePopup-variants'>
        {variantPrice.map((num, idx) => (
          <Button
            type='button'
            color={`${formData.balance.value === num ? 'primary' : 'outline'}`}
            key={idx}
            size='sm'
            onClick={() => formData.balance.setValue(num)}>
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
          onChange={(e) => {
            const str = new RegExp(/^[0-9]*$/gm);
            if (e.target.value === 'e' || e.target.value === '.' || !str.test(e.target.value)) {
              return;
            }
            formData.balance.inputProps.onChange(e);
          }}
          type='string'
          prefix='$'
          value={formData.balance.value}
          placeholder={pageInterfaceText?.acc_payment_input_text}
          label={pageInterfaceText?.acc_payment_input_text}
          errors={formData.balance.errors}
          buttonsVariantGroup={<VarriantPrices />}
        />
        {paymentMethods.length && (
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
      <LiqpayWidget data={liqpayResponse?.data} signature={liqpayResponse?.signature} />
    </div>
  );
};
