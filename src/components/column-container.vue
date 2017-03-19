<template>
<div id="column-container" class="column"  :class="[isInEditMode ? 'edit':'']" >



  <button v-if="isInEditMode" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab delete" id="delete-column-btn"
  @click="deleteColumn">
    <i class="material-icons">delete</i>
  </button>
  <div class="mdl-tooltip mdl-tooltip--large" data-mdl-for="delete-column-btn">Delete the column</div>


  <web-view
          v-for="(row,index) in rows"
         v-bind:is-in-edit-mode="isInEditMode"
         v-on:delete="deleteRow"
         v-bind:key="index">
  </web-view>

  <button v-if="isInEditMode" v-on:click="addRow" id="add-row-btn" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab button-add-row">
    <i class="material-icons">add</i>
  </button>
  <div class="mdl-tooltip mdl-tooltip--top mdl-tooltip--large" data-mdl-for="add-row-btn">Add a row</div>

</div>
</template>

<script>
export default {
  name: 'column-container',
  props: ['isInEditMode'],
  data () {
    return {
      rows:[{}],
    };
  },
  methods: {
    deleteColumn: function () {
      this.$emit('delete');
    },
    deleteRow: function (indexOfItem) {
      if(this.rows.length > 1)
      {
        this.rows.splice(indexOfItem, 1);
      }else {
        this.showToastedMessage("You can't delete the last row");
      }
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

.edit{
     border: 1px solid;
     overflow: auto;
    resize: horizontal;
}

button.delete {
  top: 10px;
  position: relative;
  float: right;
  right: 10px;
}

.button-add-row{
  top: 90%;
  position: relative;
  left: 45%;
}

</style>
