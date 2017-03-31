var tabIndex = -1;
var blockIndex = -1;
var presetIndex = -1;
export function createTabBlockSettings() {
  tabIndex = tabIndex + 1;
  return {
    id: tabIndex,
    needRefresh: false,
    url: 'http://www.google.fr',
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

export function createPreset() {
  presetIndex = presetIndex + 1;
  return {
    name: 'Preset' + presetIndex,
    blocks: [createBlockSettings()]
  };
};
