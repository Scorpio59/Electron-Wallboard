<template>
<sweet-modal title="Block settings" overlay-theme="dark" >
    <template slot="button">
      <md-button class="md-raised md-primary">Save</md-button>
    </template>
    <form @submit.stop.prevent="submit" v-if="blockContext">
      <md-input-container>
        <md-icon>access_time</md-icon>
        <label>Rolling time<md-tooltip>Time range betwwen 2 pages</md-tooltip></label>
        <md-input type="text" v-model="blockContext.rollingTime"></md-input>
      </md-input-container>

      <md-button  class=" md-primary" @click.native="addTab"><md-icon>playlist_add</md-icon> add a new tab</md-button>
      <md-list class="md-dense" >
        <md-list-item v-for="tab in blockContext.tabs" :key="tab.id">
          <md-input-container >
            <label>Url</label>
            <md-input type="url" v-model="tab.url"></md-input>
          </md-input-container>
          <md-input-container >
            <label>Selector</label>
            <md-input type="text" v-model="tab.selector"></md-input>
          </md-input-container>
          <md-checkbox v-model="tab.needRefresh" class="md-primary">Refresh<md-tooltip>Force refresh page on displayed!</md-tooltip></md-checkbox>
          <md-checkbox v-model="tab.autoZoom" class="md-primary">Auto zoom<md-tooltip>Zoom on the selected div</md-tooltip></md-checkbox>
          <md-button  class=" md-warn md-icon-button md-raised md-dense"  @click.native="removeTab(tab)"><md-icon>clear</md-icon></md-button>
        </md-list-item>
      </md-list>
    </form>
  </sweet-modal>

</template>

<script>
import {
    SweetModal,
    SweetModalTab
} from 'sweet-modal-vue';
import defaultTabBlockSettings from '../config';
export default {
  name: 'edit-modal',
  components: {
    SweetModal,
    SweetModalTab
  },
  props: ['blockContext'],
  data() {
    return {

    };
  },
  methods: {
    removeTab: function (tab) {
      this.blockContext.tabs.splice(this.tabs.indexOf(tab), 1);
    },
    addTab: function () {
      this.blockContext.tabs.push(defaultTabBlockSettings);
    }
  }
};
</script>


<style scoped>
button.delete {
    top: 10px;
    position: absolute;
    right: 10px;
}
</style>
