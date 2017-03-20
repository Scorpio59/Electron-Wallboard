const electron = require('electron');
const { app, BrowserWindow, Menu, dialog } = electron;

// import {app, BrowserWindow, Menu} from 'electron';
const url = require('url');
const path = require('path');
const fs = require('fs');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
var isInEditMode = true;
// TODO Move
function toggleMode() {
  isInEditMode = !isInEditMode;
  win.webContents.send('edit-mode', isInEditMode);
}

function saveConfig() {
  dialog.showSaveDialog({
    title: 'Export configuration in file',
    filters: [
     { name: 'Config file', extensions: ['config'] }
    ] }, function (fileName) {
    if (fileName === undefined) return;
    /* TODO  fs.writeFile(fileName, , function (err) {
      if (err === undefined) {
        dialog.showMessageBox({ message: 'The file has been saved! :-)',
          buttons: ['OK'] });
      } else {
        dialog.showErrorBox('File Save Error', err.message);
      }
    });*/
  });
}
function importConfig() {
  dialog.showOpenDialog({
    title: 'Import configuration in file',
    filters: [
     { name: 'Config file', extensions: ['config'] }
    ] }, function (fileName) {
    if (fileName === undefined) return;
    /* TODO   fs.readFile(fileName, 'utf-8', function (err, data) {

  });*/
  });
}

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 1200, height: 800 });

  const template = [
    {
      label: 'File',
      submenu: [
        {
          role: 'quit'
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Export config',
          click: saveConfig
        },
        {
          label: 'Import config',
          click: importConfig
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Edition mode',
          accelerator: 'F9',
          click: toggleMode,
          checked: isInEditMode,
          type: 'checkbox'
        },
        {
          role: 'toggledevtools'
        },
        {
          role: 'togglefullscreen'
        }
      ]
    },
    {
      role: 'reload',
      accelerator: 'F5'
    },
    {
      role: 'about'
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

  // See index.dev.js

  // Open the DevTools.
  // win.webContents.openDevTools();

  // add the vuejs extension
  // BrowserWindow.addDevToolsExtension('resources/vuejs-devtool');

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
