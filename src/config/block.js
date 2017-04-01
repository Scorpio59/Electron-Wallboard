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
}
