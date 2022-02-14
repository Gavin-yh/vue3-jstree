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
import { findIndex } from "lodash-es";
import { ref, watch, Ref, nextTick } from "vue";
import TreeItem from "./tree-item.vue";
import { TreeData, innerTreeData } from "../util/type";
import CreateMenu from "../util/createMenu";
import Emit from "../util/event";
import { getSortData } from "../util/tool";

let TREE_ID: number = 1;

/**
 * data 数据
 * highlightCurrent 是否高亮当前选择的tree item
 * defaultExpandAll 是否全展开
 */
const props = defineProps<{
  data: Array<TreeData>;
  highlightCurrent?: boolean;
  defaultExpandAll?: boolean;
}>();

// It is used to calculate the top distance when the node is selected and display the status
const selectBarTop: Ref<number> = ref(0);
const selectBarDisplay: Ref<string> = ref("none");

// formatted tree data
const treeData: Ref<Array<innerTreeData>> = ref([]);

// contextmenu select tree id
const targetTree: Ref<innerTreeData> = ref({} as innerTreeData);

// format tree child data
function formatItem(data: Array<TreeData>, anchorID: string): innerTreeData[] {
  // To be optimized
  const newData = data.map((item) => {
    const newData = {
      id: TREE_ID++,
      anchorID,
      text: item.text || "未知文件",
      opended: props.defaultExpandAll || item.opended || false,
      selected: item.selected || false,
      children: item.children
        ? formatItem(item.children, `${anchorID}-${TREE_ID - 1}`)
        : undefined,
      rename: item.rename || false,
    };

    return newData;
  });

  return getSortData(newData);
}

// watch props.data and format
watch(
  () => props.data,
  (data) => {
    // To be optimized
    const newData = data.map((item) => {
      const data = {
        id: TREE_ID++,
        text: item.text || "未知文件",
        opended: props.defaultExpandAll || item.opended || false,
        selected: item.selected || false,
        children: item.children
          ? formatItem(item.children, `${TREE_ID - 1}`)
          : undefined,
        rename: item.rename || false,
      };
      return data;
    });

    treeData.value = getSortData(newData);
  },
  {
    deep: true,
    immediate: true,
  }
);

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
    type: "folder",
    onClick: function (e: Event) {
      const dir = {
        id: TREE_ID++,
        text: "未知文件",
        opended: false,
        selected: false,
        children: [],
        rename: true,
      };

      menu.hiddenMenu(e);

      // Insert by location
      const firstFileIndex = findIndex(
        targetTree.value.children,
        (tree) => !tree.children
      );
      targetTree.value.children?.splice(firstFileIndex, 0, dir);

      inputAutoFocus(dir.id);
    },
  },
  {
    name: "新建文件",
    type: "folder",
    onClick: function (e: Event) {
      const file = {
        id: TREE_ID++,
        text: "未知文件",
        opended: false,
        selected: false,
        rename: true,
      };

      menu.hiddenMenu(e);

      targetTree.value.children?.push(file);

      inputAutoFocus(file.id);
    },
  },
  {
    name: "重命名",
    type: "all",
    onClick: function (e: Event) {
      menu.hiddenMenu(e);
      targetTree.value.rename = !targetTree.value.rename;

      inputAutoFocus(targetTree.value.id);
    },
  },
  {
    name: "删除",
    type: "all",
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

  data.children ? menu.showMenu(e, "floder") : menu.showMenu(e, "file");
}

// toggle selectBar
function toggleSelectBar(e: any, display: string) {
  selectBarTop.value = e.target!.offsetTop;
  selectBarDisplay.value = display;
}

// emit event
Emit.on("contextMenu", onContextmenu);

// Highlight the currently selected node
if (props.highlightCurrent) {
  Emit.on("toggleSelectBar", toggleSelectBar);
}
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

  &::after {
    display: v-bind(selectBarDisplay);
    content: "";
    width: 100%;
    height: 22px;
    position: absolute;
    top: calc(v-bind(selectBarTop) * 1px);
    left: 0;
    z-index: -1;
    background: #a5a5a5;
  }
}
</style>
