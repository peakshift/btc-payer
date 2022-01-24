import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ServerInstanceScreen from '@app/scenes/ServerInstanceScreen';
import SignInScreen from '@app/scenes/SignInScreen';

// this type defines the list of params
// that should be passed to each screen
// through navigation
export type AuthNavigatorParams = {
  ServerInstanceScreen: undefined;
  SignInScreen: undefined;
};

// route values are restricted to only be
// any of the keys of AuthNavigatorParams
// to ensure type safety across the app
export const routes = Object.freeze<{
  [key: string]: keyof AuthNavigatorParams;
}>({
  SERVER_INSTANCE: 'ServerInstanceScreen',
  SIGN_IN: 'SignInScreen',
});

const Stack = createStackNavigator();
function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName={routes.SERVER_INSTANCE}>
      <Stack.Screen
        name={routes.SERVER_INSTANCE}
        component={ServerInstanceScreen}
      />
      <Stack.Screen name={routes.SIGN_IN} component={SignInScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
