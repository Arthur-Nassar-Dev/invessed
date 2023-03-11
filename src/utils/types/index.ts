export interface StocksResponseData {
  bestMatches: BestMatches[]
}

export interface BestMatches {
  '1. symbol': string,
  '2. name': string,
  '3. type': string,
  '4. region': string,
  '5. marketOpen': string,
  '6. marketClose': string,
  '7. timezone': string,
  '8. currency': string,
  '9. matchScore': string
}

export interface StockInfo {
  '01. symbol': string
  '02. open': string
  '03. high': string
  '04. low': string
  '05. price': string
  '06. volume': string
  '07. latest trading day': string
  '08. previous close': string
  '09. change': string
  '10. change percent': string,
  quantity?: number
}

export interface StockInfoResponse {
  'Global Quote': StockInfo
}

export enum CurrencyTypes {
  'EUR' = '€',
  'BRL' = 'R$',
  'USD' = 'U$'
}

export interface ExchangeRatesResponse {
  'Realtime Currency Exchange Rate': ExchangeRatesData
}

export interface ExchangeRatesData {
  '1. From_Currency Code': string,
  '2. From_Currency Name': string,
  '3. To_Currency Code': string,
  '4. To_Currency Name': string,
  '5. Exchange Rate': string,
  '6. Last Refreshed': string,
  '7. Time Zone': string,
  '8. Bid Price': string,
  '9. Ask Price': string
}