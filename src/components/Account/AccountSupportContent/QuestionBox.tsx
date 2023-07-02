import api from '@/api';
import { Button } from '@/components/shared/Button';
import { Loader } from '@/components/shared/Loader';
import { useInterfaceText } from '@/context/UserContext';
import { FC, ReactNode } from 'react';
import { useQuery } from 'react-query';

interface Props {
  bg: ReactNode;
}

interface ISupportData {
  btn_name: string;
  created_at: string;
  id: number;
  sub_title_en: string | null;
  sub_title_ru: string | null;
  sub_title_ua: string | null;
  telegram: string | null;
  title_en: string | null;
  title_ru: string | null;
  title_ua: string | null;
  updated_at: string | null;
  visible: number;
}

export const QuestionBox: FC<Props> = ({ bg }) => {
  const { data, isLoading } = useQuery<ISupportData[]>(['account.support'], () =>
    api.account.getSupportData('uk')
  );
  console.log(data);
  return (
    <div className='QuestionBox'>
      <div className='QuestionBox-content'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h3>{data?.[0].title_ua}</h3>
            {/* {pageInterfaceText?.support_info} */}
            <p>{data?.[0].sub_title_ua}</p>
            {/* {pageInterfaceText?.support_feedback} */}
            <Button icon='telegram' btnType='iconLeft'>
              {data?.[0].btn_name}
              {/* {pageInterfaceText?.question_btn} */}
            </Button>
          </>
        )}
      </div>
      {bg}
    </div>
  );
};
