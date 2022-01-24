import React from 'react';
import {Button, Text, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {AppNavigatorParams} from '@app/navigation/AppNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAuth} from '@app/providers/AuthProvider';

type HomeScreenNavigationProp = StackNavigationProp<
  AppNavigatorParams,
  'HomeScreen'
>;

function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {authState, signOut} = useAuth();

  return (
    <SafeAreaView>
      <Text>Welcome {authState?.user.email}</Text>
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
      <Button onPress={signOut} title="Sign Out" />
    </SafeAreaView>
  );
}

export default HomeScreen;
