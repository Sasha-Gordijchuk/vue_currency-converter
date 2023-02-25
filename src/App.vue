<script lang="ts">
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter.vue";
import ExchangeRate from "./components/ExchangeRate/ExchangeRate.vue";
import { getRates } from "./api";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    CurrencyConverter,
    ExchangeRate,
  },

  data() {
    return {
      symbols: [],
      rates: {},
      isLoading: false,
    };
  },

  methods: {
    async fetchRates(base: string) {
      try {
        this.isLoading = true;
        const result = await getRates(this.symbols, base);
        this.rates = result;
      } catch (error) {
        alert(error);
      } finally {
        this.isLoading = false;
      }
    },

    getSymbols() {
      if (localStorage.getItem("symbols") === null) {
        localStorage.setItem(
          "symbols",
          JSON.stringify(["USD", "EUR", "UAH", "GBP", "BTC", "PLN"])
        );
      }

      this.symbols = JSON.parse(localStorage.getItem("symbols") || "");
    },
  },

  mounted() {
    this.getSymbols();
    this.fetchRates("USD");
  },
});
</script>

<template>
  <div class="app">
    <div class="container">
      <CurrencyConverter v-if="!isLoading" :rates="rates" :symbols="symbols" />
      <ExchangeRate v-if="!isLoading" :rates="rates" />
      <MyLoader v-else />
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
  min-height: 256px;

  background-color: #e8b81c;
  border: 3px solid teal;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
