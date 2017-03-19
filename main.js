const electron = require('electron');
const {app, BrowserWindow, Menu} = electron;

//import {app, BrowserWindow, Menu} from 'electron';
const url = require('url');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

//TODO Move
function editMode(active) {
  win.webContents.send('edit-mode', active);
}

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 1200, height: 800});

  const template = [
    {
      label: 'Edit',
      submenu:[
        {
          label: 'Edition',
          click: () => editMode(true),
          accelerator: 'F9'
        },
        {
          label: 'Readonly',
          click: () => editMode(false),
          accelerator: 'F8'
        }
      ]
    },
    {
      type:'separator'
    },
    {
      role:'togglefullscreen',
    },
    {
      role:'reload',
      accelerator:'F5'
    }

  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  //See index.dev.js

  // Open the DevTools.
  //win.webContents.openDevTools();

  //add the vuejs extension
  //BrowserWindow.addDevToolsExtension('resources/vuejs-devtool');

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.