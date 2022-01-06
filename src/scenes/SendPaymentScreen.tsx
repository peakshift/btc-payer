import React from 'react';
import {View} from 'react-native';
import QRScanner from '@app/components/scanner/QRScanner';

function SendPaymentScreen() {
  return (
    <View>
      <QRScanner />
    </View>
  );
}

export default SendPaymentScreen;
