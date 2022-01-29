import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@app/scenes/HomeScreen';
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
  RECEIVE_PAYMENT: 'ReceivePaymentScreen',
  SEND_PAYMENT: 'SendPaymentScreen',
});

const Tab = createBottomTabNavigator();
function AppNavigator() {
  return (
    <Tab.Navigator initialRouteName={routes.HOME}>
      <Tab.Screen name={routes.HOME} component={HomeScreen} />
      <Tab.Screen
        name={routes.RECEIVE_PAYMENT}
        component={ReceivePaymentScreen}
      />
      <Tab.Screen name={routes.SEND_PAYMENT} component={SendPaymentScreen} />
    </Tab.Navigator>
  );
}

export default React.memo(AppNavigator);
