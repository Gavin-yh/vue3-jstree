<template>
  组件{{ count }}

  <p>{{ props.msg }}</p>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  msg: string;
}>();

const count = ref(0);
</script>

<style scoped lang="scss"></style>
