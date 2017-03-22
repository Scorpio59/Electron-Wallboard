// CSS
require('material-design-lite');

const electron = require('electron');
const Vue = require('vue/dist/vue.js');
const ipc = electron.ipcRenderer;

Vue.component('column-container', require('./components/column-container.vue'));
Vue.component('web-view', require('./components/web-view.vue'));
Vue.component('edit-modal', require('./components/edit-modal.vue'));

var mainView = new Vue({  // eslint-disable-line vars-on-top
  el: '#mainView',
  data: {
    isInEditMode: true,
    columns: [{}],
    showModal: false,
    viewData: null
  },
  methods: {
    addColumn: function () {
      this.columns.push({});
    },
    deleteColumn: function (indexOfItem) {
      if (this.columns.length > 1) {
        this.columns.splice(indexOfItem, 1);
      } else {
        this.showToastedMessage("You can't delete the last column");
      }
    },
    showToastedMessage: function (message) {
      var data = {
        message: message,
        timeout: 800 };
      document.querySelector('#message-toast').MaterialSnackbar.showSnackbar(data);
    },
    openModal: function (data) {
      this.showModal = true;
      this.viewData = data;
    }
  }
});

// Add v-mdl on div around material design lite component that need javascript update
// https://posva.net/js/2015/08/26/using-material-design-lite-with-vuejs
Vue.directive('mdl', {
  bind: function (el) {
    componentHandler.upgradeElement(el);
  }
});
Vue.directive('mdl-progress', function (val) {
  // The directive may be called before the element have been upgraded
  if (!this.el.MaterialProgress) { componentHandler.upgradeElement(this.el); }
  this.el.MaterialProgress.setProgress(val);
});

ipc.on('edit-mode', (evt, active) => {
  mainView._data.isInEditMode = active; // eslint-disable-line no-underscore-dangle
  mainView.showToastedMessage(active ? 'Edition mode' : 'Display mode');
  console.log('Receive signal to editmode: ' + active);
});
