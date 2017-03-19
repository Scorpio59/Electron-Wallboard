<template>
  <section id="web-view" style="position:relative"  >
<webview :src="src"></webview>

<button v-if="isInEditMode" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab edit" id="edit-column-btn"
@click="editRow">
  <i class="material-icons">edit</i>
</button>
<div class="mdl-tooltip mdl-tooltip--large" data-mdl-for="edit-column-btn">Edit the row</div>

<button v-if="isInEditMode" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab delete" id="delete-column-btn"
@click="deleteRow">
  <i class="material-icons">delete</i>
</button>
<div class="mdl-tooltip mdl-tooltip--large" data-mdl-for="delete-column-btn">Delete the row</div>
</section>
</template>

<script>

export default {
  name: 'web-view',
  props: ['isInEditMode'],
  data () {
    return {
      src:"http://google.fr"
    };
  },
  methods: {
    deleteRow: function () {
      this.$emit('delete');
    },
    editRow: function () {
      this.$parent.$emit('show-modal',this._data);
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
