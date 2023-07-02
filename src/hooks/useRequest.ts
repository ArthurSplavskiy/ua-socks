import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useEffect } from 'react';
import axiosInstance from '@/api/axios';

export type GetRequest = AxiosRequestConfig | null;

interface Return<Data, Error>
  extends Pick<
    SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'error' | 'mutate' | 'isLoading'
  > {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>, 'fallbackData'> {
  fallbackData?: Data;
}

export default function useRequest<Data = unknown, Error = unknown>(
  request: GetRequest,
  { fallbackData, ...config }: Config<Data, Error> = {}
): Return<Data, Error> {
  const {
    data: response,
    error,
    isValidating,
    isLoading,
    mutate
  } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
    request && JSON.stringify(request),

    /**
     * NOTE: Typescript thinks `request` can be `null` here, but the fetcher
     * function is actually only called by `useSWR` when it isn't.
     */
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => axiosInstance.request<Data>(request!),
    {
      ...config,
      fallbackData: fallbackData && {
        status: 200,
        statusText: 'InitialData',
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        config: request!,
        headers: {},
        data: fallbackData
      }
    }
  );

  // const [isLoadingDEV, setIsLoadingDEV] = useState(true);

  // document.body.classList.add('content-loading');
  // setTimeout(() => {
  // 	setIsLoadingDEV(false);
  // 	document.body.classList.remove('content-loading');
  // }, 200);

  const removeLoadind = () => {
    // setTimeout(() => {
    // 	document.body.classList.remove('content-loading');
    // }, 1000);
    document.body.classList.remove('content-loading');
  };

  useEffect(() => {
    isLoading ? document.body.classList.add('content-loading') : removeLoadind();
  }, [isLoading]);

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    isLoading,
    mutate
  };
}
