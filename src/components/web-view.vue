<template>
<section id="web-view" style="height:100%" :class="{edit : isInEditMode}" class="block md-accent">
    <webview :src="src" style="height:100%" :class="{edit : isInEditMode }"></webview>
    <edit-modal v-bind:view-data="src" ref="editmodal"> </edit-modal>
    <div class="md-fab  md-dense md-fab-top-left edition">
        <md-button v-if="isInEditMode" class="md-icon-button md-mini md-fab " @click.native="editBlock">
            <md-icon>edit</md-icon>
        </md-button>
        <md-button v-if="isInEditMode" class="md-icon-button md-mini md-raised  md-warn" @click.native="deleteBlock">
            <md-icon>delete</md-icon>
        </md-button>
    </div>
</section>
</template>

<script>
export default {
    name: 'web-view',
    props: ['isInEditMode', 'blockContext'],
    data() {
        return {
            src: "http://google.fr"
        };
    },
    methods: {
        deleteBlock: function() {
            this.$emit('delete', this.blockContext.i);
        },
        editBlock: function() {

            this.$refs.editmodal.$children[0].open();

        }
    }
};
</script>


<style scoped>
webview.edit {
    opacity: 0.4;
}

section.edit {
    background-color: #EEEEEE;
}

.edition {
    display: none;
}

.block:hover .edition {
    display: block;
}
</style>
