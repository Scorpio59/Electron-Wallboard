<template>
  <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <slot name="header">
                default header
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
              <input type="text" v-model="viewData.src"></input>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">

              </slot>
                  <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab" @click="$emit('close')"> <i class="material-icons">save</i></button>
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>



export default {
  name: 'edit-modal',
  props: ['isInEditMode','viewData'],
  data () {
    return {

    };
  },
  methods: {
    deleteRow: function () {
      this.$emit('delete');
    },
    editRow: function () {

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
</style>
