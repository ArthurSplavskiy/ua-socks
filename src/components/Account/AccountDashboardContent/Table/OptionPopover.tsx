import { usePrivatePopups } from '@/components/PopupSystem/state/PrivatePopups';
import { Icon } from '@/components/shared/Icon/Icon';
import { useCommon } from '@/context/CommonContext';
import { useDevice } from '@/context/DeviceContext';
import { useInterfaceText, useProfile } from '@/context/UserContext';
import { FC, memo, useEffect } from 'react';

interface Props {
  withoutExport?: boolean;
  proxyId?: number;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

export const OptionPopover: FC<Props> = memo(({ isOpen, setIsOpen, proxyId, withoutExport }) => {
  const { setNoScroll } = useCommon();
  const { text: pageInterfaceText } = useInterfaceText();
  const { is810 } = useDevice();
  const { user, setUser } = useProfile();
  // const {
  //   state: { openContinuePopup, openReplaceIpPopup, openExportPopup }
  // } = useAccount();

  const { setExportProxyPopup, setContinueProxyPopup } = usePrivatePopups((state) => state);

  useEffect(() => {
    if (isOpen && is810) {
      setNoScroll(true);
    } else {
      setNoScroll(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (proxyId) {
      setUser({
        ...user,
        select_single_contracts: [proxyId],
        select_export_contracts: [proxyId]
      });
    } else {
      setUser({
        ...user,
        select_single_contracts: user?.select_single_contracts?.filter((c) => c !== proxyId) || [],
        select_export_contracts: user?.select_export_contracts?.filter((c) => c !== proxyId) || []
      });
    }
  }, [isOpen, proxyId]);

  if (is810) {
    return (
      <div
        className={`ProxyItem-option-backdrop ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen?.(false)}>
        <div
          className={`ProxyItem-option-popover ${isOpen ? 'active' : ''}`}
          //onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              //openContinuePopup();
              setContinueProxyPopup({ isOpen: true });
              setIsOpen?.(false);
            }}>
            <Icon icon='wallet' />
            {pageInterfaceText?.acc_continue}
          </button>
          {/* <button
            onClick={() => {
              openReplaceIpPopup();
              setIsOpen?.(false);
            }}>
            <Icon icon='setting' />
            {pageInterfaceText?.acc_exchange}
          </button> */}
          {withoutExport ? null : (
            <button
              onClick={() => {
                // openExportPopup();
                setExportProxyPopup({ isOpen: true });
                setIsOpen?.(false);
              }}>
              <Icon icon='document' />
              {pageInterfaceText?.acc_export}
            </button>
          )}
          <button onClick={() => setIsOpen?.(false)}>
            <Icon icon='close' />
            {pageInterfaceText?.close}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`ProxyItem-option-popover ${isOpen ? 'active' : ''}`}>
        <button
          onClick={() => {
            //openContinuePopup();
            setContinueProxyPopup({ isOpen: true });
            setIsOpen?.(false);
          }}>
          <Icon icon='wallet' />
          {pageInterfaceText?.acc_continue}
        </button>
        {/* <button
          onClick={() => {
            openReplaceIpPopup();
            setIsOpen?.(false);
          }}>
          <Icon icon='setting' />
          {pageInterfaceText?.acc_exchange}
        </button> */}
        {withoutExport ? null : (
          <button
            onClick={() => {
              // openExportPopup();
              setExportProxyPopup({ isOpen: true });
              setIsOpen?.(false);
            }}>
            <Icon icon='document' />
            {pageInterfaceText?.acc_export}
          </button>
        )}
      </div>
    </>
  );
});
