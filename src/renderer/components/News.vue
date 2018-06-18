<template>
  <div>
    <v-progress-linear v-if="loading" :indeterminate="loading" :active="loading" />
    <v-card v-if="!loading">
      <v-container fluid style="min-height: 0;" grid-list-lg>
        <v-layout row wrap>

          <v-flex v-if="error" xs12>
            <div>
              <v-alert :value="true" outline color="error" icon="warning">
                Error fetching news data.
                <div>{{error}}</div>
              </v-alert>
            </div>
          </v-flex>

          <v-flex v-else v-for="(card, key) in news" :key="key" xs12>
            <v-card>
              <v-container fluid grid-list-lg>
                <v-layout row>

                  <v-flex xs6>
                    <v-card-media :src="card.image" height="100px" contain/>
                  </v-flex>

                  <v-flex xs6>
                    <div>
                      <h4>{{ card.title }}</h4>
                      <div class="grey--text">{{ card.description }}</div>
                    </div>
                  </v-flex>

                  <v-card-actions>
                    <v-spacer/>
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
import { FETCH_NEWS } from '../store/actions.types'
import { mapGetters } from 'vuex'

export default {
  name: 'news',
  computed: {
    ...mapGetters({
      news: 'news/items',
      loading: 'news/loading',
      error: 'news/error'
    })
  },
  mounted () {
    this.$store.dispatch(`news/${FETCH_NEWS}`)
  }
}
</script>
