// TODO: use env vars
const BASE_URL = 'https://btc-pay.peakshift.com/api/v1';

const config = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export default Object.freeze(config);
