<template>
  <div>

    <v-select
      :items="animeList.list"
      v-model="q"
      prepend-icon="search"
      append-icon="send"
      :append-icon-cb="search"
      label="Search"
      flat
      cache-items
      combobox
      item-text="title"
      item-value="title" />

    <v-flex v-if="animeListLoaded" xs12>
      <v-card>
        <v-container
          fluid
          grid-list-lg>
          <v-layout
            row
            wrap>

            <v-flex
              v-if="query != null || animeInfoLoaded"
              xs12>
              <v-card>
                <v-container
                  fluid
                  grid-list-lg>
                  <v-layout row>
                    <v-flex xs4>
                      <v-card-media
                        :src="animeInfo.picture"
                        height="350px"
                        contain>
                        <v-container
                          fill-height
                          fluid>
                          <v-layout fill-height>
                            <v-flex
                              xs12
                              align-end
                              flexbox/>
                          </v-layout>
                        </v-container>
                      </v-card-media>
                    </v-flex>
                    <v-flex xs12>
                      <v-card-title primary-title>
                        <div>
                          <div class="headline mb-1">{{ animeInfo.title }}
                            <v-chip
                              label
                              color="accent">
                            <v-icon left>star</v-icon>{{ animeInfo.score }}/10</v-chip>
                          </div>
                          <v-chip outline>Type: {{ animeInfo.type }}</v-chip>
                          <v-chip outline>Episodes: {{ animeInfo.episodes }}</v-chip>
                          <v-chip outline>Ranked: {{ animeInfo.ranked }}</v-chip>
                          <v-chip outline>Members: {{ animeInfo.members }}</v-chip>
                          <v-chip outline>Aired: {{ animeInfo.aired }}</v-chip>
                          <div>{{ animeInfo.synopsis }}</div>
                        </div>
                      </v-card-title>
                      <v-card-text>
                        <v-chip
                          v-for="(genre, key) in animeInfo.genres"
                          :key="key"
                          label
                          color="pink"
                          text-color="white">
                          <v-icon
                            dark
                            left>label</v-icon>{{ genre }}
                        </v-chip>
                      </v-card-text>
                    </v-flex>
                    <v-card-actions>
                      <v-spacer/>
                      <v-btn
                        flat
                        color="pink"
                        @click="$electron.shell.openExternal(animeInfo.url)">
                        <v-icon>link</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>

            <v-flex
              v-if="query != null || animeLoaded"
              xs12>
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
            </v-flex>

            <v-flex
              v-if="!animeLoaded"
              xs12>
              <v-container
                fluid
                grid-list-lg>
                <v-layout row>

                  <v-flex xs12>
                    <div>
                      <v-alert
                        :value="true"
                        outline
                        color="error"
                        icon="warning">
                        Error fetching data for query: <b>{{ query }}</b>
                      </v-alert>
                    </div>
                  </v-flex>

                </v-layout>
              </v-container>
            </v-flex>

            <v-flex
              v-if="!animeInfoLoaded"
              xs12>
              <v-container
                fluid
                grid-list-lg>
                <v-layout row>

                  <v-flex xs12>
                    <div>
                      <v-alert
                        :value="true"
                        outline
                        color="info"
                        icon="info">
                        Search something
                      </v-alert>
                    </div>
                  </v-flex>

                </v-layout>
              </v-container>
            </v-flex>

          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import {
  FETCH_ANIME_LIST,
  FETCH_ANIME_INFO,
  FETCH_ANIME,
  FETCH_ANIME_EPISODE
} from '../store/actions.types'
import { mapGetters } from 'vuex'
export default {
  name: 'Anime',
  data () {
    return {
      q: '',
      query: '',
      dialog: false
    }
  },
  computed: {
    ...mapGetters({
      animeList: 'animeList',
      animeListLoaded: 'animeListLoaded',
      animeInfo: 'animeInfo',
      animeInfoLoaded: 'animeInfoLoaded',
      anime: 'anime',
      animeLoaded: 'animeLoaded',
      animeEpisode: 'animeEpisode',
      animeEpisodeLoaded: 'animeEpisodeLoaded'
    })
  },
  mounted () {
    this.$store.dispatch(FETCH_ANIME_LIST)
  },
  methods: {
    search () {
      this.query = this.q.title
      this.fetchAnimeInfo()
      this.fetchAnime()
    },
    fetchAnimeInfo () {
      this.$store.dispatch(FETCH_ANIME_INFO, this.query)
    },
    fetchAnime () {
      this.$store.dispatch(FETCH_ANIME, this.query)
    },
    fetchAnimeEpisode (number) {
      this.$store.dispatch(FETCH_ANIME_EPISODE, {
        query: this.query,
        number: number
      })
    }
  }
}
</script>

<style>

</style>
