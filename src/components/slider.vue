<template>
<div>

  <md-button class="md-icon-button md-primary" @click.native="zoomOut">
    <md-icon>zoom_out</md-icon>
    <md-tooltip md-direction="right">Zoom -</md-tooltip>
  </md-button>
  <div :id="sliderId" class="vertical-slider" v-bind:value="value" v-on:input="updateValue($event.target.value)"></div>
  <md-button class="md-icon-button md-primary" @click.native="zoomIn">
    <md-icon>zoom_in</md-icon>
    <md-tooltip md-direction="right">Zoom +</md-tooltip>
  </md-button>
</div>
</template>

<script>
import noUiSlider from 'noUiSlider';

export default {
  name: 'slider',
  props: ['value', 'sliderMin', 'sliderMax', 'sliderStep'],
  data: function () {
    return {
      sliderId: this.uuid4()
    };
  },
  mounted: function () {
    var slider = document.getElementById(this.sliderId);
    noUiSlider.create(slider, {
      start: this.value,
      orientation: 'vertical',
      animate: true,
      animationDuration: 100,
      range: {
        'min': [this.sliderMin],
        'max': [this.sliderMax]
      }
    });
    slider.noUiSlider.on('update', this.updateValue);
    slider.noUiSlider.on('change', function (values, handle) {
      if (values[handle] !== 1) {
        slider.noUiSlider.set(1);
      }
    });
    slider.noUiSlider.on('set', function (values, handle) {
      if (values[handle] !== 1) {
        setTimeout(() => {
          slider.noUiSlider.set(1);
        }, 10);
      }
    });
  },
  methods: {
    updateValue: function (value) {
      this.$emit('input', value[0]);
    },
    uuid4: function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    zoomIn: function () {
      var slider = document.getElementById(this.sliderId);
      slider.noUiSlider.set(this.sliderMax);
    },
    zoomOut: function () {
      var slider = document.getElementById(this.sliderId);
      slider.noUiSlider.set(this.sliderMin);
    }

  }
};
</script>


<style scoped>
.vertical-slider {
  height: 100px;
}
</style>
