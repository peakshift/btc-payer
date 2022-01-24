import axios from 'axios';
import {paths} from '@app/sdk/openapi';

// TODO: at some point we will need to get
// baseURL (a.k.a. BTC Pay Server URL) from DB
import config from '@app/config';

export type CurrentUserPath = paths['/api/v1/users/me'];
export type GetCurrentUserResource = CurrentUserPath['get'];
export type GetCurrentUserResponses =
  | GetCurrentUserResource['responses']['200']['content']['application/json'];
export const CURRENT_USER_PATH = '/api/v1/users/me';

async function getCurrentUser() {
  const url = `${config.baseURL}${CURRENT_USER_PATH}`;
  const request = await axios.get<GetCurrentUserResponses>(url, {
    headers: config.headers,
  });
  return request.data;
}

export default getCurrentUser;
