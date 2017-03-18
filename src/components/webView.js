const Vue = require("Vue");


Vue.component('webView-item', {
  props: ['webView'],
  template: '<webview src="{{ webView.src }}"></webview>'
});
