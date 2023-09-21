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
import { useLocation, useNavigate } from 'react-router-dom';

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
  const { user, setUser } = useProfile();
  const { text: pageInterfaceText } = useInterfaceText();
  const [price, setPrice] = useState(prices?.find((p) => p.active)?.total);
  const [rentTerm, setRentTerm] = useState<ISelectOption>();
  const [operator, setOperator] = useState<ISelectOption>();
  const [animate, setIsAnimate] = useState(false);
  const { setSuccessMessagePopup, setErrorMessagePopup } = usePrivatePopups((state) => state);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    setSuccessMessagePopup: setPublicPopup,
    setErrorMessagePopup: setPublicErrorMessagePopup
  } = usePublicPopups((state) => state);
  const { openLogin } = useCommon();
  const { getProfileData } = useProfile();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (packageIds: { package_id: number[] }) => api.account.buyPackage('uk', packageIds),
    onError: (error) => {
      if (location.pathname === '/') {
        // @ts-ignore
        setPublicErrorMessagePopup({
          isOpen: true,
          // @ts-ignore
          message: error?.response?.data?.message || error?.message
        });
      } else {
        // @ts-ignore
        setErrorMessagePopup({
          isOpen: true,
          // @ts-ignore
          message: error?.response?.data?.message || error?.message
        });
      }
    },
    onSuccess: (data) => {
      setUser((prev: any) => ({
        ...prev,
        // @ts-ignore
        wallet_balance: data?.data?.wallet_balance || user?.wallet_balance || 0
      }));
      queryClient.invalidateQueries('account.proxyList');
      getProfileData();
      if (location.pathname === '/') {
        setPublicPopup({ isOpen: true, message: data?.data?.message || 'Успішно' });
      } else {
        setSuccessMessagePopup({ isOpen: true, message: data?.data?.message || 'Успішно' });
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

  const activePackage = prices?.find(
    (p) => p.rent_term === rentTerm?.value && p.operator === operator?.value && price === p.total
  );

  console.log('mark', mark);

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
              if (!!localStorage.getItem('auth-token') === false) {
                openLogin();
                return;
              }
              if (location.pathname === '/') {
                navigate('/account/buy');
              }
              // @ts-ignore
              //console.log('activePackage?.package_id', activePackage?.package_id);
              mutation.mutate({ package_id: [activePackage?.package_id] });
            }}>
            {pageInterfaceText?.buy_btn}
          </Button>
        </div>
        <div className='TarifCard-wave' />
      </div>
    </div>
  );
};
