import { Icon } from '@/components/shared/Icon/Icon';
import { useCommon } from '@/context/CommonContext';
import { useDevice } from '@/context/DeviceContext';
import { FC, useEffect } from 'react';

interface Props {
	isOpen?: boolean;
	setIsOpen?: (open: boolean) => void;
}

export const OptionPopover: FC<Props> = ({ isOpen, setIsOpen }) => {
	const { pageInterfaceText, setNoScroll } = useCommon();
	const { is810 } = useDevice();

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
					onClick={(e) => e.stopPropagation()}>
					<button>
						<Icon icon='wallet' />
						{pageInterfaceText?.acc_continue}
					</button>
					<button>
						<Icon icon='setting' />
						{pageInterfaceText?.acc_exchange}
					</button>
					<button>
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
				<button>
					<Icon icon='wallet' />
					{pageInterfaceText?.acc_continue}
				</button>
				<button>
					<Icon icon='setting' />
					{pageInterfaceText?.acc_exchange}
				</button>
				<button>
					<Icon icon='document' />
					{pageInterfaceText?.acc_export}
				</button>
			</div>
		</>
	);
};
