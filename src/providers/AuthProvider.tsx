import React, {useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';
import axios from 'axios';
import {ApplicationUserData} from '@app/sdk/types';
import {
  API_KEY_PATH,
  PostApiKeysParams,
  PostApiKeysResponses,
} from '@app/sdk/api-keys/createApiKey';
import {useServerInstance} from './ServerInstanceProvider';
import {
  CURRENT_USER_PATH,
  GetCurrentUserResponses,
} from '@app/sdk/users/getCurrentUser';
import {TOKEN, USER} from '@app/constants/keys';

// types
// -------------------------
type AuthState = {
  user: ApplicationUserData;
  token: string;
};

export type AuthContextState = {
  authState?: AuthState;
  isAuthenticated: boolean;
  loading: boolean;
  signIn(username: string, password: string): Promise<void>;
  signOut(): Promise<void>;
};

type AuthProviderTypes = {
  children: React.ReactNode;
};

// context
// -------------------------
export const AuthContext = React.createContext<AuthContextState | null>(null);

// provider
// -------------------------
function AuthProvider({children}: AuthProviderTypes) {
  const [authState, setAuthState] = useState<AuthState>();
  const [loading, setLoading] = useState(false);
  const {url} = useServerInstance();

  useEffect(() => {
    async function restoreAuthState() {
      try {
        const [token, user] = await Promise.all([
          // TODO: retrieve token from keychain/encrypted-storage
          AsyncStorage.getItem(TOKEN),
          AsyncStorage.getItem(USER),
        ]);

        if (token && user) {
          setAuthState({token, user: JSON.parse(user)});
        }
      } catch (error) {
        console.log({error});
      }
    }

    restoreAuthState();
  }, []);

  const setAndStoreAuthState = async ({token, user}: AuthState) => {
    setAuthState({token, user});
    await Promise.all([
      // TODO: store token in keychain/encrypted-storage
      AsyncStorage.setItem(TOKEN, token),
      AsyncStorage.setItem(USER, JSON.stringify(user)),
    ]);
  };

  const signIn = async (username: string, password: string) => {
    setLoading(true);

    try {
      // TODO: replace this sign in process later
      const params: PostApiKeysParams = {
        body: {label: 'btc-payer', permissions: ['unrestricted']},
      };
      const authHeader = 'Basic ' + base64.encode(`${username}:${password}`);
      const apiKeyResponse = await axios.post<PostApiKeysResponses>(
        API_KEY_PATH,
        params.body,
        {
          baseURL: url,
          headers: {Authorization: authHeader},
        },
      );

      if (apiKeyResponse.status === 200 && apiKeyResponse.data.apiKey) {
        const userResponse = await axios.get<GetCurrentUserResponses>(
          CURRENT_USER_PATH,
          {
            baseURL: url,
            headers: {Authorization: `token ${apiKeyResponse.data.apiKey}`},
          },
        );

        if (userResponse.status === 200 && userResponse.data.id) {
          setAndStoreAuthState({
            token: apiKeyResponse.data.apiKey,
            user: userResponse.data,
          });
        }
      }
    } catch (error) {
      console.log({error});
    }

    setLoading(false);
  };
  const signOut = async () => {
    await Promise.all([
      AsyncStorage.removeItem(TOKEN),
      AsyncStorage.removeItem(USER),
    ]);
    setAuthState(undefined);
  };

  const value = useMemo(
    () => ({
      authState,
      isAuthenticated: Boolean(authState?.token),
      loading,
      signIn,
      signOut,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authState, loading, url],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// hook
// -------------------------
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(
      'Components using AuthContext must be rendered within the AuthProvider',
    );
  }
  return context;
};

// exports
// -------------------------
export default AuthProvider;
