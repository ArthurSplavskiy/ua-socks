import { Button } from '@/components/shared/Button';
import { useInterfaceText } from '@/context/UserContext';

export const TableEmpty = () => {
  //const { pageInterfaceText } = useCommon();
  const { text: pageInterfaceText } = useInterfaceText();

  return (
    <tr>
      <td>
        <div className='ProxyTable-empty'>
          <span>{pageInterfaceText?.acc_not_have_proxy}</span>
          <Button color='outline' btnLink={true} link='/account/buy'>
            {pageInterfaceText?.buyProxy_btn}
          </Button>
        </div>
      </td>
    </tr>
  );
};
