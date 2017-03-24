<template>
<section id="web-view" style="height:100%">
    <webview :src="src" style="height:100%"></webview>

    <div class="md-fab  md-mini md-fab-top-left">
        <md-button v-if="isInEditMode" class="md-fab md-mini " @click="editBlock">
            <md-icon>edit</md-icon>
        </md-button>
        <md-button v-if="isInEditMode" class="md-fab md-warn md-mini " @click="deleteBlock">
            <md-icon>delete</md-icon>
        </md-button>
    </div>
</section>
</template>

<script>
export default {
    name: 'web-view',
    props: ['isInEditMode'],
    data() {
        return {
            src: "http://google.fr"
        };
    },
    methods: {
        deleteBlock: function() {
            this.$emit('delete');
        },
        editBlock: function() {
            this.$parent.$emit('show-modal', this._data);
        }
    }
};
</script>


<style scoped>
button.delete {
    top: 10px;
    position: absolute;
    right: 10px;
}

button.edit {
    top: 10px;
    position: absolute;
    left: 10px;
}
</style>
