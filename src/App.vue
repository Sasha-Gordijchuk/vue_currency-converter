<template>
  <div class="page">
    <div class="app">
      <MyDialog v-model:isVisible="formIsVisible">
        <AddCurrencyForm :symbols="symbols" @add="addSymbol" />
      </MyDialog>
      <div class="container" v-if="!isLoading">
        <CurrencyConverter :rates="rates" :symbols="symbols" />

        <div class="app__buttons">
          <MyButton
            v-for="currSymbol of ['USD', 'EUR', 'UAH']"
            :key="currSymbol"
            :class="{ button__active: selectedRates === currSymbol }"
            @click="changeVisibleRates(currSymbol)"
          >
            {{ currSymbol }}
          </MyButton>
        </div>

        <ExchangeRate :rates="rates" :selectedRates="selectedRates" />
        <div class="app__buttons">
          <MyButton @click="showForm">Add currency</MyButton>

          <MyButton :disabled="isRefreshingDisabled" @click="refresh">
            Refrech
          </MyButton>
        </div>
      </div>
      <MyLoader v-else />
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
    isRefreshingDisabled: boolean;
    selectedRates: string;
  } {
    return {
      symbols: [],
      rates: {},
      isLoading: false,
      formIsVisible: false,
      isRefreshingDisabled: false,
      selectedRates: "USD",
    };
  },

  methods: {
    async fetchRates(base: string) {
      try {
        this.isLoading = true;
        const result = await getRates(this.symbols, base);
        this.rates = result;

        localStorage.setItem(base, JSON.stringify(result));
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
      this.fetchRates(this.selectedRates);
    },

    changeVisibleRates(base: string) {
      this.selectedRates = base;

      this.fetchRates(base);
    },

    refresh() {
      const tempSymbols = localStorage.getItem("symbols");
      const tempAllSymbols = localStorage.getItem("allSymbols");

      localStorage.clear();

      localStorage.setItem("symbols", tempSymbols || "");
      localStorage.setItem("allSymbols", tempAllSymbols || "");
      this.fetchRates(this.selectedRates);

      this.isRefreshingDisabled = true;

      setTimeout(() => {
        this.isRefreshingDisabled = false;
      }, 5000);
    },

    showForm() {
      this.formIsVisible = true;
    },
  },

  mounted() {
    this.getSymbols();
    this.fetchRates(this.selectedRates);
  },
});
</script>

<style lang="scss">
@import "@/assets/main.scss";

.page {
  min-height: 100vh;
  min-width: 320px;

  padding: 16px;
  background-color: #ccc;

  @include onTablet {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @include onDesktop {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.app {
  min-height: 256px;
  min-width: 312px;

  padding: 8px;

  @include onTablet {
    max-width: fit-content;
  }

  @include onDesktop {
    max-width: fit-content;
  }

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

.container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
