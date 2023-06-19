import { AccountDashboardContent } from '@/components/Account';
import { FC } from 'react';

export const AccountDashboard: FC = () => {
	//loader-box
	// <Loader />
	return (
		<div className='AccountContent'>
			<AccountDashboardContent />
		</div>
	);
};
