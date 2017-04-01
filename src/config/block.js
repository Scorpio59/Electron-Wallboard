import configRepository from 'config/config-repository';

export default class Block {
  constructor(id) {
    this.rollingTime = 10;
    this.tabs = [configRepository.createTabBlockSettings()];
    this.x = 0;
    this.y = 0;
    this.w = 24;
    this.h = 20;
    this.i = id;
  }
  get RollingTime() { return this.rollingTime; }
  get Tabs() { return this.tabs; }
  get X() { return this.x; }
  get Y() { return this.y; }
  get W() { return this.w; }
  get H() { return this.h; }
  get I() { return this.i; }
}
