<template>
<md-layout class="navigation-control">
  <md-layout>
    <md-button class="md-icon-button md-primary" @click.native="back">
      <md-icon>chevron_left</md-icon>
      <md-tooltip md-direction="right">Previous tab</md-tooltip>
    </md-button>
  </md-layout>
  <md-layout v-if="!isPlaying">
    <md-button class="md-icon-button md-primary" @click.native="play">
      <md-icon>play_arrow</md-icon>
      <md-tooltip md-direction="right">Play</md-tooltip>
    </md-button>
  </md-layout>
  <md-layout v-if="isPlaying">
    <md-button class="md-icon-button md-primary" @click.native="pause">
      <md-icon>pause</md-icon>
      <md-tooltip md-direction="right">Pause</md-tooltip>
    </md-button>
  </md-layout>
  <md-layout>
    <md-button class="md-icon-button md-primary" @click.native="next">
      <md-icon>chevron_right</md-icon>
      <md-tooltip md-direction="right">Next tab</md-tooltip>
    </md-button>
  </md-layout>
</md-layout>
</template>

<script>
export default {
  name: 'navigation-control',
  data() {
    return {
      isPlaying: true
    };
  },
  methods: {
    back: function () {
      this.$emit('back');
    },
    next: function () {
      this.$emit('next');
    },
    play: function () {
      this.isPlaying = true;
      this.$emit('play');
    },
    pause: function () {
      this.isPlaying = false;
      this.$emit('pause');
    }
  }
};
</script>
<style scoped>
.navigation-control {
  width: 200px;
}

.md-button.md-icon-button {
  margin: 0;
}
</style>
