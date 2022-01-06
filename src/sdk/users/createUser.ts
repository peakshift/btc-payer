import axios from 'axios';
import {paths} from '@app/sdk/openapi';

// TODO: at some point we will need to get
// baseURL (a.k.a. BTC Pay Server URL) from DB
import config from '@app/config';

export type UsersPath = paths['/api/v1/users'];
type PostUsersResource = UsersPath['post'];
type PostUsersParams = {
  body: PostUsersResource['requestBody']['content']['application/json'];
};
type PostUsersResponses =
  | PostUsersResource['responses']['201']['content']['application/json']
  | PostUsersResource['responses']['400']['content']['application/json'];

async function createUser(params: PostUsersParams) {
  const path = '/api/v1/users';
  const url = `${config.baseURL}${path}`;
  const request = await axios.post<PostUsersResponses>(url, params.body, {
    headers: config.headers,
  });
  return request.data;
}

export default createUser;
