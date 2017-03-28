<template>
<sweet-modal title="Block settings" overlay-theme="dark">
    <template slot="button">
      <md-button class="md-raised md-primary">Save</md-button>
</template>


    <form @submit.stop.prevent="submit">
      <md-input-container>
        <md-icon>access_time</md-icon>
        <label>Rolling time</label>
        <md-input type="text"></md-input>
      </md-input-container>

      <md-button  class=" md-primary" @click.native="addTab"><md-icon>playlist_add</md-icon> add a new tab</md-button>
      <md-list class="md-dense" >
        <md-list-item v-for="tab in tabs" :key="tab.id">
          <md-input-container >
              <label>Url</label>
              <md-input type="url" v-model="viewData"></md-input>
            </md-input-container>

                <md-checkbox v-model="checkbox" class="md-primary">Refresh<md-tooltip>Force refresh page on displayed!</md-tooltip></md-checkbox>



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
export default {
    name: 'edit-modal',
    components: {
        SweetModal,
        SweetModalTab
    },
    props: ['isInEditMode', 'viewData'],
    data() {
        return {
            tabs: [{}]
        };
    },
    methods: {
        removeTab: function(tab) {
            this.tabs.splice(this.tabs.indexOf(tab), 1);
        },
        addTab: function() {
            this.tabs.push({});
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
