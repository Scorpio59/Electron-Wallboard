require('./components/webView');
const electron = require('electron');
const Vue = require('vue/dist/vue.js');
const ipc = electron.ipcRenderer;


ipc.on('edit-mode',(evt,active)=>{
  mainView._data.isInEditMode = active;
  console.log("toto"+active);
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
