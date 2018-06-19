<template>
  <div>

    <div v-if="animeEpisodeError">
      <v-alert :value="true" outline color="error" icon="warning">
        Error fetching data for query: <b>{{ query }}</b>
        <div>{{animeError}}</div>
      </v-alert>
    </div>

    <v-card v-else>
      <v-expansion-panel popout focusable>
        <v-expansion-panel-content v-for="(item, key) in anime.list" :key="key">
          <div slot="header" @click.once="fetchAnimeEpisode(item.number)">
            <v-list-tile avatar>
              <v-list-tile-action>
                <v-avatar>{{ item.number }}</v-avatar>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.description" />
              </v-list-tile-content>
            </v-list-tile>
          </div>

          <v-tabs show-arrows>
            <v-tabs-slider/>
            <v-tab v-for="(ep, key) in animeEpisode" :key="key">
              {{ ep.host }}
            </v-tab>
            <v-tabs-items>
              <v-tab-item v-for="(iep, ikey) in animeEpisode" :key="ikey">
                <v-card >
                  <div v-if="iep.host === 'mp4upload'">
                  <v-btn color="accent" @click.once="fetchVideo(iep.host, iep.player)">Watch</v-btn>
                  <div v-if="playerOptions.sources[0].src">
                    <!-- <video width="100%" controls :src="playerOptions.sources[0].src"></video> -->
                     <video-player
                        class="video-player-box"
                        ref="videoPlayer"
                        :options="playerOptions"/>
                    </div>
                 </div>
                 <div v-else>Player currently unsupported {{iep}}</div>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card>

  </div>
</template>

<script>
import { FETCH_ANIME_EPISODE } from '../store/actions.types'
import { mapGetters } from 'vuex'
import mp4Upload from '../videoplayers/Mp4UploadCom'
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

export default {
  name: 'animeEpisode',
  props: ['anime', 'query'],
  data () {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          src: ''
        }],
        poster: '',
        fluid: true
      }
    }
  },
  components: { videoPlayer },
  computed: {
    ...mapGetters({
      animeEpisode: 'anime/animeEpisode',
      animeEpisodeLoading: 'anime/animeEpisodeLoading',
      animeEpisodeError: 'anime/animeEpisodeError'
    }),
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    fetchAnimeEpisode (number) {
      this.$store.dispatch(`anime/${FETCH_ANIME_EPISODE}`, {
        query: this.query,
        number: number
      })
    },
    async fetchVideo (host, url) {
      if (host === 'mp4upload') {
        const { file, poster } = await mp4Upload(url)
        this.playerOptions.poster = poster
        this.playerOptions.sources[0].src = file
      }
    }
  }
}
</script>
<style scoped>
.video-player-box {
  width: 100%;
}
</style>
