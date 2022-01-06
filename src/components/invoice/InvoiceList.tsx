import React from 'react';
import {Text, View} from 'react-native';
import {Schema} from '@app/sdk';
import Invoice from './Invoice';

type InvoiceDataList = Schema['InvoiceDataList'];
type InvoiceListProps = {
  error: unknown;
  invoices?: InvoiceDataList;
  isLoading: boolean;
};

function InvoiceList({error, invoices, isLoading}: InvoiceListProps) {
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    // TODO: remove console log
    console.log({error});
    return <Text>There was an error...</Text>;
  }

  return (
    <View>
      {Array.isArray(invoices) && invoices.length > 0 ? (
        invoices.map(invoice => <Invoice key={invoice.id} {...invoice} />)
      ) : (
        <Text>No results</Text>
      )}
    </View>
  );
}

export default InvoiceList;
