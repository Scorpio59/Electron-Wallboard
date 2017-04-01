import configRepository from 'config/config-repository';
import { describe, it } from 'mocha';
import assert from 'assert';

describe('Config', () => {
  describe('createTabBlockSettings', () => {
    it('should increment the tab block index', () => {
      var index = configRepository.tabIndex;
      configRepository.createTabBlockSettings();
      assert(index + 1 === configRepository.tabIndex);
    });
  });
  describe('createBlockSettings', () => {
    it('should increment the block index', () => {
      var index = configRepository.blockIndex;
      configRepository.createBlockSettings();
      assert(index + 1 === configRepository.blockIndex);
    });
  });
});
