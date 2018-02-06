<template>
  <div>
    <v-container fluid style="min-height: 0;" grid-list-lg>
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
                        <v-chip label color="yellow">
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

          <v-flex xs12>

            <v-expansion-panel>
              <v-expansion-panel-content v-for="(item, key) in anime" :key="key">
                <div slot="header">

                  <v-list-tile avatar>

                    <v-list-tile-action>
                      <v-avatar>{{item.number}}</v-avatar>
                    </v-list-tile-action>

                    <v-list-tile-content>
                      <v-list-tile-title v-text="item.description"></v-list-tile-title>
                    </v-list-tile-content>

                  </v-list-tile>

                </div>
                <v-card>
                  <v-card-text>other shit here</v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>

          </v-flex>

        </v-flex>

        <v-flex xs12 v-else>
          <v-card>
            <v-container fluid grid-list-lg>
              <v-layout row>

                <v-flex xs12>
                  <div>
                    <h1>{{msg}}</h1>
                  </div>
                </v-flex>

              </v-layout>
            </v-container>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import mal from 'mal-scraper'
  import api from '../api'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'Anime',
    computed: {
      ...mapGetters({
        query: 'getQuery'
      })
    },
    data () {
      return {
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
        msg: 'Empty :(',
        error: false,
        loaded: false
      }
    },
    methods: {
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
        }
      },
      async animeData () {
        try {
          console.log(this.query)
          const response = await api.get(`v1/anime/${this.query}`)
          const data = response.data
          console.log(data)
          this.anime = data

          this.error = false
        } catch (err) {
          console.log(err)
          this.error = true
        }
      }
    },
    watch: {
      query: {
        handler: function (newQuery, oldQuery) {
          console.log(`oldQuery: ${oldQuery} newQuery: ${newQuery}`)
          this.animeInfo()
          this.animeData()
        }
      },
      deep: true
    }
  }
</script>

<style>
</style>