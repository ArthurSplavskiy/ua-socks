import { Checkbox } from '@/components/shared/FormComponents/Checkbox/Checkbox';
import { Switcher } from '@/components/shared/FormComponents/Switcher';
import { Icon } from '@/components/shared/Icon/Icon';
import { useDevice } from '@/context/DeviceContext';
import { useInterfaceText, useProfile } from '@/context/UserContext';
import { formatter } from '@/helpers';
import { useClickOutside } from '@/hooks/useClickOutside';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { OptionPopover } from './OptionPopover';
import { Popover } from './Popover';
import api from '@/api';
import { usePrivatePopups } from '@/components/PopupSystem/state/PrivatePopups';
import { useQueryClient } from 'react-query';

interface Props {
  idx: number;
  proxyID?: number;
  id: number;
  logo: string;
  name: string;
  country: string;
  validity: number;
  socks: string;
  http: string;
  urlIpReplace: string;
  autoContinue: boolean;
}

export const TableRowItem: FC<Props> = ({
  idx,
  proxyID,
  id,
  logo,
  name,
  country,
  validity,
  socks,
  http,
  urlIpReplace,
  autoContinue
}) => {
  //const { pageInterfaceText } = useCommon();
  const { text: pageInterfaceText } = useInterfaceText();
  const [selected, setSelected] = useState(false);
  const [autoContinueState, setAutoContinueState] = useState(autoContinue);
  const { is810 } = useDevice();
  const { setUser } = useProfile();

  const proxyItemHeadRef = useRef<HTMLDivElement>(null);
  const proxyItemBodyRef = useRef<HTMLDivElement>(null);
  const [proxyItemHeight, setProxyItemHeight] = useState(0);
  const proxyItemClickHandler = () => {
    if (proxyItemHeight) {
      setProxyItemHeight(0);
    } else {
      setProxyItemHeight(proxyItemBodyRef.current?.scrollHeight || 0);
    }
  };

  const { setSuccessMessagePopup, setErrorMessagePopup } = usePrivatePopups((state) => state);

  const optionsRef = useRef<HTMLDivElement | null>(null);
  const [optionOpen, setOptionOpen] = useState(false);
  useClickOutside(optionsRef, () => setOptionOpen(false));

  const spanHttpRef = useRef<HTMLSpanElement | null>(null);
  const spanIpRef = useRef<HTMLSpanElement | null>(null);
  const handleCopiedHTTP = (e: React.MouseEvent<HTMLButtonElement>) => {
    spanHttpRef.current && navigator.clipboard.writeText(spanHttpRef.current.textContent || '');
    const el = e.currentTarget;
    el.classList.add('copied');
    setTimeout(() => {
      el.classList.remove('copied');
    }, 1500);
  };
  const handleCopiedIP = (e: React.MouseEvent<HTMLButtonElement>) => {
    spanIpRef.current && navigator.clipboard.writeText(spanIpRef.current.textContent || '');
    const el = e.currentTarget;
    el.classList.add('copied');
    setTimeout(() => {
      el.classList.remove('copied');
    }, 1500);
  };

  const queryClient = useQueryClient();
  const { getProfileData } = useProfile();

  const handleAutoSwitch = useCallback(async (e: React.ChangeEvent) => {
    try {
      const res = await api.account.renewalProxy('uk', {
        contract_id: [id],
        // @ts-ignore
        renewal: e.target.checked ? 1 : 0
      });
      // @ts-ignore
      if (res?.data.status) {
        queryClient.invalidateQueries('account.proxyList');
        getProfileData();
        setSuccessMessagePopup({
          isOpen: true,
          // @ts-ignore
          message: res?.data?.['0']?.message || 'Успішно'
        });
        // setTimeout(() => {
        //   setSuccessMessagePopup({ isOpen: false });
        // }, 2000);
      } else {
        setErrorMessagePopup({
          isOpen: true,
          // @ts-ignore
          message: res?.data?.message || 'Something went wrong'
        });
      }
      setAutoContinueState((prev) => !prev);
    } catch (e) {}
  }, []);

  // useEffect(() => {
  //   if (proxyItemBodyRef.current) {
  //     if (id === 1) {
  //       setProxyItemHeight(proxyItemBodyRef.current?.scrollHeight);
  //     }
  //   }
  // }, []);
  const selectProxy = useCallback((e: React.ChangeEvent) => {
    // @ts-ignore
    setSelected(e.target.checked);
    setUser((prev: any) => {
      // @ts-ignore
      if (e.target.checked) {
        if (!prev?.select_contracts?.length) {
          return { ...prev, select_contracts: [id] };
        }
        const exist = prev.select_contracts.some((item: number) => item === id);
        if (exist) {
          return {
            ...prev,
            select_contracts: prev.select_contracts.filter((item: number) => item !== id)
          };
        }

        return { ...prev, select_contracts: [...(prev?.select_contracts || []), id] };
      } else {
        return {
          ...prev,
          select_contracts: prev.select_contracts.filter((item: number) => item !== id)
        };
      }
    });
  }, []);

  return (
    <tr className={`ProxyItem ${selected ? 'selected' : ''}`}>
      <td>
        <div className={`ProxyItem-id`}>
          <Checkbox
            checked={selected}
            onChange={selectProxy}
            label={`checker-${id}`}
            showTitle={false}
            color={'green'}
          />
          {is810 ? '№' : null}
          {idx}
        </div>
      </td>
      <td style={{ justifyContent: 'flex-start', paddingLeft: '20px' }}>
        <div
          ref={proxyItemHeadRef}
          className={`ProxyItem-spoller ${!!proxyItemHeight && 'active'}`}>
          {is810 ? (
            <span className='ProxyItem-mobile-title'>{pageInterfaceText?.acc_proxy}</span>
          ) : null}
          {logo && (
            <div className='ProxyItem-title' onClick={proxyItemClickHandler}>
              <img className='ProxyItem-title-logo' src={logo} alt={name} />
              {name}
              {socks && http ? <Icon icon='arrow-down' /> : null}
            </div>
          )}
          <div
            className='ProxyItem-body'
            ref={proxyItemBodyRef}
            style={{ height: proxyItemHeight + 'px' }}>
            {socks && (
              <>
                <div className='ProxyItem-body-title'>Socks:</div>
                <div className='ProxyItem-body-text'>
                  <span>{socks}</span>
                </div>
              </>
            )}
            {http && (
              <>
                <div className='ProxyItem-body-title'>http:</div>
                <div className='ProxyItem-body-text'>
                  <span ref={spanHttpRef}>{http}</span>
                  <button onClick={handleCopiedHTTP}>
                    <img src='/images/copy.svg' alt='copy' />
                    <span>{pageInterfaceText?.copied}</span>
                  </button>
                </div>
              </>
            )}
            {urlIpReplace && (
              <>
                <div className='ProxyItem-body-title'>{pageInterfaceText?.acc_exchange}</div>
                <div className='ProxyItem-body-text'>
                  <span ref={spanIpRef}>{urlIpReplace}</span>
                  <button onClick={handleCopiedIP}>
                    <img src='/images/copy.svg' alt='copy' />
                    <span>{pageInterfaceText?.copied}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </td>
      <td className='text-center'>
        <div className='ProxyItem-day-label'>
          {is810 ? (
            <span className='ProxyItem-mobile-title'>{pageInterfaceText?.acc_validity}</span>
          ) : null}
          <span className='ProxyItem-day-label-tag'>
            {validity < 1 ? 'минув' : formatter.format(validity)}
            {/* {validity < 1
              ? validity === 0
                ? 'закінчився'
                : `закінчився ${formatter.format(Math.abs(validity))} тому`
              : formatter.format(validity)} */}
          </span>
          {is810 ? null : <Popover text={pageInterfaceText?.acc_days_info} />}
        </div>
      </td>
      <td className='text-center'>
        <div className='ProxyItem-auto-switcher'>
          {is810 ? (
            <span className='ProxyItem-mobile-title'>{pageInterfaceText?.acc_auto_continue}</span>
          ) : null}
          <Switcher
            label={`switcher-${id}`}
            checked={autoContinueState}
            onChange={handleAutoSwitch}
          />
        </div>
      </td>
      <td className='text-center'>
        <div ref={optionsRef} className='ProxyItem-option'>
          <button className='ProxyItem-option-btn' onClick={() => setOptionOpen((prev) => !prev)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <OptionPopover
            isOpen={optionOpen}
            setIsOpen={setOptionOpen}
            proxyId={optionOpen ? id : undefined}
          />
        </div>
      </td>
    </tr>
  );
};
