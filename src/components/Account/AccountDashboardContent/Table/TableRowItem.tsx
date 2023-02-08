import { Checkbox } from '@/components/shared/FormComponents/Checkbox/Checkbox';
import { Switcher } from '@/components/shared/FormComponents/Switcher';
import { Icon } from '@/components/shared/Icon/Icon';
import { useCommon } from '@/context/CommonContext';
import { useDevice } from '@/context/DeviceContext';
import { formatter } from '@/helpers';
import { useClickOutside } from '@/hooks/useClickOutside';
import { FC, useEffect, useRef, useState } from 'react';
import { OptionPopover } from './OptionPopover';
import { Popover } from './Popover';

interface Props {
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
	const { pageInterfaceText } = useCommon();
	const [selected, setSelected] = useState(false);
	const [autoContinueState, setAutoContinueState] = useState(autoContinue);
	const { is810 } = useDevice();

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

	useEffect(() => {
		if (proxyItemBodyRef.current) {
			if (id === 1) {
				setProxyItemHeight(proxyItemBodyRef.current?.scrollHeight);
			}
		}
	}, []);

	return (
		<tr className={`ProxyItem ${selected ? 'selected' : ''}`}>
			<td>
				<div className={`ProxyItem-id`}>
					<Checkbox
						checked={selected}
						onChange={() => setSelected((prev) => !prev)}
						label={`checker-${id}`}
						showTitle={false}
						color={'green'}
					/>
					{is810 ? '№' : null}
					{id}
				</div>
			</td>
			<td>
				<div
					ref={proxyItemHeadRef}
					className={`ProxyItem-spoller ${!!proxyItemHeight && 'active'}`}>
					{is810 ? (
						<span className='ProxyItem-mobile-title'>{pageInterfaceText?.acc_proxy}</span>
					) : null}
					<div className='ProxyItem-title' onClick={proxyItemClickHandler}>
						<img className='ProxyItem-title-logo' src={logo} alt={name} />
						{name}
						<Icon icon='arrow-down' />
					</div>
					<div
						className='ProxyItem-body'
						ref={proxyItemBodyRef}
						style={{ height: proxyItemHeight + 'px' }}>
						<div className='ProxyItem-body-title'>Socks:</div>
						<div className='ProxyItem-body-text'>
							<span>{socks}</span>
						</div>
						<div className='ProxyItem-body-title'>http:</div>
						<div className='ProxyItem-body-text'>
							<span ref={spanHttpRef}>{http}</span>
							<button onClick={handleCopiedHTTP}>
								<img src='/images/copy.svg' alt='copy' />
								<span>{pageInterfaceText?.copied}</span>
							</button>
						</div>
						<div className='ProxyItem-body-title'>{pageInterfaceText?.acc_exchange}</div>
						<div className='ProxyItem-body-text'>
							<span ref={spanIpRef}>{urlIpReplace}</span>
							<button onClick={handleCopiedIP}>
								<img src='/images/copy.svg' alt='copy' />
								<span>{pageInterfaceText?.copied}</span>
							</button>
						</div>
					</div>
				</div>
			</td>
			<td className='text-center'>
				<div className='ProxyItem-day-label'>
					{is810 ? (
						<span className='ProxyItem-mobile-title'>{pageInterfaceText?.acc_validity}</span>
					) : null}
					<span className='ProxyItem-day-label-tag'>{formatter.format(validity)}</span>
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
						onChange={() => setAutoContinueState((prev) => !prev)}
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
					<OptionPopover isOpen={optionOpen} setIsOpen={setOptionOpen} />
				</div>
			</td>
		</tr>
	);
};
