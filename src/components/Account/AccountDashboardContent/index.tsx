import { Button } from '@/components/shared/Button';
import { useCommon } from '@/context/CommonContext';
import { useDevice } from '@/context/DeviceContext';
import { useProfile } from '@/context/UserContext';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useRef, useState } from 'react';
import { BalanceWidget } from './BalanceWidget';
import { Table } from './Table';
import { OptionPopover } from './Table/OptionPopover';
import { TableEmpty } from './Table/TableEmpty';
import { TableRowItem } from './Table/TableRowItem';
import './index.scss';

export const AccountDashboardContent = () => {
	const { isMobile } = useDevice();
	const { user } = useProfile();
	const { pageInterfaceText } = useCommon();
	const [optionOpen, setOptionOpen] = useState(false);
	const groupOptionsRef = useRef<HTMLDivElement | null>(null);
	useClickOutside(groupOptionsRef, () => setOptionOpen(false));

	const renderTableBody = () =>
		user?.proxy.map((proxy) => (
			<TableRowItem
				key={proxy.id}
				id={proxy.id}
				name={proxy.name}
				logo={proxy.logo}
				country={proxy.country}
				validity={proxy.validity}
				socks={proxy.socks}
				http={proxy.http}
				urlIpReplace={proxy.url_ip_replace}
				autoContinue={proxy.auto_continue}
			/>
		));

	return (
		<div className='AccountDashboardContent'>
			<div className='AccountDashboardContent-head'>
				<div>
					<h2 className='AccountContent-title'>{pageInterfaceText?.acc_title1}</h2>
					{!isMobile && (
						<div ref={groupOptionsRef} className='AccountContent-option'>
							<Button color='outline' onClick={() => setOptionOpen(true)}>
								{pageInterfaceText?.acc_group_btn}
							</Button>
							<OptionPopover isOpen={optionOpen} setIsOpen={setOptionOpen} />
						</div>
					)}
				</div>
				<BalanceWidget />
				{isMobile && (
					<div>
						<Button className='mt-24' color='outline' onClick={() => setOptionOpen(true)}>
							{pageInterfaceText?.acc_group_btn}
						</Button>
						<OptionPopover isOpen={optionOpen} setIsOpen={setOptionOpen} />
					</div>
				)}
			</div>
			<div className='AccountDashboardContent-body'>
				<Table bodyChildren={user?.proxy ? renderTableBody() : <TableEmpty />} />
			</div>
		</div>
	);
};
