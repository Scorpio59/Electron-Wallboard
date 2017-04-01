import configRepository from 'config/config-repository';

export default class Preset {
  constructor(index) {
    this.name = 'Preset';
    this.index = index;
    this.blocks = [configRepository.createBlockSettings()];
  }
}
