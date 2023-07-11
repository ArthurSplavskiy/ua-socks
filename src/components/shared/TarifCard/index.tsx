import { Mark } from '@/assets/icons';
import { useInterfaceText, useProfile } from '@/context/UserContext';
import { IProxyTarif } from '@/interfaces/api';
import { IProxy, ISelectOption } from '@/interfaces/shared';
import { DetailedHTMLProps, FC, HTMLAttributes, useEffect, useState } from 'react';
import { Button } from '../Button';
import { ReactSelect } from '../FormComponents/ReactSelect/ReactSelect';
import { Icon } from '../Icon/Icon';
import './TarifCard.scss';
import api from '@/api';
import { useMutation, useQueryClient } from 'react-query';
import { usePrivatePopups } from '@/components/PopupSystem/state/PrivatePopups';
import { useCommon } from '@/context/CommonContext';
import { usePublicPopups } from '@/components/PopupSystem/state/PublicPopups';
import { useLocation } from 'react-router-dom';

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
  const { user } = useProfile();
  const { text: pageInterfaceText } = useInterfaceText();
  const [price, setPrice] = useState(prices?.find((p) => p.active)?.total);
  const [rentTerm, setRentTerm] = useState<ISelectOption>();
  const [operator, setOperator] = useState<ISelectOption>();
  const [animate, setIsAnimate] = useState(false);
  const setSuccessMessagePopup = usePrivatePopups((state) => state.setSuccessMessagePopup);
  const location = useLocation();
  const { setSuccessMessagePopup: setPublicPopup } = usePublicPopups((state) => state);
  const { openLogin } = useCommon();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (proxy: IProxy) => api.account.buyPackage('uk', proxy),
    onSuccess: () => {
      queryClient.invalidateQueries('account.proxyList');
      if (location.pathname === '/') {
        setPublicPopup({ isOpen: true, message: 'Успішно' });
        setTimeout(() => {
          setPublicPopup({ isOpen: false });
        }, 2000);
      } else {
        setSuccessMessagePopup({ isOpen: true, message: 'Успішно' });
        setTimeout(() => {
          setSuccessMessagePopup({ isOpen: false });
        }, 2000);
      }
    }
  });

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
      setRentTerm({ value: activeProxy?.rent_term || '', label: activeProxy?.rent_term || '' });
      setOperator({ value: activeProxy?.operator || '', label: activeProxy?.operator || '' });
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
            defaultValue={pageInterfaceText?.rent_term_text}
            value={rentTerm}
            onChange={setRentTerm}
            options={rent_terms?.map((r) => ({ value: r, label: r }))}
          />
          <ReactSelect
            type='card'
            icon='phone'
            color={color}
            placeholder={pageInterfaceText?.operators_text}
            defaultValue={pageInterfaceText?.operators_text}
            value={operator}
            onChange={setOperator}
            options={operators?.map((o) => ({ value: o, label: o }))}
          />
        </div>
        <div className='TarifCard-btn'>
          <Button
            color={color}
            disabled={!price}
            onClick={() => {
              if (!localStorage.getItem('auth-token')) {
                openLogin();
                return;
              }

              mutation.mutate({
                username: user?.email || '',
                password: user?.password || '',
                readLimit: 1000,
                writeLimit: 10000,
                connectionLimit: 10000,
                changeIpUid: 'Lb5HzfRKQJ', // ЗВІДКИ
                // expiresAt: null,
                tags: [
                  {
                    key: 'userId',
                    value: user?.id || ''
                  },
                  {
                    key: 'proxy_group',
                    value: operator?.value?.toLowerCase() || ''
                  }
                  // {
                  //   key: 'orderId',
                  //   value: '2' // ЗВІДКИ
                  // }
                ],
                agentId: '78e55e84-6aea-42a9-ac7c-df7a3c915094',
                os: 'Default'
              });
            }}>
            {pageInterfaceText?.buy_btn}
          </Button>
        </div>
        <div className='TarifCard-wave' />
      </div>
    </div>
  );
};
