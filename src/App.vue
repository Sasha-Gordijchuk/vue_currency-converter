<script lang="ts">
import CurrencyConverter from "./components/CurrencyConverter.vue";
import ExchangeRate from "./components/ExchangeRate.vue";
import { getCurrency } from "./api";

export default {
  components: {
    CurrencyConverter,
    ExchangeRate,
  },

  methods: {
    async handleClick() {
      const result = await getCurrency(this.symbols, "BTC");

      this.rates = result.data.rates;

      console.log(result);
      console.log(this.rates);
    },
  },

  data() {
    return {
      symbols: ["USD", "EUR", "UAH", "GBP", "BTC", "PLN"],
      rates: {
        UAH: 1.5,
        EUR: 24.457,
        USD: 1,
        PLZ: 6.21,
      },
    };
  },
};
</script>

<template>
  <div class="app">
    <div class="container">
      <CurrencyConverter :symbols="symbols" />
      <ExchangeRate :rates="rates" />
      <button @click="handleClick">click</button>
    </div>
  </div>
</template>

<style lang="scss">
.app {
  min-height: 100vh;

  padding: 16px;
  background-color: #ccc;
}

.container {
  background-color: chocolate;
  border: 3px solid teal;
  border-radius: 16px;
}
</style>
