<template>
<section id="web-view" style="height:100%" :class="{edit : isInEditMode}" class="block md-accent">
    <webview :src="currentTab.url" style="height:100%" :class="{edit : isInEditMode }" class="hideOnHover"></webview>
    <div  class="help displayOnHover">Move and resize me</div>
    <div class="md-fab  md-dense md-fab-top-left edition">
        <md-button v-if="isInEditMode" class="md-icon-button md-mini md-raised md-primary" @click.native="editBlock">
            <md-icon>edit</md-icon>
        </md-button>
        <md-button v-if="isInEditMode" class="md-icon-button md-mini md-raised  md-warn" @click.native="deleteBlock">
            <md-icon>delete</md-icon>
        </md-button>
    </div>
</section>
</template>

<script>
import { bus } from '../index.js';

export default {
    name: 'web-view',
    props: ['isInEditMode', 'blockContext'],
    data() {
        return {
            currentTab : this.blockContext.tabs[0],
            currentIndex : 0,
            intervalID: null
        };
    },
    created() {
      this.intervalID = window.setInterval(this.nextTab, this.blockContext.rollingTime * 1000);
    },
    methods: {
        deleteBlock: function() {
            this.$emit('delete', this.blockContext);
        },
        editBlock: function() {
            bus.$emit('open-webview-settings', this.blockContext)
        },
        reloadPage:function(){
          var wv =this.$el.querySelector('webview');
          wv.reload();
        },
        nextTab:function(){
          this.currentIndex=(this.currentIndex+1) % this.blockContext.tabs.length;
          this.currentTab =  this.blockContext.tabs[this.currentIndex];
        }

    },
    watch: {
       blockContext:{
         handler:function(){
         clearInterval(this.intervalID);
         this.intervalID = window.setInterval(this.nextTab, this.blockContext.rollingTime * 1000);
       },
         deep: true
       }
     }
};


</script>


<style scoped>


.help{
    position: absolute;
    top: 50%;
    margin: 0 auto;
    overflow: hidden;
    left:0;
    right:0;
    width: 50%;
    min-width:150px;
    opacity: 0;
}

webview.edit {
    opacity: .4;
}

.block:hover .displayOnHover {
    opacity: 1;
}
.block:hover .hideOnHover {
    opacity: 0;
}

section.edit {
    background-color: #EFEFEF;
}

.edition {
    display: none;
}

.block:hover .edition {
    display: block;
}
</style>
