const Vue = require('vue/dist/vue.js');
import VueMaterial from 'vue-material';
import _ from 'lodash';
import 'vue-material/dist/vue-material.css';
import 'nouislider/distribute/nouislider.css';
import configRepository from 'config/config-repository';
const electron = require('electron');

const ipc = electron.ipcRenderer;

Vue.use(VueMaterial);
export const bus = new Vue();
Vue.component('toasted', require('./components/toasted.vue'));
Vue.component('slider', require('./components/slider.vue'));
Vue.component('column-container', require('./components/column-container.vue'));
Vue.component('web-view', require('./components/web-view.vue'));
Vue.component('menu-toolbar', require('./components/menu-toolbar.vue'));
Vue.component('edit-modal', require('./components/edit-modal.vue'));

var mainView = new Vue({ // eslint-disable-line vars-on-top
  el: '#mainView',

  data: {
    isInEditMode: true,
    showModal: false,
    blockContext: null,
    presets: configRepository.presets,
    currentPreset: null
  },
  created() {
    this.presets.push(configRepository.createPreset({ index: 1 }));
    this.currentPreset = this.presets[0];
  },
  methods: {
    addBlock: function () {
      this.currentPreset.blocks.push(configRepository.createBlockSettings());
    },
    openModal: function (data) {
      this.showModal = true;
      this.viewData = data;
    }
  },
  watch: {
    presets: {
      handler: _.debounce(function () {
        ipc.send('config-sent', mainView.$data.presets);
      }, 500),
      deep: true
    }
  }
});
ipc.on('edit-mode', (evt, active) => {
  mainView._data.isInEditMode = active; // eslint-disable-line no-underscore-dangle
  bus.$emit('toasted-message', active ? 'Edition mode' : 'Display mode');
  console.log('Receive signal to editmode: ' + active);
});
ipc.on('request-config', (evt) => {
  ipc.send('config-sent', mainView.$data.presets);
});
ipc.on('import-config', (evt, config) => {
  mainView.$data.presets = config;
  mainView.$data.currentPreset = mainView.$data.presets[0];
});
ipc.on('select-preset-index', (evt, index) => {
  var selectedPreset = configRepository.find(index);
  if (selectedPreset) {
    mainView.$data.currentPreset = selectedPreset;
    bus.$emit('toasted-message', 'Preset #' + index + ' : ' + mainView.$data.currentPreset.name + ' selected');
  }
});

ipc.on('save-currentpreset-in-index', (evt, index) => {
  configRepository.replacePreset(index, configRepository.createPreset(JSON.parse(JSON.stringify(mainView.$data.currentPreset))));
  bus.$emit('toasted-message', 'Preset  #' + index + ' : ' + mainView.$data.currentPreset.name + ' saved');
  mainView.$data.currentPreset = configRepository.find(index);
});
bus.$on('save-webview-settings', function (blockContext) {
  var matchBlock = _.chain(mainView.$data.currentPreset.blocks).filter(function (x) { return x.i === blockContext.i; }).first().value();
  _.merge(matchBlock, blockContext);
});
bus.$on('open-webview-settings', function (blockContext) {
  mainView.$data.blockContext = blockContext;
  mainView.$refs.editmodal.$children[0].open();
});
bus.$on('select-preset', function (preset) {
  mainView.$data.currentPreset = preset;
});
