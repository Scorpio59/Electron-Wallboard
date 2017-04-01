const electron = require('electron');
const {
	app,
	BrowserWindow,
	Menu,
	dialog,
	globalShortcut,
	ipcMain
} = electron;

const url = require('url');
const path = require('path');
const fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
var isInEditMode = true;
var configFileToSave;
const defaultConfigFile = path.join(app.getPath('userData'), 'wallboard.config');
function toggleMode() {
  isInEditMode = !isInEditMode;
  win.webContents.send('edit-mode', isInEditMode);
}

/* Configuration Export */
function saveConfig() {
  dialog.showSaveDialog({
    title: 'Export configuration in file',
    filters: [{
      name: 'Config file',
      extensions: ['json']
    }]
  }, function (fileName) {
    configFileToSave = fileName;
    win.webContents.send('request-config');
  });
};

function saveConfigFile(fileName, config) {
  fs.writeFile(fileName, JSON.stringify(config), function (err) {
    if (!err) {
        // TODO Toaseted message'The file has been saved.',
    } else {
      dialog.showErrorBox('File Save Error', err);
    }
  });
};

ipcMain.on('config-sent', (evt, confPresets) => {
  if (confPresets) {
    if (configFileToSave) {
      saveConfigFile(configFileToSave, confPresets);
      configFileToSave = null;
    } else {
      saveConfigFile(defaultConfigFile, confPresets);
    }
  }
});

// === End Of Export
/* Configuration Import */
function onConfigFileRead(err, data) {
  var configuration;
  if (err) throw err;
  configuration = JSON.parse(data);
  win.webContents.send('import-config', configuration);
}

function onImportConfig(fileName) {
  if (!fileName || !fs.existsSync(fileName)) return;
  fs.readFile(fileName, 'utf-8', onConfigFileRead);
}

function importConfig() {
  dialog.showOpenDialog({
    title: 'Import configuration in file',
    defaultPath: configFileToSave,
    filters: [{
      name: 'Config file',
      extensions: ['json']
    }]
  }, (files) => onImportConfig(files[0]));
}
// === End Of Import

function SetGlobalShortcut() {
  var array = [...Array(8).keys()];
  for (let i in array) { // eslint-disable-line prefer-const
    const u = parseInt(i) + 1;
    globalShortcut.register('F' + u, () => {
      win.webContents.send('select-preset-index', i);
    });
    globalShortcut.register('Ctrl +F' + u, () => {
      win.webContents.send('save-currentpreset-in-index', i);
    });
  }
}

function createWindow() {
  SetGlobalShortcut();
	// Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false
  });

  const template = [{
    label: 'File',
    submenu: [{
      role: 'quit'
    }]
  },
  {
    label: 'Edit',
    submenu: [{
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
    submenu: [{
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

  win.once('ready-to-show', () => {
    onImportConfig(defaultConfigFile);
    win.show();
  });

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
