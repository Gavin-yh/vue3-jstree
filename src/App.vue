<template>
  <div style="width: 100%; border: 1px solid #eee">
    <v-tree :data="data" highlight-current default-expand-all />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { TreeData } from "./util/type";
import VTree from "./components/tree.vue";

const data: Ref<Array<TreeData>> = ref([
  {
    text: "文件",
    children: [
      {
        text: "文件1",
        children: [
          {
            text: "文件1",
          },
          {
            text: "文本3",
            children: [
              {
                text: "文件1",
              },
              {
                text: "文本3",
              },
            ],
          },
        ],
      },
      {
        text: "文件3",
      },
      {
        text: "文件3",
      },
    ],
  },
  {
    text: "文件",
    children: [
      {
        text: "文件1",
        children: [
          {
            text: "文件1",
          },
        ],
      },
    ],
  },
  {
    text: "文件",
  },
  {
    text: "文件",
    children: [],
  },
]);

console.log(VTree.name);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
