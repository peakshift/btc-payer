import React, {useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_INSTANCE_URL} from '@app/constants/keys';

// types
// -------------------------
export type ServerInstanceContextState = {
  clearURL: () => Promise<void>;
  setURL: (newURL: string) => void;
  url: string;
};

type ServerInstanceProviderTypes = {
  children: React.ReactNode;
};

// context
// -------------------------
export const ServerInstanceContext =
  React.createContext<ServerInstanceContextState | null>(null);

// provider
// -------------------------
function ServerInstanceProvider({children}: ServerInstanceProviderTypes) {
  const [url, setURL] = useState('');
  useEffect(() => {
    async function restoreURL() {
      try {
        const restoredURL = await AsyncStorage.getItem(SERVER_INSTANCE_URL);
        if (restoredURL) {
          setURL(restoredURL);
        }
      } catch (error) {
        console.log({error});
      }
    }

    restoreURL();
  }, []);

  const clearURL = async () => {
    try {
      await AsyncStorage.removeItem(SERVER_INSTANCE_URL);
    } catch (error) {
      console.log({error});
    }
  };

  const setAndStoreURL = async (newURL: string) => {
    try {
      setURL(newURL);
      await AsyncStorage.setItem(SERVER_INSTANCE_URL, newURL);
    } catch (error) {
      console.log({error});
    }
  };

  const value = useMemo(
    () => ({
      clearURL,
      setURL: setAndStoreURL,
      url,
    }),
    [url],
  );
  return (
    <ServerInstanceContext.Provider value={value}>
      {children}
    </ServerInstanceContext.Provider>
  );
}

// hook
// -------------------------
export const useServerInstance = () => {
  const context = React.useContext(ServerInstanceContext);
  if (!context) {
    throw new Error(
      'Components using ServerInstanceContext must be rendered within the ServerInstanceProvider',
    );
  }
  return context;
};

// exports
// -------------------------
export default ServerInstanceProvider;
