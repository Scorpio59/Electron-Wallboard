<template>
<section id="column-container">


    <grid-layout :layout="blocks" :col-num="12" :row-height="30" :is-draggable="isInEditMode" :is-resizable="isInEditMode" :vertical-compact="true" :margin="isInEditMode? [10, 10]: [0,0]" :use-css-transforms="true">

        <grid-item v-for="item in blocks" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i">

            <web-view v-bind:is-in-edit-mode="isInEditMode" v-bind:key="item.i">
            </web-view>
        </grid-item>
    </grid-layout>

    </div>

</section>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
const GridLayout = VueGridLayout.GridLayout;
const GridItem = VueGridLayout.GridItem;
export default {
    name: 'column-container',
    components: {
        GridLayout,
        GridItem
    },
    props: ['isInEditMode', 'blocks'],
    data() {
        return {};
    },
    methods: {
        deleteBlock: function() {
            this.$emit('delete');
        },
        addRow: function() {
            this.rows.push({});
        }
    }
};
</script>


<style scoped>
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
