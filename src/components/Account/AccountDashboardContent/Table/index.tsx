import { Icon } from '@/components/shared/Icon/Icon';
import { useDevice } from '@/context/DeviceContext';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Popover } from './Popover';
import { useInterfaceText } from '@/context/UserContext';
import './index.scss';

interface Props {
  bodyChildren: ReactNode;
  className?: string;
}

export const Table: FC<Props> = ({ bodyChildren, className }) => {
  // const { pageInterfaceText } = useCommon();
  const { text: pageInterfaceText } = useInterfaceText();
  const { is810 } = useDevice();
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [tableBodyHeightInit, setTableBodyHeightInit] = useState(0);
  const [tableBodyHeight, setTableBodyHeight] = useState(450);
  const [tableBodyExpand, setTableBodyExpand] = useState(false);
  const tableHeadHeight = 56;

  const resizeHandler = () => {
    setTimeout(() => {
      if (!tableRef.current) return;
      setTableBodyHeight(window.innerHeight - tableRef.current.getBoundingClientRect().y);
      if (window.innerWidth < 1024) {
        setTableBodyHeight(window.innerHeight - tableRef.current.getBoundingClientRect().y - 84);
      }
    }, 300);
  };

  useEffect(() => {
    if (tableRef.current) {
      setTableBodyHeight(window.innerHeight - tableRef.current.getBoundingClientRect().y);
      setTableBodyHeightInit(window.innerHeight - tableRef.current.getBoundingClientRect().y);
      if (window.innerWidth < 1024) {
        setTableBodyHeight(window.innerHeight - tableRef.current.getBoundingClientRect().y - 84);
      }
    }

    window.addEventListener('resize', resizeHandler);
    () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return (
    <table ref={tableRef} className={`ProxyTable ${className}`}>
      <thead className='ProxyTable-head'>
        <tr className='ProxyTable-head-row'>
          <th className='ProxyTable-head-item ProxyTable-head-item-num'>
            <span>№</span>
          </th>
          <th className='ProxyTable-head-item ProxyTable-head-item-proxy'>
            {pageInterfaceText?.acc_proxy}
            <button
              className={`${tableBodyHeight > tableHeadHeight ? '' : 'rotate'}`}
              onClick={() => {
                setTableBodyExpand((prev) => !prev);
                setTableBodyHeight(
                  tableBodyHeight > tableHeadHeight ? tableHeadHeight : tableBodyHeightInit
                );
              }}>
              <Icon icon='arrow-down' color='primary' />
            </button>
          </th>
          <th className='ProxyTable-head-item ProxyTable-head-item-validity'>
            {pageInterfaceText?.acc_validity}
          </th>
          <th className='ProxyTable-head-item ProxyTable-head-item-auto'>
            {pageInterfaceText?.acc_auto_continue}
            <span className='ProxyTable-popover-info'>
              <Icon icon='info' color='primary' />
              <Popover text={pageInterfaceText?.acc_proxy_info} />
            </span>
          </th>
          <th className='ProxyTable-head-item ProxyTable-head-item-actions'>Налаштування</th>
        </tr>
      </thead>
      <tbody
        className='ProxyTable-body'
        style={
          is810
            ? { overflowY: 'hidden' }
            : {
                minHeight: 0,
                height: `${tableBodyHeight - tableHeadHeight}px`,
                overflowY: `${tableBodyExpand ? 'hidden' : 'auto'}`
              }
        }>
        {bodyChildren}
      </tbody>
    </table>
  );
};
