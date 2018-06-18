<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: 'animeInfo',
  props: ['animeInfo']
}
</script>
