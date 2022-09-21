import useSWR from 'swr';
import { OPTIONS } from '../lib/constants'
import fetcher from '../lib/fetcher';
import { getUrlFromLocalStorage } from '../lib/urlHelpers';

export function useModule (id, successHandler, errorHandler) {
  const baseUrl = getUrlFromLocalStorage();
  const opt = {
    ...OPTIONS,
    onSuccess: res => successHandler(res),
    onError: err => errorHandler(err)
  }
  const { data, error } = useSWR(`${baseUrl}/module/${id}`, fetcher, opt);
  return {
    mod: data,
    isLoading: !error && !data,
    isError: error
  }
}