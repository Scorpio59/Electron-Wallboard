<template>
<md-snackbar md-position='bottom center' ref="snackbar" :md-duration="duration">
  <span>{{toastedMessage}}</span>
  <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbar.close()">
    <md-icon>close</md-icon>
  </md-button>
</md-snackbar>
</template>
<script>
import {
  bus
} from '../index.js';
const toastedVM = {
  name: 'toasted',
  props: [],
  data() {
    return {
      toastedMessage: '',
      duration: 3000
    };
  },
  created() {},
  mounted() {
    const self = this;
    bus.$on('toasted-message', function (message) {
      self.showToastedMessage(message);
    });
  },
  methods: {
    showToastedMessage: function (message) {
      this.toastedMessage = message;
      this.$refs.snackbar.open();
    }
  }
};
export default toastedVM;
</script>
<style scoped>

</style>
