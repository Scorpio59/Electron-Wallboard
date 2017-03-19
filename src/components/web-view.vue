<template>
  <div id="web-view" >
<webview :src="src"></webview>

<button v-if="isInEditMode" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab delete" id="delete-column-btn"
@click="deleteColumn">
  <i class="material-icons">delete</i>
</button>
<div class="mdl-tooltip mdl-tooltip--large" data-mdl-for="delete-column-btn">Delete the column</div>
</div>
</template>

<script>
export default {
  name: 'web-view',
  data () {
    return {
    src:"http://google.fr"
    };
  },
  methods: {
    deleteRow: function () {
      this.$emit('delete');
    }
  }
};
</script>


<style scoped>

button.delete {
  top: 10px;
  position: relative;
  float: right;
  right: 10px;
}
</style>
