interface IWalletInfo {}

interface IUser {
  token: string;
  userId: string;
}

interface IPaymentRequestDetails {
  chain_address?: string;
  cltv_delta: number;
  created_at: string;
  description?: string;
  description_hash?: string;
  destination: string;
  expires_at: string;
  features: {
    bit: number;
    is_required: boolean;
    type: string;
  }[];
  id: string;
  is_expired: boolean;
  mtokens: string;
  network: string;
  payment?: string;
  routes?: {
    base_fee_mtokens?: string;
    channel?: string;
    cltv_delta?: number;
    fee_rate?: number;
    public_key: string;
  };
  safe_tokens: number;
  tokens: number;
}

interface IConnectorConfig {
  domain: string;
}

interface IPaidInvoice {
  preimage: string;
}

interface IBTCPayServer {
  config: IConnectorConfig;
  authorized(): Promise<IUser>;
  getInfo(): IWalletInfo;
  makeInvoice(): Promise<IPaymentRequestDetails>;
  sendPayment(): Promise<boolean>;
  getBalance(): Promise<string>;
  getInvoices(): Promise<Array<IPaymentRequestDetails>>
}
