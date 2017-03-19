//CSS
require('material-design-lite');

const electron = require('electron');
const Vue = require('vue/dist/vue.js');
const ipc = electron.ipcRenderer;


ipc.on('edit-mode',(evt,active)=>{
  mainView._data.isInEditMode = active;
  console.log("Receive signal to editmode: "+active);
});

Vue.component('column-container', require('./components/column-container.vue'));

var mainView = new Vue({
  el:'#mainView',
  data:{
    isInEditMode : true,
    columns:[{src:"http://google.fr"}],

  },
  methods: {
    addColumn: function () {
      this.columns.push({src:"http://google.fr"});
    }
  }
});
