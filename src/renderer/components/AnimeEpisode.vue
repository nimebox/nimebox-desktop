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
                  <v-btn flat color="primary" @click.once="fetchVideo(iep.host, iep.player)">Watch</v-btn>
                  <div v-if="file">
                     <video-player :src="file" :poster="poster" />
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
import videoPlayer from '@/components/VideoPlayer'

export default {
  name: 'anime-episode',
  props: ['anime', 'query'],
  components: { videoPlayer },
  data () {
    return {
      file: '',
      poster: ''
    }
  },
  computed: {
    ...mapGetters({
      animeEpisode: 'anime/animeEpisode',
      animeEpisodeLoading: 'anime/animeEpisodeLoading',
      animeEpisodeError: 'anime/animeEpisodeError'
    })
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
        this.poster = poster
        this.file = file
      }
    }
  }
}
</script>
