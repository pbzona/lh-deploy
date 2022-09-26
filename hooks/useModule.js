import useSWR from 'swr';
import { OPTIONS } from '../lib/constants'
import fetcher from '../lib/fetcher';
import { getUrlFromLocalStorage, getModuleEndpoint } from '../lib/urlHelpers';

export function useModule (id, successHandler, errorHandler, random = '') {
  const baseUrl = getUrlFromLocalStorage();
  const opt = {
    ...OPTIONS,
    onSuccess: res => successHandler(res),
    onError: err => errorHandler(err)
  }
  const { data, error } = useSWR(getModuleEndpoint(baseUrl, id, random), fetcher, opt);
  return {
    mod: data,
    isLoading: !error && !data,
    isError: error
  }
}