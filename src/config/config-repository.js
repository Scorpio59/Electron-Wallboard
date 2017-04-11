import Block from 'config/block';
import Preset from 'config/preset';
import TabBlock from 'config/tab-block';
import _ from 'lodash';

class ConfigRepository {
/**
 * Display block meta-data
 * @constructor
 * @param {Number} id Block's id
 */
  constructor() {
    this.tabIndex = -1;
    this.blockIndex = -1;
    this.presets = [];
  };

  createTabBlockSettings() {
    this.tabIndex = this.tabIndex + 1;
    return new TabBlock(this.tabIndex);
  };

  createBlockSettings() {
    this.blockIndex = this.blockIndex + 1;
    return new Block(this.blockIndex);
  };

  createPreset(data) {
    return new Preset(data);
  };

  find(index) {
    index = index * 1; // parse in int
    return _.chain(this.presets).filter(function (preset) { return preset.index === index; }).first().value();
  };

  replacePreset(index, preset) {
    preset.index = index;
    const presetToReplace = find(index);
    if (presetToReplace) {
      const indexMatch = this.presets.indexOf(presetToReplace);
      this.presets.splice(indexMatch, 1, preset);
    } else {
      this.presets.push(preset);
    }
  };

}

// Singleton
let instance = null;
if (!instance) instance = new ConfigRepository();
export default instance;
