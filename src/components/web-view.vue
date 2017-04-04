<template>
<section id="web-view" style="height:100%" :class="{edit : isInEditMode}" class="block md-accent">
    <webview :src="currentTab.url" style="height:100%" :class="{edit : isInEditMode }" class=""></webview>
    <!-- <div  class="help displayOnHover">Move and resize me</div>-->
    <div class="md-fab  md-dense md-fab-top-left edition">
        <md-button v-if="isInEditMode" class="md-icon-button md-mini md-raised md-primary" @click.native="editBlock">
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="right">Edit this block</md-tooltip>
        </md-button>
        <md-button v-if="isInEditMode" class="md-icon-button md-mini md-raised  md-warn" @click.native="deleteBlock">
            <md-icon>delete</md-icon>
            <md-tooltip md-direction="right">Delete this block</md-tooltip>
        </md-button>
        <md-button v-if="isInEditMode" class="md-icon-button md-mini md-raised  md-accent" @click.native="openExternal">
            <md-icon>open_in_new</md-icon>
            <md-tooltip md-direction="right">Open in the browser</md-tooltip>
        </md-button>
    </div>
</section>
</template>

<script>
import { bus } from '../index.js';
import { shell } from 'electron'
import Vue from 'vue/dist/vue.js';
const  webviewVM ={
    name: 'web-view',
    props: ['isInEditMode', 'blockContext'],
    data() {
        return {
            currentTab : this.blockContext.tabs[0],
            currentIndex : 0,
            intervalID: null,
            webview:null
        };
    },
    created() {
      this.intervalID = window.setInterval(this.nextTab, this.blockContext.rollingTime * 1000);
    },
    mounted(){
      this.webview = this.$el.getElementsByTagName('webview')[0];
      this.webview.addEventListener('did-finish-load', ()=>{
        this.autoZoom();
      });
    },
    methods: {
        deleteBlock: function() {
            this.$emit('delete', this.blockContext);
        },
        editBlock: function() {
            var editBlock = JSON.parse(JSON.stringify(this.blockContext));
            bus.$emit('open-webview-settings', editBlock);
        },
        reloadPage:function(){
          var wv =this.$el.querySelector('webview');
          wv.reload();
        },
        nextTab:function(){
          this.currentIndex = (this.currentIndex+1) % this.blockContext.tabs.length;
          this.currentTab =  this.blockContext.tabs[this.currentIndex];
        },
        autoZoom:function(){
          if(this.currentTab.selector)
          {
            let code = `var element = document.getElementById("`+ this.currentTab.selector+`");
            rect = element.getBoundingClientRect()
                        JSON.stringify({top:rect.top,right:rect.right,bottom:rect.bottom,left:rect.left,height:rect.height,width:rect.width})`;
            this.webview.getWebContents().executeJavaScript(code,false).then((result) =>{
              var clientRect = JSON.parse(result);
              if(this.currentTab.autoZoom)
              {
                var webviewHeight = this.webview.getBoundingClientRect().height;
                var webviewWidth = this.webview.getBoundingClientRect().width;
                var zoomFactorHeight = webviewHeight / clientRect.height;
                var zoomFactorWidth = webviewWidth / clientRect.width;
                var zoomFactor = Math.min(zoomFactorWidth,zoomFactorHeight);
                this.currentTab.zoomFactor = zoomFactor;
                this.webview.setZoomFactor(zoomFactor);
              }
              setTimeout(() => {
                    this.webview.getWebContents().executeJavaScript(code,false).then((result) =>{
                          var clientRect = JSON.parse(result);
                          this.webview.getWebContents().executeJavaScript("document.body.scrollLeft = "+ clientRect.left+"; document.body.scrollTop = "+ clientRect.top+";  ");
                    });
                  }, 100)
              });
            }
          },
          openExternal:function(){
              shell.openExternal(this.currentTab.url);
          }
    },
    watch: {
       'blockContext.rollingTime':_.debounce(function(){
             clearInterval(this.intervalID);
             this.intervalID = window.setInterval(this.nextTab, this.blockContext.rollingTime * 1000);
           },1000),
       isInEditMode: function(newValue)  {
          if(newValue)
          {
            this.webview.insertCSS("body{ overflow:auto;}")
          }else {
            //hide the scrollbar
            this.webview.insertCSS("body{ overflow:hidden;}")
          }
        },
        currentTab: {
          handler: _.debounce(function(){
              this.autoZoom()
            },1000),
          deep: true
        }
     }
};
export default webviewVM


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
