<template>
  <section class="converter">
    <div class="converter__wrapper">
      <input type="number" class="converter__input" />
      <select class="converter__select">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="UAH">UAH</option>
      </select>
    </div>

    <div class="converter__arrow"></div>

    <div class="converter__wrapper">
      <span class="converter__result" title="asd">1234567890</span>
      <select class="converter__select">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="UAH">UAH</option>
      </select>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  props: {
    currencies: {
      type: Array,
    },
  },
};
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

    background-image: url(../assets/icons/two_down_arrow_icon.svg);
  }
}
</style>
