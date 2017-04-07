import configRepository from 'config/config-repository';

export default class Preset {

  constructor(data) {
    this.name = 'Preset';
    this.index = 1;
    this.blocks = [configRepository.createBlockSettings()];
    Object.assign(this, data);
  }

}
