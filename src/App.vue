<script lang="ts">
import CurrencyConverter from "./components/CurrencyConverter.vue";
import ExchangeRate from "./components/ExchangeRate.vue";

export default {
  components: {
    CurrencyConverter,
    ExchangeRate,
  },
};
</script>

<template>
  <div class="app">
    <div class="container">
      <CurrencyConverter />
      <ExchangeRate />
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
