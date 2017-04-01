import configRepository from 'config/config-repository';

export default class Preset {
  constructor(id) {
    this.name = 'Preset' + id;
    this.blocks = [configRepository.createBlockSettings()];
  }
  get Name() { return this.name; }
  get Blocks() { return this.blocks; }
}
