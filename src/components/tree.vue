<template>
  <div role="tree">
    <ul role="group">
      <tree-item v-for="(child, index) in data" :key="index" :data="child">
        <slot>
          <i role="presentation"></i>
        </slot>
      </tree-item>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: "VTree",
};
</script>

<script setup lang="ts">
import { ref } from "vue";
import TreeItem from "./tree-item.vue";
import { TreeData } from "./index";

const props = defineProps<{
  data: Array<TreeData>;
}>();

const count = ref(0);
</script>

<style scoped lang="scss"></style>
