<template>
<md-whiteframe>
  <md-toolbar id='menu-toolbar'>
    <h2 class="md-title" style="flex: 1">Wallboard</h2>
    <md-menu md-align-trigger md-size="5">
      <md-button md-menu-trigger>Presets</md-button>
      <md-menu-content>
        <md-menu-item v-for="(preset, index) in presets" @click.native="editPreset(preset)">
          <md-icon v-show="preset === currentPreset">check_box</md-icon>
          <span>{{preset.index +" :"+ preset.name}} <md-icon @click.native="editPreset(preset)">rate_review</md-icon></span>
        </md-menu-item>
        <md-menu-item @click.native="addPreset">
          <md-icon>add</md-icon>
          <span>New preset</span>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
    <md-menu md-align-trigger>
      <md-button md-menu-trigger>Config</md-button>
      <md-menu-content>
        <md-menu-item>
          <md-icon>file_download</md-icon>
          <span>Import</span>
        </md-menu-item>
        <md-menu-item>
          <md-icon>file_upload</md-icon>
          <span>Export</span>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
    <md-button class="md-icon-button" md-menu-trigger>
      <md-icon>edit</md-icon>
    </md-button>
    <md-button class="md-icon-button" md-menu-trigger>
      <md-icon>cached</md-icon>
    </md-button>
    <md-button md-menu-trigger>
      <md-icon>all_out</md-icon>Fullscreen
    </md-button>
    <md-button class="md-icon-button" md-menu-trigger>
      <md-icon>settings</md-icon>
    </md-button>
    <md-button class="md-icon-button" md-menu-trigger>
      <md-icon>highlight_off</md-icon>
      <md-tooltip md-direction="bottom">Close</md-tooltip>
    </md-button>
  </md-toolbar>
  <md-dialog-prompt md-title="New preset" md-ok-text="Create" md-cancel-text="Cancel" v-model="newPreset.name" @close="onNewClose" ref="newPresetDialog">
  </md-dialog-prompt>
  <md-dialog-prompt md-title="Edit preset" md-ok-text="Save" md-cancel-text="Cancel" v-model="newPreset.name" @close="onEditClose" ref="editPresetDialog">
  </md-dialog-prompt>
</md-whiteframe>
</template>

<script>
import configRepository from '../config/config-repository';
import {
  bus
} from '../index.js';

export default {
  name: 'menu-toolbar',
  props: ['presets', 'currentPreset'],
  data() {
    return {
      newPreset: configRepository.createPreset()
    };
  },
  methods: {
    addPreset: function () {
      this.newPreset = configRepository.createPreset();
      this.$refs.newPresetDialog.open();
    },
    selectPreset: function (preset) {
      bus.$emit('select-preset', preset);
    },
    editPreset: function (preset) {
      this.newPreset = preset;
      this.$refs.editPresetDialog.open();
    },
    onEditClose(type) {
      if (type === 'ok') {
        bus.$emit('select-preset', this.newPreset);
      }
    },
    onNewClose(type) {
      if (type === 'ok') {
        this.presets.push(this.newPreset);
        bus.$emit('select-preset', this.newPreset);
      }
    }
  }
};
</script>


<style scoped>

</style>
