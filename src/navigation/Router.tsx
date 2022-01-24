import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Loading from '@app/components/common/Loading';
import {useAuth} from '@app/providers/AuthProvider';
import FetchProvider from '@app/providers/FetchProvider';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

export const Router = () => {
  const {isAuthenticated, loading} = useAuth();

  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <FetchProvider>
          <AppNavigator />
        </FetchProvider>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default Router;
