<template>
  <div style="width: 300px; border: 1px solid #eee">
    <v-tree :data="data" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([
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
    children: [],
  },
]);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
