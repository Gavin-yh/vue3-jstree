<template>
  <li
    class="tree-node"
    v-if="!props.data.delete"
    :class="{
      'is-opend': props.data?.opended,
      'is-close': !props.data?.opended,
    }"
    role="treeitem"
    @click.stop="(e) => onNodeCLick(e, props.data)"
    @mouseover.stop="props.data.isHover = !props.data.isHover"
    @mouseout.stop="props.data.isHover = !props.data.isHover"
    @contextmenu.stop="(e) => onContextmenu(e)"
  >
    <div
      role="presentation"
      class="tree-node__background"
      v-if="props.data.isHover"
    ></div>
    <i
      :class="{
        'tree-anchor': isFolder,
        'tree-node__icon': isFolder,
      }"
      role="presentation"
    ></i>

    <div
      :class="{
        'tree-anchor': true,
        'tree-selected': props.data?.selected,
      }"
    >
      <i
        class="tree-node__icon"
        :class="{
          'no-filder': !isFolder,
        }"
        role="presentation"
      ></i>
      <span v-if="!data.rename">{{ data.text }}</span>
      <input
        v-else
        :id="props.data.id + ''"
        class="tree-node__input"
        type="text"
        :value="data.text"
        @input="(e) => onRename(e, props.data)"
        @blur="(e) => onBlur(e, props.data)"
        @click.stop="(e) => {}"
      />
    </div>

    <ul role="group" ref="group" class="tree-node__children" v-if="isFolder">
      <tree-item
        v-for="(child, index) in props.data?.children"
        :key="index"
        :data="child"
        :menu="props.menu"
        @iconClick="props.data.opended = !props.data.opended"
      >
      </tree-item>
    </ul>
  </li>
</template>

<script lang="ts">
export default {
  name: "VTreeItem",
};
</script>

<script setup lang="ts">
import { computed, Ref, ref } from "vue";
import { isEmpty, isEqual } from "lodash-es";
import { innerTreeData } from "../util/type";
import CreateMenu from "../util/createMenu";
import Emit from "../util/event";

const props = defineProps<{
  data: innerTreeData;
  menu: CreateMenu;
}>();

const emit = defineEmits([""]);

// record previous node
const prevNode: Ref<innerTreeData> = ref({} as innerTreeData);

// record select node
const selectNode: Ref<innerTreeData> = ref({} as innerTreeData);

const isFolder = computed(() => {
  return props.data.children;
});

function onNodeCLick(e: MouseEvent, data: innerTreeData) {
  data.opended = !data.opended;

  if (!isEqual(data, prevNode.value)) {
    data.selected = !data.selected;
    selectNode.value = data;

    // Only one node is allowed to be selected
    if (isEmpty(prevNode.value)) {
      prevNode.value.selected = false;
    }

    prevNode.value = data;
  }

  // close menu
  props.menu.hiddenMenu(e);

  // toggle selectBar
  Emit.emit("toggleSelectBar", e, data.selected ? "block" : "none");
}

// tree-item recurse self and to use emit bus
function onContextmenu(e: MouseEvent) {
  Emit.emit("contextMenu", e, selectNode.value);
}

// rename
function onRename(e: any, data: innerTreeData) {
  const value = e.srcElement!.value || "";

  data.text = value;
}

function onBlur(e: Event, data: innerTreeData) {
  data.rename = !data.rename;
}
</script>

<style scoped lang="scss">
.tree-node {
  cursor: pointer;
  background-position: -292px -4px;
  background-repeat: repeat-y;
  background-image: url("data:image/png;base64,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");

  &.is-close {
    & > .tree-node__children {
      display: none;
    }
  }

  &.is-opend {
    & > .tree-node__icon {
      background-position: 188px -8px;
    }
  }

  &__background {
    width: 100%;
    height: 24px;
    background: #eee;
    position: absolute;
    left: 0;
    z-index: -1;
  }

  &__icon {
    display: inline-block;
    text-decoration: none;
    margin: 0;
    padding: 0;
    vertical-align: top;
    text-align: center;
    background-image: url("data:image/png;base64,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");
    height: 24px;
    width: 24px;
    line-height: 24;
    background-position: 60px -8px;
    cursor: pointer;
  }

  &__input {
    border: 1px solid #dbcfcf;
    font-size: 16px;

    &:focus {
      outline: none;
    }
  }

  &__children {
    margin-left: 23px;
  }
}

.tree-anchor {
  background-position: 220px -8px;
  display: inline-block;
}

.no-filder {
  background-position: 220px -71px;
}
</style>
