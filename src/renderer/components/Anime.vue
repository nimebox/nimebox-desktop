<template>
  <div>
 
    <v-select
      prepend-icon="search" 
      label="Search"
      flat 
      :items="animes.list"
      cache-items
      combobox
      item-text="title" 
      item-value="title"
      v-model="q" 
      @keyup.enter="search"
      > </v-select>
           </v-flex >
        <v-flex xs12>
               <v-card>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>

        <v-flex xs12 v-if="query != null && !error && loaded">
          <v-card>
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex xs4>
                  <v-card-media :src="mal.picture" height="350px" contain>
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-media>
                </v-flex>
                <v-flex xs12>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline mb-1">{{mal.title}}
                        <v-chip label color="accent">
                          <v-icon left>star</v-icon>{{mal.score}}/10</v-chip>
                      </div>
                      <v-chip outline>Type: {{mal.type}}</v-chip>
                      <v-chip outline>Episodes: {{mal.episodes}}</v-chip>
                      <v-chip outline>Ranked: {{mal.ranked}}</v-chip>
                      <v-chip outline>Members: {{mal.members}}</v-chip>
                      <v-chip outline>Aired: {{mal.aired}}</v-chip>
                      <div>{{mal.synopsis}}</div>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <v-chip v-for="(genre, key) in mal.genres" :key="key" label color="pink" text-color="white">
                      <v-icon dark left>label</v-icon>{{genre}}
                    </v-chip>
                  </v-card-text>
                </v-flex>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="pink" @click="$electron.shell.openExternal(mal.url)">
                    <v-icon>link</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>


          <v-flex xs12 v-if="query != null && !error && loadedData">
            <v-card>
              <v-expansion-panel popout focusable>
                <v-expansion-panel-content v-for="(item, key) in anime.list" :key="key">
                  <div slot="header" @click.once="animeEpData(item.number)" >

                    <v-list-tile avatar>

                      <v-list-tile-action>
                        <v-avatar>{{item.number}}</v-avatar>
                      </v-list-tile-action>

                      <v-list-tile-content>
                        <v-list-tile-title v-text="item.description"></v-list-tile-title>
                      </v-list-tile-content>

                    </v-list-tile>

                  </div>

                  <v-tabs show-arrows>
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab v-for="(ep, key) in animeEp" :key="key" >
                      {{ ep.host }}
                    </v-tab>
                    <v-tabs-items>
                      <v-tab-item v-for="(iep, ikey) in animeEp" :key="ikey" >
                        <v-card flat>
                          <v-card-text> {{ iep.player }}</v-card-text>
                        </v-card>
                      </v-tab-item>
                    </v-tabs-items>
                  </v-tabs>

                </v-expansion-panel-content>
              </v-expansion-panel>
           </v-card>
          </v-flex>

      <v-flex xs12 v-if="error || errorData">
            <v-container fluid grid-list-lg>
              <v-layout row>

                <v-flex xs12>
                  <div>
                   <v-alert outline color="error" icon="warning" :value="true">
                      Error fetching data for query: <b>{{query}}</b>
                    </v-alert>
                  </div>
                </v-flex>

              </v-layout>
            </v-container>
        </v-flex>

        <v-flex xs12 v-if="!loaded">
            <v-container fluid grid-list-lg>
              <v-layout row>

                <v-flex xs12>
                  <div>
                   <v-alert outline color="info" icon="info" :value="true">
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
import { mapGetters } from 'vuex'
import mal from 'mal-scraper'
import api from '../api'
export default {
  name: 'Anime',
  computed: {
    ...mapGetters({
      animes: 'animes'
    })
  },
  data () {
    return {
      q: '',
      query: '',
      mal: {
        title: '',
        url: '',
        synopsis: '',
        picture: '',
        aired: '?',
        episodes: '?',
        score: '?',
        type: '?',
        genres: [],
        members: '',
        ranked: ''
      },
      anime: [],
      error: false,
      errorData: false,
      loaded: false,
      loadedData: false,
      animeEp: []
    }
  },
  mounted () {
    this.animesData()
  },
  methods: {
    async search () {
      this.query = this.q.title
      await this.animeInfo()
      await this.animeData()
    },
    async animeInfo () {
      try {
        console.log(this.query)
        const response = await mal.getInfoFromName(this.query)
        const data = response
        console.log(data)

        this.mal.title = data.title
        this.mal.url = data.url
        this.mal.picture = data.picture
        this.mal.synopsis = data.synopsis
        this.mal.aired = data.aired
        this.mal.episodes = data.episodes
        this.mal.score = data.score
        this.mal.type = data.type
        this.mal.genres = data.genres
        this.mal.members = data.members
        this.mal.ranked = data.ranked
        this.error = false
        this.loaded = true
      } catch (err) {
        console.log(err)
        this.error = true
        this.loaded = false
      }
    },
    async animeData () {
      try {
        console.log(this.query)
        const response = await api.get(`v1/anime/${this.query}`)
        const data = response.data
        console.log(data)
        this.anime = data

        this.errorData = false
        this.loadedData = true
      } catch (err) {
        console.log(err)
        this.errorData = true
        this.loadedData = false
      }
    },
    async animeEpData (n) {
      console.log(`${this.query}/${n}`)
      try {
        console.log(this.query)
        const response = await api.get(`v1/anime/${this.query}/${n}`)
        const data = response.data
        console.log(data)
        this.animeEp = data

        this.errorData = false
        this.loadedData = true
      } catch (err) {
        console.log(err)
        this.errorData = true
        this.loadedData = false
      }
    },
    async animesData () {
      try {
        const response = await api.get(`v1/anime`)
        const data = response.data
        console.log(data)
        // this.animes = data
        this.$store.commit('setAnimes', data)
        this.errorData = false
        this.loadedData = true
      } catch (err) {
        console.log(err)
        this.errorData = true
        this.loadedData = false
      }
    }
  }
}
</script>

<style>
</style>