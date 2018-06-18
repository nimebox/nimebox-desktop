<template>
  <div>
            <v-card>
                <v-expansion-panel
                  popout
                  focusable>
                  <v-expansion-panel-content
                    v-for="(item, key) in anime.list"
                    :key="key">
                    <div
                      slot="header"
                      @click.once="fetchAnimeEpisode(item.number)">

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
                      <v-tab
                        v-for="(ep, key) in animeEpisode"
                        :key="key">
                        {{ ep.host }}
                      </v-tab>
                      <v-tabs-items>
                        <v-tab-item
                          v-for="(iep, ikey) in animeEpisode"
                          :key="ikey">
                          <v-card flat>
                            <v-card-text> {{ iep.player }}</v-card-text>

                            <!-- <div v-if="iep.host === 'mp4upload'">
                              <v-btn color="primary" dark @click="parsePlayer(iep.player)">Open Player</v-btn>
                            </div> -->

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
export default {
  name: 'animeEpisode',
  props: ['anime', 'query'],
  computed: {
    ...mapGetters({
      animeEpisode: 'anime/animeEpisode',
      animeEpisodeLoading: 'anime/animeEpisodeLoading'
    })
  },
  methods: {
    fetchAnimeEpisode (number) {
      this.$store.dispatch(`anime/${FETCH_ANIME_EPISODE}`, {
        query: this.query,
        number: number
      })
    }
  }
}
</script>
