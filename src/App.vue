<template>
  <div style="width: 300px; border: 1px solid #eee">
    <v-tree :data="data" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { TreeData } from "./components";
import VTree from "./components/tree.vue";

const data: Ref<Array<TreeData>> = ref([
  {
    text: "文件",
    children: [
      {
        text: "文件1",
        rename: true,
        children: [
          {
            text: "文件1",
          },
          {
            text: "文本3",
            rename: true,
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
]);

console.log(VTree.name);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
