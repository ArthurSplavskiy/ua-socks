import { Button } from '@/components/shared/Button';
import { useDevice } from '@/context/DeviceContext';
import { useInterfaceText, useProfile } from '@/context/UserContext';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BalanceWidget } from './BalanceWidget';
import { Table } from './Table';
import { OptionPopover } from './Table/OptionPopover';
import { TableEmpty } from './Table/TableEmpty';
import { TableRowItem } from './Table/TableRowItem';
import { useAccount } from '@/context/Account/AccountContextHooks';
import './index.scss';
import { useQuery } from 'react-query';
import api from '@/api';
import { IProxy } from '@/interfaces/shared';
import { calcValidity } from './utils';

export const AccountDashboardContent = () => {
  const { isMobile } = useDevice();
  // const { user } = useProfile();
  // const { state } = useAccount();
  // const { pageInterfaceText } = useCommon();
  const { text: pageInterfaceText } = useInterfaceText();
  const [optionOpen, setOptionOpen] = useState(false);
  const groupOptionsRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(groupOptionsRef, () => setOptionOpen(false));
  const { user } = useProfile();

  const { data } = useQuery<any>(['account.proxyList'], () => api.account.getProxyList('uk'));

  const renderTableBody = useCallback(() => {
    if (data) {
      const items: IProxy[] = [];
      for (let item in data) {
        // @ts-ignore
        if (typeof data[item] != 'string') {
          // @ts-ignore
          items.push(data[item]);
        }
      }

      return items.map((proxy) => (
        <TableRowItem
          key={proxy.contract_id}
          proxyID={proxy.contract_id}
          id={proxy.contract_id}
          name={proxy.operator_name} // proxy.name
          logo={proxy.operator_logo} // proxy.logo
          country={proxy.region_name} // proxy.country
          validity={calcValidity(proxy.expires_at)} // proxy.validity
          socks={''} // proxy.socks
          http={''} // proxy.http
          urlIpReplace={''} // proxy.url_ip_replace
          autoContinue={!!proxy.renewal} // proxy.auto_continue
        />
      ));
    }
  }, [data]);

  // user?.proxy.map((proxy) => (
  // 	<TableRowItem
  // 		key={proxy.id}
  // 		id={proxy.id}
  // 		name={proxy.name}
  // 		logo={proxy.logo}
  // 		country={proxy.country}
  // 		validity={proxy.validity}
  // 		socks={proxy.socks}
  // 		http={proxy.http}
  // 		urlIpReplace={proxy.url_ip_replace}
  // 		autoContinue={proxy.auto_continue}
  // 	/>
  // ));

  return (
    <div className='AccountDashboardContent'>
      <div className='AccountDashboardContent-head'>
        <div>
          <h2 className='AccountContent-title'>{pageInterfaceText?.acc_title1}</h2>
          {!isMobile && (
            <div ref={groupOptionsRef} className='AccountContent-option'>
              <Button
                color='outline'
                onClick={() => setOptionOpen(true)}
                // @ts-ignore
                disabled={user?.select_contracts?.length < 2}>
                {pageInterfaceText?.acc_group_btn}
              </Button>
              <OptionPopover isOpen={optionOpen} setIsOpen={setOptionOpen} withoutExport />
            </div>
          )}
        </div>
        <BalanceWidget />
        {isMobile && (
          <div>
            <Button
              className='mt-24'
              color='outline'
              onClick={() => setOptionOpen(true)}
              // @ts-ignore
              disabled={user?.select_contracts?.length < 2}>
              {pageInterfaceText?.acc_group_btn}
            </Button>
            <OptionPopover isOpen={optionOpen} setIsOpen={setOptionOpen} withoutExport />
          </div>
        )}
      </div>
      <div className='AccountDashboardContent-body'>
        <Table bodyChildren={data?.['0']?.contract_id ? renderTableBody() : <TableEmpty />} />
      </div>
    </div>
  );
};
