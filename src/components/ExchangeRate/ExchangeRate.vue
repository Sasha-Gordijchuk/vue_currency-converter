<template>
  <section class="exchange">
    <div class="exchange__to">
      <div
        class="exchange__currency-to"
        v-for="(rate, currency) of rates"
        :key="currency"
      >
        <span class="exchange__currency-title">{{ currency }}</span>
        <span class="exchange__currency-rate">{{ rate }}</span>
      </div>
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

  &__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 8px;

    margin-bottom: 8px;
  }

  &__to {
    display: flex;
    flex-direction: column;
    max-width: 100%;

    gap: 8px;

    margin-bottom: 8px;
  }

  &__currency-to {
    display: flex;
    flex-direction: row;

    gap: 40%;

    border-bottom: 1px dashed #555;
  }

  &__currency-title {
    width: 48px;
    margin-left: 8px;
  }

  &__currency-rate {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
