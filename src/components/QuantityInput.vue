<script setup lang="ts">
import { computed } from 'vue'
import useAppStore from '../store'
import { StockInfo } from '../utils/types'

const props = defineProps<{
  stock: StockInfo
}>()

const store = useAppStore()

const stock = computed({
  get(): number {
    return props.stock.quantity as number
  },
  set(value: number | StockInfo) {
    const index = store.stockInfo.findIndex(item => props.stock['01. symbol'] === item['01. symbol'])
    if(typeof value === 'number') store.stockInfo[index].quantity = value   
  },
})

const clearInput = () => {
  delete store.stockQuantity[props.stock['01. symbol']]
  const stockInfoIndex = store.stockInfo.findIndex(item => item['01. symbol'] === props.stock['01. symbol'])
  store.stockInfo.splice(stockInfoIndex, 1)
  store.stocks.splice(store.stocks.indexOf(props.stock['01. symbol']), 1)
}
</script>
     
<template>
  <div class="quantity-input relative">
    <input

      v-model="stock"
      type="text"
      class="border border-gray-300 rounded-lg py-2 pl-2 pr-10 w-full focus:outline-0 focus:ring-0 focus:border-gray-600"
      placeholder="Type something here"
    >
    <div class="absolute inset-y-0 right-0 flex items-center pr-2">
      <img
        width="15"
        src="trashBin.svg"
        alt="trash bin icon"
        @click="clearInput"
      >
    </div>
  </div>
</template>

<style scoped >
.quantity-input {
  width: 140px
}
</style>