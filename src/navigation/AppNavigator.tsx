import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '@app/scenes/HomeScreen';
import InvoiceScreen from '@app/scenes/InvoiceScreen';
import ReceivePaymentScreen from '@app/scenes/ReceivePaymentScreen';
import SendPaymentScreen from '@app/scenes/SendPaymentScreen';

// this type defines the list of params
// that should be passed to each screen
// through navigation
export type AppNavigatorParams = {
  HomeScreen: undefined;
  InvoiceScreen: undefined;
  ReceivePaymentScreen: undefined;
  SendPaymentScreen: undefined;
};

// route values are restricted to only be
// any of the keys of AppNavigatorParams
// to ensure type safety across the app
export const routes = Object.freeze<{
  [key: string]: keyof AppNavigatorParams;
}>({
  HOME: 'HomeScreen',
  INVOICE: 'InvoiceScreen',
  RECEIVE_PAYMENT: 'ReceivePaymentScreen',
  SEND_PAYMENT: 'SendPaymentScreen',
});

const Stack = createStackNavigator();
function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName={routes.HOME}>
      <Stack.Screen name={routes.HOME} component={HomeScreen} />
      <Stack.Screen name={routes.INVOICE} component={InvoiceScreen} />
      <Stack.Screen
        name={routes.RECEIVE_PAYMENT}
        component={ReceivePaymentScreen}
      />
      <Stack.Screen name={routes.SEND_PAYMENT} component={SendPaymentScreen} />
    </Stack.Navigator>
  );
}

export default React.memo(AppNavigator);
