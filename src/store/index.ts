import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { StockInfo } from '../utils/types'

export const useAppStore = defineStore('appStore', () => {
  const currencyOptions = ref(['EUR', 'BRL', 'USD'])
  const selectedCurrency = ref('USD')
  const exchangeRate = ref<number>(1)
  const stocks = ref<string[]>([])
  const stockInfo = ref<StockInfo[]>([])
  const stockQuantity = ref<{
    [key: string]: number
  }>({})
  
  const computedStockInfo = computed(() => {
    return stockInfo.value.map(item => {
      const newItem = {...item}
      newItem['05. price'] = ((+item['05. price'] * exchangeRate.value).toFixed(2))
      const itemTotal = (item.quantity || 0) * (+item['05. price'])
      return {
        ...newItem,
        total: itemTotal,
      }
    })
  })
  
  const stocksTotalSum = computed(() => {
    return computedStockInfo.value.reduce((acc, item) => {
      return acc += item.total
      
    }, 0).toFixed(2)
  })

  return { currencyOptions, stocksTotalSum, exchangeRate, selectedCurrency, computedStockInfo, stockQuantity ,stocks, stockInfo }
})
// HRM
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}

export default useAppStore