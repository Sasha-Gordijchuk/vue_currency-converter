<template>
  <form class="form" @submit.prevent>
    <input
      class="form__input"
      type="text"
      placeholder="search"
      v-model="searchQuery"
    />

    <ul class="form__list" v-if="!isLoading">
      <li
        class="form__item"
        v-for="(name, symbol) in filtredSymbols"
        :key="symbol"
        :class="{ form__item__active: symbol === selectedCurrency }"
        @click="selectedCurrency = symbol"
      >
        <span>{{ symbol }} - {{ name }}</span>
      </li>
    </ul>
    <MyLoader v-else />
    <div class="form__buttons">
      <MyButton @click="addSymbol">Add</MyButton>
      <MyButton @click="refresh">Refresh</MyButton>
    </div>
  </form>
</template>

<script lang="ts">
import { getSymbols } from "@/api";
import type { Symbols } from "@/types/Symbols";
import type { PropType } from "vue";
import type { AddCurrencyFormState } from "./AddCurrencyForm.typedefs";

export default {
  data(): AddCurrencyFormState {
    return {
      isLoading: false,
      allSymbols: {},
      selectedCurrency: "",
      searchQuery: "",
    };
  },

  props: {
    symbols: {
      required: true,
      type: Array as PropType<string[]>,
    },
  },

  methods: {
    async fetchSymbols() {
      try {
        this.isLoading = true;
        const result = await getSymbols();
        return result;
      } catch (error) {
        alert(error);
      } finally {
        this.isLoading = false;
      }
    },

    async loadSymbols() {
      let result: Symbols;

      if (localStorage.getItem("allSymbols") === null) {
        result = await this.fetchSymbols();
      } else {
        result = JSON.parse(localStorage.getItem("allSymbols") || "");
      }

      const filtredResult = Object.keys(result).reduce(
        (acc: Symbols, key: string) => {
          if (!this.symbols.includes(key)) {
            acc[key] = result[key];
          }

          return acc;
        },
        {}
      );

      this.allSymbols = filtredResult;
      localStorage.setItem("allSymbols", JSON.stringify(filtredResult));
    },

    addSymbol() {
      this.$emit("add", this.selectedCurrency);
    },

    refresh() {
      localStorage.removeItem("allSymbols");
      this.loadSymbols();
    },
  },

  computed: {
    filtredSymbols() {
      const result: Symbols = {};

      const keys = Object.keys(this.allSymbols);

      keys.forEach((key: string) => {
        if (
          key.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          this.allSymbols[key]
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        ) {
          result[key] = this.allSymbols[key];
        }
      });

      return result;
    },
  },

  mounted() {
    this.loadSymbols();
  },
};
</script>

<style lang="scss" scoped>
.form {
  padding: 16px;
  min-width: 256px;
  max-width: 90vw;

  display: flex;
  flex-direction: column;
  gap: 16px;

  &__list {
    padding: 8px;
    height: 40vh;

    display: flex;
    flex-direction: column;
    gap: 4px;

    background-color: rgba(0, 0, 0, 0);
    border: 2px solid #141414;
    border-radius: 4px;

    overflow: auto;
  }

  &__input {
    width: 100%;
    padding-left: 4px;

    background-color: rgba(0, 0, 0, 0);
    border-bottom: 2px solid #141414;

    outline: none;
  }

  &__item {
    padding: 2px;
    cursor: pointer;

    border-bottom: 2px solid rgba(0, 0, 0, 0);

    &:hover {
      border-color: #141414;
    }

    &__active,
    &:active {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  &__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
  }
}
</style>
