<template>
<grid-layout :layout="blocks" :col-num="24" :row-height="20" :is-draggable="isInEditMode" :is-resizable="isInEditMode" :vertical-compact="false" :margin="[0,0]" :use-css-transforms="true">
    <grid-item v-for="item in blocks" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i">
        <web-view v-bind:is-in-edit-mode="isInEditMode" v-bind:key="item.i" v-bind:block-context="item" @delete="deleteBlock"></web-view>
    </grid-item>
</grid-layout>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
import {
    bus
} from '../index.js';
const GridLayout = VueGridLayout.GridLayout;
const GridItem = VueGridLayout.GridItem;
export default {
  name: 'column-container',
  components: {
    GridLayout,
    GridItem
  },
  props: ['isInEditMode', 'blocks'],
  data: function () {
    return {};
  },
  methods: {
    deleteBlock: function (item) {
      if (this.blocks.length > 1) {
        const index = this.blocks.indexOf(item);
        this.blocks.splice(index, 1);
      } else {
        bus.$emit('toasted-message', "You can't delete the last column");
      }
    },
    addRow: function () {
      this.rows.push({});
    }
  }
};
</script>


<style scoped>
.vue-grid-item:hover {
    cursor: move;
}

.vue-grid-layout {
    background-color: #FBFBFB;
    min-height: 100%;
}

.column {
    float: left;
    flex: 1;
    overflow: hidden;
    min-height: 100vh;
}

.edit {
    border: 1px solid;
    overflow: auto;
    resize: horizontal;
}

button.delete {
    top: 10px;
    position: absolute;
    right: 10px;
}

.button-add-row {
    bottom: 0;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
