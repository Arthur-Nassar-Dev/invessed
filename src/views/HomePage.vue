<script setup lang="ts">
import { useAppStore } from '../store'
import StockTable from '../components/StockTable.vue'
import AddStocks from '../components/AddStocks.vue'
import dataService from '../utils/services/dataService'

const store = useAppStore()
const changeCurrencyRate = () => {
  dataService.getExchangeRates(store.selectedCurrency).then(res => {
    store.exchangeRate = +res['Realtime Currency Exchange Rate']['5. Exchange Rate']
  })
}
</script>

<template>
  <div class="home border-2 p-5 rounded-md border-slate-400 bg-white">
    <div class="home-header flex justify-between align-center">
      <h1 class="font-semibold text-xl">
        Vue portfolio
      </h1>

      <select 
        id="currencyPrice"
        v-model="store.selectedCurrency" 
        name="currencyPrice"
        class="border-0 focus:outline-0 focus:ring-0"
        @change="changeCurrencyRate"
      >
        <option
          v-for="currency in store.currencyOptions"
          :key="currency"
          :value="currency"
        >
          {{ currency }}
        </option>
      </select>
    </div>
    <StockTable v-if="store.computedStockInfo.length" />
    <p v-else>
      You don't have stocks yet <br> Add new stocks by searching on the section below
    </p>
    <hr class="my-5">
    <AddStocks />
  </div>
</template>

