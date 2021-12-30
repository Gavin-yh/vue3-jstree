<template>
  <div role="tree">
    <ul role="group" class="tree">
      <tree-item
        v-for="(child, index) in treeData"
        :key="index"
        :data="child"
        :menu="menu"
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
import { ref, watch, Ref } from "vue";
import TreeItem from "./tree-item.vue";
import { TreeData, innerTreeData } from "./index";
import CreateMenu from "../util/createMenu";
import Emit from "../util/event";

let TREE_ID: number = 1;

const props = defineProps<{
  data: Array<TreeData>;
}>();

// formatted tree data
const treeData: Ref<Array<innerTreeData>> = ref([]);

// contextmenu select tree id
const targetTreeID: Ref<number> = ref(0);

//custom menu
const menu: CreateMenu = new CreateMenu([
  {
    name: "重命名",
    onClick: function (e: Event) {
      menu.hiddenMenu(e);
    },
  },
  {
    name: "删除",
    onClick: function (e: Event) {
      menu.hiddenMenu(e);
    },
  },
]);

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

// watch props.data and format
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

// create custom contextmenu
function onContextmenu(e: MouseEvent, data: innerTreeData) {
  e.preventDefault();

  // record click file`s id
  targetTreeID.value = data.id;
  menu.showMenu(e);
}

// emit event
Emit.on("contextMenu", onContextmenu);
</script>

<style lang="scss">
ul {
  padding: 0;
  margin: 0;

  li {
    list-style-type: none;
    text-align: left;
  }
}

.tree-custom-menu {
  display: none;
  position: absolute;
  font-size: 12px;
  background: #fff;
  box-shadow: 0px 1px 2px #938e8c;

  & > li {
    padding: 6px 24px;
    cursor: pointer;

    &:hover {
      background: #f5f5f5;
    }
  }

  & > li:not(:last-child) {
    border-bottom: 1px solid #d9d6d6;
  }
}
</style>

<style scoped lang="scss">
.tree {
  position: relative;
}
</style>
