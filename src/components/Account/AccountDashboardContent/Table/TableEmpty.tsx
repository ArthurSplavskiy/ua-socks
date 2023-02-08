import { Button } from '@/components/shared/Button';
import { useCommon } from '@/context/CommonContext';

export const TableEmpty = () => {
	const { pageInterfaceText } = useCommon();

	return (
		<tr>
			<td>
				<div className='ProxyTable-empty'>
					<span>{pageInterfaceText?.acc_not_have_proxy}</span>
					<Button color='outline'>{pageInterfaceText?.buyProxy_btn}</Button>
				</div>
			</td>
		</tr>
	);
};
