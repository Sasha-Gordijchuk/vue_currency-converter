<template>
  <section class="exchange">
    <div class="exchange__from">
      <div class="exchange__currency-from">USD</div>
      <div class="exchange__currency-from">EUR</div>
      <div class="exchange__currency-from">UAH</div>
    </div>

    <div class="exchange__to">
      <div class="exchange__currency-to">
        <span>USD</span>
        <span>123</span>
        <span>456</span>
      </div>
      <div class="exchange__currency-to">
        <span>USD</span>
        <span>123</span>
        <span>456</span>
      </div>
      <div class="exchange__currency-to">
        <span>USD</span>
        <span>123</span>
        <span>456</span>
      </div>
      <div class="exchange__currency-to">
        <span>USD</span>
        <span>123</span>
        <span>456</span>
      </div>
      <div class="exchange__currency-to">
        <span>USD</span>
        <span>123</span>
        <span>456</span>
      </div>
    </div>

    <div class="exchange__buttons">
      <button>Add curency</button>
      <button>Refrech</button>
    </div>
  </section>
</template>

<script lang="ts">
export default {};
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

    border: 2px solid rebeccapurple;
    border-radius: 4px;

    text-align: center;
  }

  &__to {
    display: flex;
    flex-direction: column;
    gap: 8px;

    margin-bottom: 8px;
  }

  &__currency-to {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  &__buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>
