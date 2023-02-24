<template>
  <section class="converter">
    <div class="converter__wrapper">
      <input
        type="number"
        class="converter__input"
        v-model="inputValue"
        @input="convert(false)"
      />
      <select
        v-model="currencyFrom"
        @change="getRates"
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
        type="number"
        class="converter__result"
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
import { getRates } from "@/api";
import { defineComponent, type PropType } from "vue";
import type { CurrencyConverterState } from "./CorrencyConverter.typedefs";
import MyLoader from "../MyLoader.vue";
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

  components: {
    MyLoader,
  },

  methods: {
    convert(isReverse: boolean) {
      if (isReverse) {
        this.inputValue = +this.resultValue / this.currentRate;
      } else {
        this.resultValue = +this.inputValue * this.currentRate;
      }
    },

    async getRates() {
      try {
        this.isRatesLoading = true;
        const result = await getRates(this.symbols, this.currencyFrom);
        this.newRates = result;
        this.changeCurrentRate();
      } catch (error) {
        alert(error);
      } finally {
        this.isRatesLoading = false;
      }
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

  border-bottom: 3px solid teal;

  &__wrapper {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  &__select {
    width: max-content;
  }

  &__input {
    width: 100%;
  }

  &__result {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__arrow {
    margin: 0 auto;
    height: 32px;
    width: 32px;

    background-image: url(../../assets/icons/two_down_arrow_icon.svg);
  }
}
</style>
