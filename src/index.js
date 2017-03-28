const Vue = require('vue/dist/vue.js');
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import { createBlockSettings } from 'config';
const electron = require('electron');

const ipc = electron.ipcRenderer;

Vue.use(VueMaterial);
export const bus = new Vue();
Vue.component('column-container', require('./components/column-container.vue'));
Vue.component('web-view', require('./components/web-view.vue'));
Vue.component('menu-toolbar', require('./components/menu-toolbar.vue'));
Vue.component('edit-modal', require('./components/edit-modal.vue'));

var mainView = new Vue({  // eslint-disable-line vars-on-top
  el: '#mainView',

  data: {
    isInEditMode: true,
    blocks: [],
    showModal: false,
    blockContext: null,
    toastedMessage: null
  },

  methods: {
    addBlock: function () {
      this.blocks.push(createBlockSettings());
    },

    showToastedMessage: function (message) {
      this.toastedMessage = message;
      this.$refs.snackbar.open();
    },
    openModal: function (data) {
      this.showModal = true;
      this.viewData = data;
    }
  }
});

ipc.on('edit-mode', (evt, active) => {
  mainView._data.isInEditMode = active; // eslint-disable-line no-underscore-dangle
  mainView.showToastedMessage(active ? 'Edition mode' : 'Display mode');
  console.log('Receive signal to editmode: ' + active);
});
bus.$on('open-webview-settings', function (blockContext) {
  mainView.$data.blockContext = blockContext;
  mainView.$refs.editmodal.$children[0].open();
});
