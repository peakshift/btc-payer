import React from 'react';
import {BarCodeReadEvent} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

function QRScanner() {
  const onSuccess = (e: BarCodeReadEvent) => {
    console.log({data: e.data});
  };

  return <QRCodeScanner onRead={onSuccess} />;
}

export default QRScanner;
