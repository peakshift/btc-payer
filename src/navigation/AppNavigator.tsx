import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '@app/scenes/HomeScreen';
import InvoiceScreen from '@app/scenes/InvoiceScreen';

// this type defines the list of params
// that should be passed to each screen
// through navigation
export type AppNavigatorParams = {
  HomeScreen: undefined;
  InvoiceScreen: undefined;
};

// route values are restricted to only be
// any of the keys of AppNavigatorParams
// to ensure type safety across the app
export const routes = Object.freeze<{
  [key: string]: keyof AppNavigatorParams;
}>({
  HOME: 'HomeScreen',
  INVOICE: 'InvoiceScreen',
});

const Stack = createStackNavigator();
function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={routes.INVOICE}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={routes.HOME} component={HomeScreen} />
      <Stack.Screen name={routes.INVOICE} component={InvoiceScreen} />
    </Stack.Navigator>
  );
}

export default React.memo(AppNavigator);
