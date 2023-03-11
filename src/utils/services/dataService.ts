import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ExchangeRatesResponse, StockInfoResponse, StocksResponseData } from '../types'

class DataService {
  private static instance: DataService
  private readonly axiosInstance: AxiosInstance
  private readonly apiKey: string

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://www.alphavantage.co/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    this.apiKey = import.meta.env.VITE_API_KEY as string
  }

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService()
    }
    return DataService.instance
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config)
    return response.data
  }


  public async searchStocks(
    keywords: string,
    functionName = 'SYMBOL_SEARCH',
  ): Promise<StocksResponseData> {
    const response = await this.get<StocksResponseData>('/query', {
      params: {
        function: functionName,
        keywords: keywords,
        apikey: this.apiKey,
      },
    })
    return response
  }

  public async getStockPrice(
    symbol = 'IBM',
  ): Promise<StockInfoResponse> {
    const response = await this.get<StockInfoResponse>('/query', {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol,
        apikey: this.apiKey,
      },
    })
    return response
  }
 
  public async getExchangeRates(
    to: string,
  ): Promise<ExchangeRatesResponse> {
    const response = await this.get<ExchangeRatesResponse>('/query', {
      params: {
        function: 'CURRENCY_EXCHANGE_RATE',
        from_currency: 'USD',
        to_currency: to,
        apikey: this.apiKey,
      },
    })
    return response
  }
}

export default DataService.getInstance()
