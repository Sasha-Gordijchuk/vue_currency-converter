<template>
  <section class="exchange">
    <div class="exchange__from">
      <button class="exchange__button">USD</button>
      <button class="exchange__button">EUR</button>
      <button class="exchange__button">UAH</button>
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
      <button class="exchange__button">Add curency</button>
      <button class="exchange__button">Refrech</button>
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

  &__button {
    padding: 4px 16px;
    background-color: #e8b81c;
    text-align: center;

    border: 2px solid #141414;
    border-radius: 4px;

    cursor: pointer;

    &:hover {
      background-color: #d6aa1c;
    }
  }
}
</style>
