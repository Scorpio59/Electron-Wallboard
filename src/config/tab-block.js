
export default class TabBlock {
  constructor(id) {
    this.id = id;
    this.needRefresh = false;
    this.url = 'http://www.google.fr';
    this.autoZoom = false;
    this.zoomFactor = 1;
    this.selector = undefined;
  }
  get Id() { return this.id; }
  get NeedRefresh() { return this.needRefresh; }
  get Url() { return this.url; }
  get AutoZoom() { return this.autoZoom; }
  get ZoomFactor() { return this.zoomFactor; }
  get Selector() { return this.selector; }
}
