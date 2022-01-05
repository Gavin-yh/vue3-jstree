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
import { ref, watch, Ref, nextTick } from "vue";
import TreeItem from "./tree-item.vue";
import { TreeData, innerTreeData } from "../util/type";
import CreateMenu from "../util/createMenu";
import Emit from "../util/event";

let TREE_ID: number = 1;

const props = defineProps<{
  data: Array<TreeData>;
}>();

// formatted tree data
const treeData: Ref<Array<innerTreeData>> = ref([]);

// contextmenu select tree id
const targetTree: Ref<innerTreeData> = ref({} as innerTreeData);

// format tree child data
function formatItem(data: Array<TreeData>, anchorID: string): innerTreeData[] {
  return data.map((item) => {
    const newData = {
      id: TREE_ID++,
      anchorID,
      text: item.text || "未知文件",
      opended: item.opended || false,
      selected: item.selected || false,
      children: item.children
        ? formatItem(item.children, `${anchorID}-${TREE_ID - 1}`)
        : undefined,
      icon: item.icon || "",
      rename: item.rename || false,
    };

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
        children: item.children
          ? formatItem(item.children, `${TREE_ID - 1}`)
          : undefined,
        icon: item.icon || "",
        rename: item.rename || false,
      };
      return data;
    });
  },
  {
    deep: true,
    immediate: true,
  }
);

const dir = {
  id: TREE_ID++,
  text: "未知文件",
  opended: false,
  selected: false,
  children: [],
  icon: "",
  rename: true,
};

const file = {
  id: TREE_ID++,
  text: "未知文件",
  opended: false,
  selected: false,
  icon: "",
  rename: true,
};

function inputAutoFocus(treeID: number) {
  nextTick(() => {
    const input = document.getElementById(`${treeID}`);

    input?.focus();
  });
}

//custom menu
const menu: CreateMenu = new CreateMenu([
  {
    name: "新建目录",
    onClick: function (e: Event) {
      menu.hiddenMenu(e);

      targetTree.value.children?.push(dir);

      inputAutoFocus(dir.id);
    },
  },
  {
    name: "新建文件",
    onClick: function (e: Event) {
      menu.hiddenMenu(e);

      targetTree.value.children?.push(file);

      inputAutoFocus(file.id);
    },
  },
  {
    name: "重命名",
    onClick: function (e: Event) {
      menu.hiddenMenu(e);
      targetTree.value.rename = !targetTree.value.rename;

      inputAutoFocus(targetTree.value.id);
    },
  },
  {
    name: "删除",
    onClick: function (e: Event) {
      menu.hiddenMenu(e);

      targetTree.value.delete = !targetTree.value.delete;
    },
  },
]);

// create custom contextmenu
function onContextmenu(e: MouseEvent, data: innerTreeData) {
  e.preventDefault();

  // record click file data
  targetTree.value = data;
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
