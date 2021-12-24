<template>
  <li>
    {{ data.text }}
  </li>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TreeData } from "./index";

const props = defineProps<{
  data: TreeData;
}>();

const count = ref(0);
</script>

<style scoped lang="scss"></style>
