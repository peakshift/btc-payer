import React from 'react';
import {SafeAreaView} from 'react-native';
import {useQuery} from 'react-query';
import {getInvoices} from '@app/sdk/invoices';
import InvoiceList from '@app/components/invoice/InvoiceList';

function InvoiceScreen() {
  const storeId = 'fake_store_id';
  const {
    data: invoicesData,
    error: invoicesError,
    isLoading: invoicesLoading,
  } = useQuery('invoices', () => getInvoices({path: {storeId}}));

  return (
    <SafeAreaView>
      <InvoiceList
        error={invoicesError}
        invoices={invoicesData}
        isLoading={invoicesLoading}
      />
    </SafeAreaView>
  );
}

export default InvoiceScreen;
