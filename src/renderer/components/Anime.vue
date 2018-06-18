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

    <v-flex v-if="query && !animeListLoading" xs12>
      <v-card>
        <v-container
          fluid
          grid-list-lg>
          <v-layout
            row
            wrap>

            <v-progress-linear
              v-if="animeInfoLoading || animeLoading"
              :indeterminate="animeInfoLoading || animeLoading"
              :active="animeInfoLoading || animeLoading"
            />
            <v-flex v-if="query && !animeInfoLoading" xs12>
              <anime-info :animeInfo="animeInfo"></anime-info>
            </v-flex>

            <v-flex v-if="query && !animeLoading" xs12>
              <anime-episode :anime="anime" :query="query"></anime-episode>
            </v-flex>

            <v-flex
              v-if="animeError"
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
                        <div>{{animeError}}</div>
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
  FETCH_ANIME
} from '../store/actions.types'
import { mapGetters } from 'vuex'
import AnimeInfo from '@/components/AnimeInfo'
import AnimeEpisode from '@/components/AnimeEpisode'

export default {
  name: 'anime',
  components: { AnimeInfo, AnimeEpisode },
  data () {
    return {
      q: '',
      query: '',
      dialog: false
    }
  },
  computed: {
    ...mapGetters({
      animeList: 'anime/animeList',
      animeListLoading: 'anime/animeListLoading',
      animeInfo: 'anime/animeInfo',
      animeInfoLoading: 'anime/animeInfoLoading',
      anime: 'anime/anime',
      animeLoading: 'anime/animeLoading',
      animeError: 'anime/animeError'
    })
  },
  mounted () {
    this.$store.dispatch(`anime/${FETCH_ANIME_LIST}`)
  },
  methods: {
    search () {
      this.query = this.q.title
      this.fetchAnimeInfo()
      this.fetchAnime()
    },
    fetchAnimeInfo () {
      this.$store.dispatch(`anime/${FETCH_ANIME_INFO}`, this.query)
    },
    fetchAnime () {
      this.$store.dispatch(`anime/${FETCH_ANIME}`, this.query)
    }
  }
}
</script>

<style>

</style>
