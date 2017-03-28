var tabIndex = -1;
var blockIndex = -1;
export function createTabBlockSettings() {
  tabIndex = tabIndex + 1;
  return {
    id: tabIndex,
    needRefresh: false,
    url: 'help-block.html',
    autoZoom: false,
    zoomFactor: 1,
    selector: undefined
  };
};

export function createBlockSettings() {
  blockIndex = blockIndex + 1;
  return {
    rollingTime: 10,
    tabs: [createTabBlockSettings()],
    'x': 0,
    'y': 0,
    'w': 24,
    'h': 20,
    'i': blockIndex
  };
};