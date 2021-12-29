<template>
  <div role="tree">
    <ul role="group" class="tree">
      <tree-item
        v-for="(child, index) in treeData"
        :key="index"
        :data="child"
        @onContextmenu="onContextmenu"
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

// format tree child data
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

function createMenu(options: any) {
  const ul = document.createElement("ul");
  ul.style.display = "none";
  const { menus } = options;

  if (menus && menus.length > 0) {
    for (let menu of menus) {
      const li = document.createElement("li");
      li.textContent = menu.name;
      li.onclick = menu.onClick;
      ul.appendChild(li);
    }
  }
  const body = document.querySelector("body")!;
  body.appendChild(ul);
  return ul;
}

function ContextMenu(options: any) {
  // 唯一实例
  let instance: Element;

  return {
    // 获取实例的唯一方式
    getInstance: function () {
      if (!instance) {
        instance = createMenu(options);
      }
      return instance;
    },
  };
}

const menuSinglton = ContextMenu({
  menus: [
    {
      name: "custom menu 1",
      onClick: function (e: Event) {
        console.log("menu1 clicked");
      },
    },
    {
      name: "custom menu 2",
      onClick: function (e: Event) {
        console.log("menu2 clicked");
      },
    },
    {
      name: "custom menu 3",
      onClick: function (e: Event) {
        console.log("menu3 clicked");
      },
    },
  ],
});

function showMenu(e: MouseEvent) {
  menus.style.top = `${e.clientY}px`;
  menus.style.position = "absolute";
  menus.style.left = `${e.clientX}px`;
  menus.style.display = "block";
}

function onContextmenu(e: MouseEvent) {
  e.preventDefault();

  showMenu(e);
}

const menus: HTMLElement = menuSinglton.getInstance() as HTMLElement;
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

<style scoped lang="scss">
.tree {
  position: relative;
}
</style>
