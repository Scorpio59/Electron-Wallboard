const path = require('path');

// Install `electron-debug` with `devtron`
require('electron-debug')({ showDevTools: true });

//TODO Discuss a compromise here
require('electron-reload')(path.join(__dirname, 'dist'));
//require('electron-hot')();

// Install `vue-devtools`
require('electron').app.on('ready', () => {
  let installExtension = require('electron-devtools-installer');
  installExtension.default(installExtension.VUEJS_DEVTOOLS)
    .then(() => {})
    .catch(err => {
      console.log('Unable to install `vue-devtools`: \n', err);
    });
});

// Require `main` process to boot app
require('./main');
