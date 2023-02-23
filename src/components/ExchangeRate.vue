<template>
  <section class="exchange">
    <div class="exchange__from">
      <button class="exchange__currency-from">USD</button>
      <button class="exchange__currency-from">EUR</button>
      <button class="exchange__currency-from">UAH</button>
    </div>

    <div class="exchange__to">
      <div
        class="exchange__currency-to"
        v-for="(rate, currency) of rates"
        :key="currency"
      >
        <span class="exchange__currency-title">{{ currency }}</span>
        <span>{{ rate }}</span>
      </div>
    </div>

    <div class="exchange__buttons">
      <button>Add curency</button>
      <button>Refrech</button>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  props: {
    rates: {},
  },
};
</script>

<style lang="scss" scoped>
.exchange {
  padding: 8px;

  &__from {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 8px;

    margin-bottom: 8px;
  }

  &__currency-from {
    width: 64px;
    padding: 4px;
    background-color: cadetblue;
    text-align: center;

    border: 2px solid rebeccapurple;
    border-radius: 4px;

    cursor: pointer;

    &:hover {
      background-color: darkcyan;
    }
  }

  &__to {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: fit-content;

    gap: 8px;

    margin-bottom: 8px;
  }

  &__currency-to {
    display: flex;
    flex-direction: row;

    gap: 24vw;

    border-bottom: 1px dashed #555;
  }

  &__currency-title {
    width: 48px;
  }

  &__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>
