// TODO: use env vars
const BASE_URL = 'https://btc-pay.peakshift.com';

const config = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export default Object.freeze(config);
