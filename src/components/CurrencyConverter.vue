<template>
  <section class="converter">
    <div class="converter__select">
      <input type="number" class="converter__input" />
      <select>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="UAH">UAH</option>
      </select>
    </div>

    <div class="converter__arrow"></div>

    <div class="converter__select">
      <span class="converter__result">1234567890</span>
      <select>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="UAH">UAH</option>
      </select>
    </div>
  </section>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
.converter {
  padding: 8px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  border-bottom: 3px solid teal;

  &__select {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  &__input {
    width: 100%;
  }

  &__result {
    width: 100%;
    overflow: hidden;
  }

  &__arrow {
    margin: 0 auto;
    height: 32px;
    width: 32px;

    background-image: url(../assets/icons/two_down_arrow_icon.svg);
  }
}
</style>
