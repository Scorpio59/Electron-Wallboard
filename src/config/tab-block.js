
export default class TabBlock {
  constructor(id) {
    this.id = id;
    this.needRefresh = false;
    this.url = 'http://www.google.fr';
    this.autoZoom = false;
    this.zoomFactor = 1;
    this.selector = undefined;
  }
}
