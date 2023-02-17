import { Icon } from '@/components/shared/Icon/Icon';
import { useAccount } from '@/context/Account/AccountContextHooks';
import { useCommon } from '@/context/CommonContext';
import { useDevice } from '@/context/DeviceContext';
import { useInterfaceText } from '@/context/UserContext';
import { FC, useEffect } from 'react';

interface Props {
	isOpen?: boolean;
	setIsOpen?: (open: boolean) => void;
}

export const OptionPopover: FC<Props> = ({ isOpen, setIsOpen }) => {
	const { setNoScroll } = useCommon();
	const { text: pageInterfaceText } = useInterfaceText();
	const { is810 } = useDevice();
	const {
		state: { openContinuePopup, openReplaceIpPopup, openExportPopup }
	} = useAccount();

	useEffect(() => {
		if (isOpen && is810) {
			setNoScroll(true);
		} else {
			setNoScroll(false);
		}
	}, [isOpen]);

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
							openContinuePopup();
							setIsOpen?.(false);
						}}>
						<Icon icon='wallet' />
						{pageInterfaceText?.acc_continue}
					</button>
					<button
						onClick={() => {
							openReplaceIpPopup();
							setIsOpen?.(false);
						}}>
						<Icon icon='setting' />
						{pageInterfaceText?.acc_exchange}
					</button>
					<button
						onClick={() => {
							openExportPopup();
							setIsOpen?.(false);
						}}>
						<Icon icon='document' />
						{pageInterfaceText?.acc_export}
					</button>
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
						openContinuePopup();
						setIsOpen?.(false);
					}}>
					<Icon icon='wallet' />
					{pageInterfaceText?.acc_continue}
				</button>
				<button
					onClick={() => {
						openReplaceIpPopup();
						setIsOpen?.(false);
					}}>
					<Icon icon='setting' />
					{pageInterfaceText?.acc_exchange}
				</button>
				<button
					onClick={() => {
						openExportPopup();
						setIsOpen?.(false);
					}}>
					<Icon icon='document' />
					{pageInterfaceText?.acc_export}
				</button>
			</div>
		</>
	);
};
