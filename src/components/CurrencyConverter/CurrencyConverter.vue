<template>
  <section class="converter">
    <div class="converter__wrapper">
      <input
        class="converter__input"
        v-model="inputValue"
        @input="convert(false)"
      />
      <select
        v-model="currencyFrom"
        @change="($event) => changeRates($event)"
        class="converter__select"
      >
        <option v-for="symbol of symbols" :key="symbol" :value="symbol">
          {{ symbol }}
        </option>
      </select>
    </div>

    <div class="converter__arrow" v-if="!isRatesLoading"></div>
    <MyLoader v-else />

    <div class="converter__wrapper">
      <input
        class="converter__input"
        v-model="resultValue"
        @input="convert(true)"
      />
      <select
        @change="changeCurrentRate"
        v-model="currencyTo"
        class="converter__select"
      >
        <option v-for="symbol of symbols" :key="symbol" :value="symbol">
          {{ symbol }}
        </option>
      </select>
    </div>
  </section>
</template>

<script lang="ts">
import Decimal from "decimal.js";
import { getRates } from "@/api";
import { defineComponent, type PropType } from "vue";
import type { CurrencyConverterState } from "./CorrencyConverter.typedefs";
import type { Rates } from "@/types/Rates";

export default defineComponent({
  data(): CurrencyConverterState {
    return {
      newRates: {},
      inputValue: 0,
      currencyFrom: "USD",
      currencyTo: "BTC",
      resultValue: 0,
      currentRate: 0,
      isRatesLoading: false,
    };
  },
  props: {
    rates: {
      required: true,
      type: Object as PropType<Rates>,
    },
    symbols: {
      required: true,
      type: Array as PropType<string[]>,
    },
  },

  methods: {
    convert(isReverse: boolean) {
      const decInputValue = new Decimal(this.inputValue || 0);
      const decCurrentRate = new Decimal(this.currentRate || 0);
      const decResultValue = new Decimal(this.resultValue || 0);
      const decUSDRateFrom = new Decimal(
        this.getRate("USD", this.currencyFrom) || 0
      );
      const decUSDRateTo = new Decimal(
        this.getRate("USD", this.currencyTo) || 0
      );

      if (isReverse) {
        if (+decResultValue.div(decUSDRateTo) > 10000) {
          this.normalize(decUSDRateFrom, decUSDRateTo);
        } else {
          this.inputValue = +decResultValue.div(decCurrentRate);
        }
      } else {
        if (+decInputValue.div(decUSDRateFrom) > 10000) {
          this.normalize(decUSDRateFrom, decUSDRateTo);
        } else {
          this.resultValue = +decInputValue.times(decCurrentRate);
        }
      }
    },

    normalize(from: Decimal, to: Decimal) {
      this.inputValue = +from.times("10000");
      this.resultValue = +to.times("10000");
    },

    async getRates(base: string) {
      try {
        this.isRatesLoading = true;
        const result = await getRates(this.symbols, base);
        this.newRates = result;
      } catch (error) {
        alert(error);
      } finally {
        this.isRatesLoading = false;
      }
    },

    async changeRates(event: Event) {
      let tempCurrentCurrency;

      if (event.target) {
        tempCurrentCurrency = (event.target as HTMLSelectElement).value;

        if (localStorage.getItem(tempCurrentCurrency) === null) {
          await this.getRates(tempCurrentCurrency);

          localStorage.setItem(
            tempCurrentCurrency,
            JSON.stringify(this.newRates)
          );
        } else {
          this.newRates = JSON.parse(
            localStorage.getItem(tempCurrentCurrency) || ""
          );
        }
      }

      this.changeCurrentRate();
    },

    getRate(from: string, to: string) {
      const rate: Rates = JSON.parse(localStorage.getItem(from) || "");

      return rate[to];
    },

    changeCurrentRate() {
      this.currentRate = this.newRates[this.currencyTo];
      this.convert(false);
    },
  },

  mounted() {
    this.newRates = this.rates;
    this.changeCurrentRate();
  },
});
</script>

<style lang="scss" scoped>
.converter {
  padding: 8px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  &__wrapper {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  &__select {
    width: max-content;

    padding: 4px;
    background-color: rgba(0, 0, 0, 0);
    border: 2px solid #141414;
    border-radius: 4px;

    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }

  &__input {
    width: 100%;

    padding: 4px;
    background-color: rgba(0, 0, 0, 0);
    border: 2px solid #141414;
    border-radius: 4px;

    outline: none;
  }

  &__arrow {
    margin: 0 auto;
    height: 32px;
    width: 32px;

    background-image: url(../../assets/icons/two_down_arrow_icon.svg);
  }
}
</style>
