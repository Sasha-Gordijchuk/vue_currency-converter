<template>
  <div class="dialog" v-if="isVisible" @click="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "MyDialog",

  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    hideDialog() {
      this.$emit("update:isVisible", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: rgba(0, 0, 0, 0.5);

  &__content {
    background-color: #e8b81c;
    border: 3px solid teal;
    border-radius: 8px;

    height: fit-content;
    width: fit-content;
  }
}
</style>
