import axios, {AxiosInstance} from 'axios';
import React, {useMemo} from 'react';
import {useAuth} from './AuthProvider';
import {useServerInstance} from './ServerInstanceProvider';

// types
// -------------------------
export type FetchContextState = {
  axiosWithAuth: AxiosInstance;
};

type FetchProviderTypes = {
  children: React.ReactNode;
};

// context
// -------------------------
export const FetchContext = React.createContext<FetchContextState | null>(null);

// provider
// -------------------------
function FetchProvider({children}: FetchProviderTypes) {
  const {authState} = useAuth();
  const {url} = useServerInstance();
  const axiosWithAuth = useMemo(
    () =>
      axios.create({
        baseURL: url,
      }),
    [url],
  );

  axiosWithAuth.interceptors.request.use(config => {
    config.headers!.Authorization = `token ${authState?.token}`;
    return config;
  });

  const value = useMemo(
    () => ({
      axiosWithAuth,
    }),
    [axiosWithAuth],
  );
  return (
    <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
  );
}

// hook
// -------------------------
export const useFetch = () => {
  const context = React.useContext(FetchContext);
  if (!context) {
    throw new Error(
      'Components using FetchContext must be rendered within the FetchProvider',
    );
  }
  return context;
};

// exports
// -------------------------
export default FetchProvider;
