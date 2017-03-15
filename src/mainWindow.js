const electron = require('electron');
const ipc = electron.ipcRenderer;


ipc.on('edit-mode',(evt,active)=>{
  mainView._data.isInEditMode = active;
  console.log("toto"+active);
});

var mainView = new Vue({
  el:'#mainView',
  data:{
    isInEditMode : true
  }
});
