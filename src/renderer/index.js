<<<<<<< HEAD:src/mainWindow.js
require('./components/webView');
=======
//CSS
require('material-design-lite');
const Vue = require('vue');
>>>>>>> 57f3aca098e9361788e66157c59d92a186a42083:src/renderer/index.js
const electron = require('electron');
const Vue = require('vue/dist/vue.js');
const ipc = electron.ipcRenderer;


ipc.on('edit-mode',(evt,active)=>{
  mainView._data.isInEditMode = active;
  console.log("toto "+active);
});



Vue.component('todo-item', {
  props: ['webview'],
  template: '<webview></webview>'
});

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
