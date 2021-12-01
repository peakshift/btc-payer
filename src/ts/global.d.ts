interface INodeInformation {
  // The height of the chain of header of the internal full node
  headers: number;
  // The height of the latest validated block of the internal full node
  blocks: number;
  // The current synchronization progress
  verificationProgress: number;
}

interface ISyncStatus {
  // The CryptoCode of the crypto currency (default. BTC)
  cryptoCode: string;
  // Detailed sync status of the internal full node
  nodeInformation: INodeInformation;
  // The height of the chain of header of the internal indexer
  chainHeight: number;
  // The height of the latest indexed block of the internal indexer
  syncHeight: number;
}

interface IWalletInfo {
  // BTCPay Server version
  version: string;
  // The Tor hostname
  onion: string;
  // The payment methods this wallet supports
  supportedPaymentMethods: Array<string>;
  // True if the wallet is fully synchronized, according to NBXplorer
  fullySynched: boolean;
  // Application Server Info Sync StatusData
  syncStatus: Array<ISyncStatus>;
}

interface IUser {
  token: string;
  userId: string;
}

interface IPaymentRequestDetails {
  bolt11: string;
  bip21?: string;
  address?: string;
}

interface IDecodedInvoice {
  //  chain_address?: string;
  //  cltv_delta: number;
  //  created_at: string;
  description?: string;
  description_hash?: string;
  //  destination: string;
  expires_at: string;
  //  features: {
  //    bit: number;
  //    is_required: boolean;
  //    type: string;
  //  }[];
  //  id: string;
  is_expired: boolean;
  //  mtokens: string;
  network: string;
  //  payment?: string;
  //  routes?: {
  //    base_fee_mtokens?: string;
  //    channel?: string;
  //    cltv_delta?: number;
  //    fee_rate?: number;
  //    public_key: string;
  //  };
  //  safe_tokens: number;
  //  tokens: number;
}

interface IConnectorConfig {
  domain: string;
  apiKey: string;
  currentAccount: string;
}

interface IPaidInvoice {
  preimage: string;
}

interface IAccount {
  id: string;
}

interface IBTCPayServer {
  config: IConnectorConfig;
  authorized(): Promise<IUser>;
  getInfo(): IWalletInfo;
  setAccount(accountId: string): string;
  getAccounts(): Array<IAccount>;
  getBalance(): Promise<string>;
  getInvoices(): Promise<Array<IPaymentRequestDetails>>;
  makeInvoice(): Promise<IDecodedInvoice>;
  sendPayment(): Promise<boolean>;
}
