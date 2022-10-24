import useSWR from 'swr';
import { OPTIONS } from '../lib/constants'
import fetcher from '../lib/fetcher';
import { getUrlFromLocalStorage, getModuleEndpoint } from '../lib/urlHelpers';

// This component *must appear on every page*
//
// It makes a single request to the endpoint for module 0, which is where the
// SDK is initialized on the server. It only gets initialized when the module 
// is loaded however, so we need this call to try and load it so subsequent modules can
// evaluate flags.
//
// Without this component, if the server restarts (without loading the SDK)
// and you navigate to a page that requests data that relies on a LaunchDarkly flag,
// the backend operation will fail because the SDK was not initialized before being called.

export default function SdkPing() {
  const ID = 0; // The SDK module should always be module 0, hardcoding this value
  const baseUrl = getUrlFromLocalStorage();
  const opt = {
  ...OPTIONS,
    refreshInterval: 0,
    onSuccess: console.log,
    onError: console.error
  }

  useSWR(getModuleEndpoint(baseUrl, ID), fetcher, opt);
  return null;
}