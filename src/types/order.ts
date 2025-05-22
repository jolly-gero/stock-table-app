export interface OrderDetail {
  netAmount: number;
  currencyUnit: string;
  exchangeRate: number;
  referenceNumber: string;
  date: string;
  telephone: string;
  userId: string;
}

export interface Order {
  account: string;
  operation: string;
  symbol: string;
  description: string;
  quantity: number;
  filledQty: number;
  price: number;
  status: string;
  date: string;
  expiration: string;
  noRef: string;
  externalRef: string;
  detail: OrderDetail;
}
