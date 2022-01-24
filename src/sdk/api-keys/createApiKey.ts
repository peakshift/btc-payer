import axios, {AxiosRequestConfig} from 'axios';
import {paths} from '@app/sdk/openapi';

export type ApiKeysPath = paths['/api/v1/api-keys'];
export type PostApiKeysResource = ApiKeysPath['post'];
export type PostApiKeysParams = {
  body: PostApiKeysResource['requestBody']['content']['application/json'];
};
export type PostApiKeysResponses =
  PostApiKeysResource['responses']['200']['content']['application/json'];
export const API_KEY_PATH = '/api/v1/api-keys';

async function createApiKey(
  params: PostApiKeysParams,
  config: AxiosRequestConfig<PostApiKeysParams['body']>,
) {
  const path = '/api/v1/api-keys';
  const url = `${config.baseURL}${path}`;
  const request = await axios.post<PostApiKeysResponses>(
    url,
    params.body,
    config,
  );
  return request.data;
}

export default createApiKey;
