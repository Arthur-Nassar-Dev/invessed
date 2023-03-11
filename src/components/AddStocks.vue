<script setup lang="ts">
import { computed, ref } from 'vue'
import useAppStore from '../store'
import dataService from '../utils/services/dataService' 
import { BestMatches } from '../utils/types'

const store = useAppStore()
const searchedStocks = ref<BestMatches[] | []>([])
const filteredStocks = computed(() => searchedStocks.value.filter(stock => !store.stocks.includes(stock['1. symbol'])))
const searchQuery = ref('')

const getStocks = () => {
  dataService.searchStocks(searchQuery.value).then(res => {
    searchedStocks.value = res.bestMatches
  })
}

const addStock = (symbol: string) => {
  if(store.stocks.includes(symbol)) return
  dataService.getStockPrice(symbol).then(res => {
    res['Global Quote'].quantity = 0
    store.stockInfo.push(res['Global Quote'])
  })
  store.stocks.push(symbol)
}
</script>

<template>
  <div class="flex space-x-6">
    <div class="flex-shrink-0 flex items-start pt-1 text-lg font-medium text-gray-800">
      <p>Add Stock</p>
    </div>
    <div class="w-full flex flex-col">
      <div class="relative flex-1">
        <input
          v-model="searchQuery"
          type="text"
          class="w-full focus:outline-0 focus:ring-0 py-2 pl-4 pr-10 text-gray-800 placeholder-gray-400 border rounded-[0.8rem] focus:outline-none focus:ring-1 focus:ring-slate-500"
          placeholder="Search Stock"
          @change="getStocks"
        >
        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
          <img
            src="/searchIcon.svg"
            alt="search icon"
            width="20"
          >
        </div>
      </div>
      <div class="searched-stocks-container pt-4">
        <div
          v-for="stock in filteredStocks"
          :key="stock['1. symbol']"
        >
          <div class="pl-4 py-2 flex">
            <img
              src="/addIcon.svg"
              alt="add icon"
              width="20"
              class="mr-4 cursor-pointer"
              @click="addStock(stock['1. symbol'])"
            >
            <p class="text-slate-400">
              {{ stock['2. name'] }}: {{ stock['1. symbol'] }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="text"] {
  border-color: #a3a3a3;
}
</style>
