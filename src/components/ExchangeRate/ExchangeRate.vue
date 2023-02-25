<template>
  <section class="exchange">
    <div class="exchange__from">
      <MyButton>USD</MyButton>
      <MyButton>EUR</MyButton>
      <MyButton>UAH</MyButton>
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
      <MyButton>Add curency</MyButton>
      <MyButton>Refrech</MyButton>
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

  border-top: 3px solid teal;

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
}
</style>
