<template>
  <div role="tree">
    <ul role="group">
      <tree-item
        v-for="(child, index) in newTreeData"
        :key="index"
        :data="child"
      >
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
import { computed, ref } from "vue";
import TreeItem from "./tree-item.vue";
import { TreeData } from "./index";

const props = defineProps<{
  data: Array<TreeData>;
}>();

const newTreeData = computed(() => {
  return props.data.map((item) => {
    return {
      id: new Date().getDate(),
      text: item.text || "未知文件",
      opended: item.opended || false,
      selected: item.selected || false,
      disabled: item.selected || false,
      children: item.children || [],
      icon: item.icon || "",
    };
  });
});

const count = ref(0);
</script>

<style>
ul {
  padding: 0;
  margin: 0;
}

ul li {
  list-style-type: none;
  text-align: left;
}
</style>

<style scoped lang="scss"></style>
