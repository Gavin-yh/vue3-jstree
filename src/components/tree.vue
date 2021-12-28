<template>
  <div role="tree">
    <ul role="group">
      <tree-item
        v-for="(child, index) in treeData"
        :key="index"
        :data="child"
      ></tree-item>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: "VTree",
};
</script>

<script setup lang="ts">
import { computed, ref, watch, Ref } from "vue";
import TreeItem from "./tree-item.vue";
import { TreeData, innerTreeData } from "./index";

let TREE_ID: number = 1;

const props = defineProps<{
  data: Array<TreeData>;
}>();

const treeData: Ref<Array<innerTreeData>> = ref([]);

function formatItem(data: Array<TreeData>, anchorID: number) {
  return data.map((item) => {
    const newData = {
      id: TREE_ID++,
      anchorID,
      text: item.text || "未知文件",
      opended: item.opended || false,
      selected: item.selected || false,
      disabled: item.selected || false,
      children: item.children || [],
      icon: item.icon || "",
    };

    if (item.children) {
      newData.children = formatItem(item.children, anchorID);
    }

    return newData;
  });
}

watch(
  () => props.data,
  (data) => {
    treeData.value = data.map((item) => {
      const data = {
        id: TREE_ID++,
        text: item.text || "未知文件",
        opended: item.opended || false,
        selected: item.selected || false,
        disabled: item.selected || false,
        children: item.children ? formatItem(item.children, TREE_ID) : [],
        icon: item.icon || "",
      };
      return data;
    });
  },
  {
    deep: true,
    immediate: true,
  }
);
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
