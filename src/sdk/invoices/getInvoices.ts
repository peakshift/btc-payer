import axios from 'axios';
import qs from 'query-string';
import {paths} from '@app/sdk/openapi';

// TODO: at some point we will need to get
// baseURL (a.k.a. BTC Pay Server URL) from DB
import config from '@app/config';

export type InvoicesPath = paths['/api/v1/stores/{storeId}/invoices'];
type GetInvoicesResource = InvoicesPath['get'];
type GetInvoicesParams = {
  path: GetInvoicesResource['parameters']['path'];
  query?: GetInvoicesResource['parameters']['query'];
};
type GetInvoicesResponse =
  GetInvoicesResource['responses']['200']['content']['application/json'];

async function getInvoices(params: GetInvoicesParams) {
  const {storeId} = params.path;
  const path = params.query
    ? `/api/v1/stores/${storeId}/invoices?${qs.stringify(params.query)}`
    : `/api/v1/stores/${storeId}/invoices`;
  const url = `${config.baseURL}${path}`;
  const request = await axios.get<GetInvoicesResponse>(url, {
    headers: config.headers,
  });
  return request.data;
}

export default getInvoices;
