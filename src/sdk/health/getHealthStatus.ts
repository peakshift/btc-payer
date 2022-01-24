import axios from 'axios';
import {paths} from '@app/sdk/openapi';

export type HealthPath = paths['/api/v1/health'];
export type GetHealthResource = HealthPath['get'];
export type GetHealthResponse =
  GetHealthResource['responses']['200']['content']['application/json'];
export const HEALTH_PATH = '/api/v1/health';

async function getHealth() {
  const path = HEALTH_PATH;
  const request = await axios.get<GetHealthResponse>(path);
  return request.data;
}

export default getHealth;
