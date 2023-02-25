<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  name: "MyButton",
};
</script>

<style lang="scss" scoped>
.button {
  padding: 4px 16px;
  background-color: rgba(0, 0, 0, 0);
  text-align: center;

  border: 2px solid #141414;
  border-radius: 4px;

  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.4);
  }
}
</style>
