import Block from 'config/block';
import Preset from 'config/preset';
import TabBlock from 'config/tab-block';

class ConfigRepository {
  constructor() {
    this.tabIndex = -1;
    this.blockIndex = -1;
  };

  createTabBlockSettings() {
    this.tabIndex = this.tabIndex + 1;
    return new TabBlock(this.tabIndex);
  };

  createBlockSettings() {
    this.blockIndex = this.blockIndex + 1;
    return new Block(this.blockIndex);
  };

  createPreset(index) {
    return new Preset(index);
  };
}

// Singleton
let instance = null;
if (!instance) instance = new ConfigRepository();
export default instance;
