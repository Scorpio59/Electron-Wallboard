<template>
<section id="web-view" style="height:100%" :class="{edit : isInEditMode}" class="block md-accent">
  <webview :src="currentTab.url" style="height:100%" :class="{edit : isInEditMode }" class=""></webview>
  <!-- <div  class="help displayOnHover">Move and resize me</div>-->
  <div class="md-fab  md-dense md-fab-top-left edition" v-if="isInEditMode">
    <md-whiteframe md-elevation="4"># {{currentIndex}} : {{currentTab.url}}</md-whiteframe>
    <md-button class="md-icon-button md-mini md-raised md-primary" @click.native="editBlock">
      <md-icon>edit</md-icon>
      <md-tooltip md-direction="right">Edit this block</md-tooltip>
    </md-button>
    <md-button class="md-icon-button md-mini md-raised  md-warn" @click.native="deleteBlock">
      <md-icon>delete</md-icon>
      <md-tooltip md-direction="right">Delete this block</md-tooltip>
    </md-button>
    <md-button class="md-icon-button md-mini md-raised  md-accent" @click.native="openExternal">
      <md-icon>open_in_new</md-icon>
      <md-tooltip md-direction="right">Open in the browser</md-tooltip>
    </md-button>
    <md-button class="md-icon-button md-mini md-raised  md-accent" @click.native="savePosition">
      <md-icon>transform</md-icon>
      <md-tooltip md-direction="right">Save the position</md-tooltip>
    </md-button>
    <slider v-model="zoomSlider" :slider-min="0.98" :slider-max="1.02"></slider>
    <navigation-control @next="nextTab(1)" @back="nextTab(-1)"></navigation-control>
  </div>
</section>
</template>

<script>
import { bus } from '../index.js';
import { shell } from 'electron';
// import Vue from 'vue/dist/vue.js';
import _ from 'lodash';
import domHelper from '../dom-helper'
const webviewVM = {
  name: 'web-view',
  props: ['isInEditMode', 'blockContext'],
  data()
  {
    return {
      currentTab: this.blockContext.tabs[0],
      currentIndex: 0,
      intervalID: null,
      webview: null,
      zoomSlider: 1,
      zoomTimerId: null
    };
  },
  created() {
    this.intervalID = window.setInterval(() =>
    {
      this.nextTab(1);
    }, this.blockContext.rollingTime * 1000);
  },
  mounted() {
    this.webview = this.$el.getElementsByTagName('webview')[0];
    this.webview.addEventListener('did-finish-load', () =>
    {
      this.autoZoom();
    });
  },
  methods:
  {
    deleteBlock: function () {
      this.$emit('delete', this.blockContext);
    },
    editBlock: function () {
      var editBlock = JSON.parse(JSON.stringify(this.blockContext));
      bus.$emit('open-webview-settings', editBlock);
    },
    reloadPage: function () {
      var wv = this.$el.querySelector('webview');
      wv.reload();
    },
    nextTab: function (indentation) {
      this.currentIndex = (this.currentIndex + indentation + this.blockContext.tabs.length) % this.blockContext.tabs.length;
      this.currentTab = this.blockContext.tabs[this.currentIndex];
    },
    autoZoom: function () {
      if (this.currentTab.selector)
      {
        const code = domHelper.getElementString(this.currentTab.selector);
        this.webview.getWebContents()
          .executeJavaScript(code, false)
          .then((result) =>
          {
            var clientRect = JSON.parse(result);
            if (this.currentTab.autoZoom)
            {
              const webviewHeight = this.webview.getBoundingClientRect()
                .height;
              const webviewWidth = this.webview.getBoundingClientRect()
                .width;
              const zoomFactorHeight = webviewHeight / clientRect.height;
              const zoomFactorWidth = webviewWidth / clientRect.width;
              const zoomFactor = Math.min(zoomFactorWidth, zoomFactorHeight);
              this.currentTab.zoomFactor = zoomFactor;
            }
            setTimeout(() =>
            {
              this.webview.getWebContents()
                .executeJavaScript(code, false)
                .then((result) =>
                {
                  var clientRect = JSON.parse(result);
                  this.webview.getWebContents()
                    .executeJavaScript('document.body.scrollLeft = ' + clientRect.left + '; document.body.scrollTop = ' + clientRect.top + ';  ');
                });
            }, 150);
          });
      }
    },
    openExternal: function () {
      shell.openExternal(this.currentTab.url);
    },
    zoom: function () {
      if (this.zoomSlider === 1)
      {
        if (this.zoomTimerId)
        {
          clearInterval(this.zoomTimerId);
        }
      }
      else
      {
        if (!this.zoomTimerId)
        {
          this.zoomTimerId = window.setInterval(this.zoom, 30);
        }
        if (this.currentTab.zoomFactor > 0.2 && this.currentTab.zoomFactor < 5)
        {
          this.currentTab.zoomFactor *= this.zoomSlider;
        }
      }
    },
    savePosition: function () {
      const code = `JSON.stringify({top:document.body.scrollTop,left:document.body.scrollLeft})`;
      this.webview.getWebContents()
        .executeJavaScript(code, false)
        .then((result) =>
        {
          this.currentTab.positionScroll = JSON.parse(result);
        });
    }
  },
  watch:
  {
    'blockContext.rollingTime': _.debounce(function () {
      clearInterval(this.intervalID);
      this.intervalID = window.setInterval(this.nextTab, this.blockContext.rollingTime * 1000);
    }, 1000),
    isInEditMode: function (newValue) {
      if (newValue)
      {
        this.webview.insertCSS('body{ overflow:auto;}');
      }
      else
      {
        // hide the scrollbar
        this.webview.insertCSS('body{ overflow:hidden;}');
      }
    },
    currentTab: function () {
      this.autoZoom();
    },
    'currentTab.selector': function () {
      this.autoZoom();
    },
    zoomSlider: function () {
      this.zoom();
    },
    'currentTab.zoomFactor': function (value) {
      this.webview.setZoomFactor(value);
    }
  }
};
export default webviewVM;
</script>


<style scoped>
.help {
  position: absolute;
  top: 50%;
  margin: 0 auto;
  overflow: hidden;
  left: 0;
  right: 0;
  width: 50%;
  min-width: 150px;
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
