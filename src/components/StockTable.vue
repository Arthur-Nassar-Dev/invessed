<script setup lang="ts">
import QuantityInput from './QuantityInput.vue';
import ProgressBar from './ProgressBar.vue';
import useAppStore from '../store';
import { CurrencyTypes} from '../utils/types/index'

const store = useAppStore()
const CurrencyTypesEnum: any = CurrencyTypes
const getProgress = (stockPrice: number, stocksTotalSum: number): string => {
  return ((stockPrice * 100) / stocksTotalSum).toFixed(0)
}

</script>
<template>
  <table class="table-auto border-collapse border-0 w-full text-left">
  <thead>
    <tr>
      <th>Stock</th>
      <th>Price</th>
      <th class="width-180">Quantity</th>
      <th>Value</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="stock in store.computedStockInfo" class="h-16">
      <td>{{stock['01. symbol']}}</td>
      <td>{{CurrencyTypesEnum[store.selectedCurrency]}} {{ stock['05. price'] }}</td>
      <td><QuantityInput :stock="stock" /></td>
      <td>{{CurrencyTypesEnum[store.selectedCurrency]}} {{ stock.total }}</td>
      <td class="w-2/5"><ProgressBar :progress="getProgress(stock.total, +store.stocksTotalSum)"/></td>
    </tr>
    <tr v-if="store.stockInfo.length">
      <td class="font-bold">Total</td>
      <td></td>
      <td></td>
      <td class="font-bold">{{CurrencyTypesEnum[store.selectedCurrency]}} {{ store.stocksTotalSum }}</td>
      <td></td>
    </tr>
  </tbody>
</table>

</template>

<style scoped>
.witdh-180 {
  width: 180px;
}


</style>