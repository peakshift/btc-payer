import axios from 'axios';
import {paths} from '@app/sdk/openapi';

// TODO: at some point we will need to get
// baseURL (a.k.a. BTC Pay Server URL) from DB
import config from '@app/config';

export type ApiKeysPath = paths['/api/v1/api-keys/{apikey}'];
type DeleteApiKeysResource = ApiKeysPath['delete'];
type DeleteApiKeysParams = {
  path: DeleteApiKeysResource['parameters']['path'];
};
type DeleteApiKeysResponses =
  | DeleteApiKeysResource['responses']['200']
  | DeleteApiKeysResource['responses']['404'];

async function revokeApiKey(params: DeleteApiKeysParams) {
  const {apikey} = params.path;
  const path = `/api/v1/api-keys/${apikey}`;
  const url = `${config.baseURL}${path}`;
  const request = await axios.delete<DeleteApiKeysResponses>(url, {
    headers: config.headers,
  });
  return request.data;
}

export default revokeApiKey;
