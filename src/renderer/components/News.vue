<template>
<div>
  <v-progress-linear 
    :indeterminate="!loaded"
    :active="!loaded"
    v-if="!loaded"
  ></v-progress-linear>
    <v-card v-if="loaded">
      <v-container fluid style="min-height: 0;" grid-list-lg>
        <v-layout row wrap>

          <v-flex xs12 v-for="(card, key) in news" :key="key">
            <v-card>
              <v-container fluid grid-list-lg>
                <v-layout row>

                  <v-flex xs6>
                    <v-card-media :src="card.image" height="100px" contain></v-card-media>
                  </v-flex>

                  <v-flex xs6>
                    <div>
                      <h4>{{card.title}}</h4>
                      <div class="grey--text">{{card.description}}</div>
                    </div>
                  </v-flex>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="$electron.shell.openExternal(card.url)">
                      <v-icon>link</v-icon>
                    </v-btn>
                  </v-card-actions>

                </v-layout>
              </v-container>
            </v-card>
          </v-flex>

        </v-layout>
      </v-container>
    </v-card>
</div>
</template>

<script>
  import api from '../api'
  export default {
    name: 'News',
    data () {
      return {
        news: [],
        loaded: false,
        error: true
      }
    },
    async mounted () {
      try {
        const response = await api.get(`v1/news`)
        const data = response.data
        console.log(data)
        this.news = data

        this.error = false
        this.loaded = true
      } catch (err) {
        console.log(err)
        this.error = true
      }
    }
  }
</script>

<style lang="stylus">
</style>