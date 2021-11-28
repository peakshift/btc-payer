import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import config from '@app/config';

function HomeScreen() {
  return (
    <SafeAreaView>
      <Text>This is a POC</Text>
      <QRCode value={config.baseURL} />
    </SafeAreaView>
  );
}

export default HomeScreen;
