// TODO: since this information will be managed by
// the user ON THE FLIGHT it must be stored in the DB
// Keeping it here in the meantime.
const BASE_URL = 'https://btc-pay.peakshift.com';
const SECRET_TOKEN = '33ca1075fe5b0ee795c3481486be35df98f37ac2';

const config = {
  baseURL: BASE_URL,
  headers: {
    Authorization: `token ${SECRET_TOKEN}`,
    'Content-Type': 'application/json',
  },
};

export default Object.freeze(config);
