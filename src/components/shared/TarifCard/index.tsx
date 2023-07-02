import { Mark } from '@/assets/icons';
import { useInterfaceText } from '@/context/UserContext';
import { IProxyTarif } from '@/interfaces/api';
import { ISelectOption } from '@/interfaces/shared';
import { DetailedHTMLProps, FC, HTMLAttributes, useEffect, useState } from 'react';
import { Button } from '../Button';
import { ReactSelect } from '../FormComponents/ReactSelect/ReactSelect';
import { Icon } from '../Icon/Icon';
import './TarifCard.scss';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  //fadeUp?: boolean;
  dataId?: number;
}

export const TarifCard: FC<Props & Partial<Omit<IProxyTarif, 'id'>>> = ({
  dataId,
  status,
  mark,
  color,
  prices,
  stats,
  rent_terms,
  operators,
  className
}) => {
  // const { pageInterfaceText } = useCommon();
  const { text: pageInterfaceText } = useInterfaceText();
  const [price, setPrice] = useState(prices?.find((p) => p.active)?.total);
  const [rentTerm, setRentTerm] = useState<ISelectOption>();
  const [operator, setOperator] = useState<ISelectOption>();
  const [animate, setIsAnimate] = useState(false);

  useEffect(() => {
    setPrice(
      prices?.find((p) => p.rent_term === rentTerm?.value && p.operator === operator?.value)?.total
    );
  }, [rentTerm, operator]);

  useEffect(() => {
    setPrice(
      prices?.find((p) => p.operator === operator?.value && p.rent_term === rentTerm?.value)?.total
    );
  }, [operator, rentTerm]);

  useEffect(() => {
    setIsAnimate(true);
    if (prices?.length) {
      setPrice(
        prices?.find((p) => p.rent_term === rentTerm?.value && p.operator === operator?.value)
          ?.total
      );
    }
    setTimeout(() => {
      setIsAnimate(false);
    }, 1800);
  }, [prices, rentTerm, operator]);

  useEffect(() => {
    if (prices?.length) {
      const activeProxy = prices.find((p) => p.active);
      setPrice(activeProxy?.total);
      setRentTerm({ value: activeProxy?.rent_term || '', label: '' });
      setOperator({ value: activeProxy?.operator || '', label: '' });
    }
  }, []);

  return (
    <div className={`${className} TarifCard ${color} ${animate && 'animate'} delay-${dataId}`}>
      {mark && <Mark className='TarifCard-mark' color={color || 'primary'} />}
      <div className='TarifCard-content'>
        <div className='TarifCard-content-head'>
          <div className='TarifCard-status'>
            <span>{status}</span>
          </div>
          {price ? (
            <div className='TarifCard-price'>
              <span>$</span>
              <span>{price}</span>
            </div>
          ) : (
            <div className='TarifCard-price'>
              <span>No tariff</span>
              <span></span>
            </div>
          )}
        </div>
        {stats?.length ? (
          <ul className='TarifCard-stats'>
            {stats?.map((stat, idx) => (
              <li key={idx}>
                {stat.support ? (
                  <Icon icon='done' color='green' />
                ) : (
                  <Icon icon='close' color='red' />
                )}
                <span>{stat.value}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <div className='TarifCard-selects'>
          <ReactSelect
            type='card'
            icon='earth'
            color={color}
            placeholder={pageInterfaceText?.rent_term_text}
            defaultValue={rentTerm}
            onChange={setRentTerm}
            options={rent_terms?.map((r) => ({ value: r, label: r }))}
          />
          <ReactSelect
            type='card'
            icon='phone'
            color={color}
            placeholder={pageInterfaceText?.operators_text}
            defaultValue={operator}
            onChange={setOperator}
            options={operators?.map((o) => ({ value: o, label: o }))}
          />
        </div>
        <div className='TarifCard-btn'>
          <Button color={color}>{pageInterfaceText?.buy_btn}</Button>
        </div>
        <div className='TarifCard-wave' />
      </div>
    </div>
  );
};
