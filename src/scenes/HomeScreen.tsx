import React from 'react';
import {Button, Text, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {AppNavigatorParams} from '@app/navigation/AppNavigator';
import {StackNavigationProp} from '@react-navigation/stack';

type HomeScreenNavigationProp = StackNavigationProp<
  AppNavigatorParams,
  'HomeScreen'
>;

function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView>
      <Text>BTC Payer</Text>
      <Button
        onPress={() => {
          navigation.push('ReceivePaymentScreen');
        }}
        title="Receive Payment"
      />
      <Button
        onPress={() => {
          navigation.push('SendPaymentScreen');
        }}
        title="Send Payment"
      />
    </SafeAreaView>
  );
}

export default HomeScreen;
