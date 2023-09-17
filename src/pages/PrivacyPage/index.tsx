import api from '@/api';
import useRequest from '@/hooks/useRequest';
import { IPolicyPageData } from '@/interfaces/api';
import ReactHtmlParser from 'react-html-parser';
import './index.scss';

interface Props {
  slug: string;
}

export default function PrivacyPage({ slug }: Props) {
  const { data, isLoading } = useRequest<IPolicyPageData>({
    method: 'GET',
    url: import.meta.env.VITE_API_URL + `/uk/${slug}` //api.policy.getPolicyData
  });

  return (
    <div className='PrivacyPage'>
      <h1>{data?.page_title}</h1>
      {data?.text && ReactHtmlParser(data.text)}
    </div>
  );
}
