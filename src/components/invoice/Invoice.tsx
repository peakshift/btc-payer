import React from 'react';
import {View, Text} from 'react-native';
import {Schema} from '@app/sdk';

type InvoiceData = Schema['InvoiceData'];
type InvoiceProps = InvoiceData;

function Invoice({id, status, amount}: InvoiceProps) {
  return (
    <View>
      <Text>
        {id} ({status}) - {amount}
      </Text>
    </View>
  );
}

export default Invoice;
