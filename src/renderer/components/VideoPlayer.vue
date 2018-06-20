<template>
  <div>
    <vue-video-player
      class="video-player-box"
       ref="player"
       :options="playerOptions"/>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

export default {
  name: 'video-player',
  props: ['src', 'poster'],
  components: { 'vue-video-player': videoPlayer },
  data () {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          src: this.src
        }],
        poster: this.poster,
        fluid: true
      }
    }
  },
  computed: {
    player () {
      return this.$refs.player
    }
  }
}
</script>

<style>
.video-player-box {
  width: 100%;
}
.vjs-control-bar{
  background: #2a2a2a !important;
}
</style>
