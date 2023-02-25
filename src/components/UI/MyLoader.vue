<template>
  <div class="loader"></div>
</template>

<script lang="ts">
export default {
  name: "MyLoader",
};
</script>

<style scoped>
.loader {
  margin: auto;

  width: 32px;
  height: 32px;
  border: 3px solid black;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
