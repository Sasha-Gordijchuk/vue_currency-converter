<template>
  <div class="page">
    <div class="app">
      <MyDialog v-model:isVisible="formIsVisible">
        <AddCurrencyForm :symbols="symbols" @add="addSymbol" />
      </MyDialog>
      <div class="container" v-if="!isLoading">
        <CurrencyConverter :rates="rates" :symbols="symbols" />
        <ExchangeRate :rates="rates" />
      </div>
      <MyLoader v-else />
      <div class="app__buttons">
        <MyButton @click="showForm">Add curency</MyButton>
        <MyButton @click="refresh">Refrech</MyButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter.vue";
import ExchangeRate from "./components/ExchangeRate/ExchangeRate.vue";
import AddCurrencyForm from "./components/AddCurrencyForm/AddCurrencyForm.vue";
import { getRates } from "./api";
import { defineComponent } from "vue";
import type { Rates } from "./types/Rates";

export default defineComponent({
  components: {
    CurrencyConverter,
    ExchangeRate,
    AddCurrencyForm,
  },

  data(): {
    symbols: string[];
    rates: Rates;
    isLoading: boolean;
    formIsVisible: boolean;
  } {
    return {
      symbols: [],
      rates: {},
      isLoading: false,
      formIsVisible: false,
    };
  },

  methods: {
    async fetchRates(base: string) {
      try {
        this.isLoading = true;
        const result = await getRates(this.symbols, base);
        this.rates = result;

        localStorage.setItem("USD", JSON.stringify(result));
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

    addSymbol(symbol: string) {
      const localSymbols = JSON.parse(localStorage.getItem("symbols") || "");

      localSymbols.push(symbol);
      localStorage.setItem("symbols", JSON.stringify(localSymbols));

      this.symbols = localSymbols;
      this.formIsVisible = false;
      this.fetchRates("USD");
    },

    refresh() {
      this.fetchRates("USD");
    },

    showForm() {
      this.formIsVisible = true;
    },
  },

  mounted() {
    this.getSymbols();
    this.fetchRates("USD");
  },
});
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  min-width: 320px;

  padding: 16px;
  background-color: #ccc;
}

.app {
  min-height: 256px;
  padding: 8px;

  background-color: #e8b81c;
  border: 3px solid teal;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;

  &__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
  }
}
</style>
