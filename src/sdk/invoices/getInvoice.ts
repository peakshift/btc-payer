import axios from 'axios';
import {paths} from '@app/sdk/openapi';

// TODO: at some point we will need to get
// baseURL (a.k.a. BTC Pay Server URL) from DB
import config from '@app/config';

export type InvoicePath =
  paths['/api/v1/stores/{storeId}/invoices/{invoiceId}'];
type GetInvoiceResource = InvoicePath['get'];
type GetInvoiceParams = {
  path: GetInvoiceResource['parameters']['path'];
};
type GetInvoiceResponse =
  GetInvoiceResource['responses']['200']['content']['application/json'];

async function getInvoice(params: GetInvoiceParams) {
  const {invoiceId, storeId} = params.path;
  const path = `/api/v1/stores/${storeId}/invoice/${invoiceId}`;
  const url = `${config.baseURL}${path}`;
  const request = await axios.get<GetInvoiceResponse>(url, {
    headers: config.headers,
  });
  return request.data;
}

export default getInvoice;
