<template>
  <div>
    <v-navigation-drawer fixed app v-model="drawer" temporary>
      <v-list dense>

        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark tabs app fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-text-field prepend-icon="search" label="Search" solo-inverted class="mx-3" flat v-model="q" @keyup.enter="search">
      </v-text-field>
      <v-tabs slot="extension" centered slider-color="white" color="transparent">
        <v-tab v-for="(item, key) in items" :key="key" :to="item.to">
          {{ item.name }}
        </v-tab>
      </v-tabs>
      <v-toolbar-side-icon @click="changeTheme">
        <v-icon>invert_colors</v-icon>
      </v-toolbar-side-icon>
    </v-toolbar>
    <v-tabs-items>
      <v-content>
        <v-container fluid class="main-container">
          <v-slide-y-transition mode="out-in">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </v-slide-y-transition>
        </v-container>
      </v-content>
    </v-tabs-items>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'Toolbar',
    computed: {
      ...mapGetters({
        dark: 'isDark'
      })
    },
    data () {
      return {
        drawer: null,
        q: '',
        items: [
          {
            name: 'News',
            to: '/'
          },
          {
            name: 'Anime',
            to: '/anime'
          },
          {
            name: 'Manga',
            to: '/manga'
          }
        ]
      }
    },
    methods: {
      search () {
        console.log('q ' + this.q)
        this.$store.commit('setQuery', this.q)
        this.$router.push({
          path: `/anime`
        })
      },
      changeTheme () {
        if (this.dark) {
          this.$store.commit('setDark', false)
        } else {
          this.$store.commit('setDark', true)
        }
      }
    }
  }
</script>

<style lang="stylus">
  .main-container {
    max-height: calc(100vh - 180px) 
    height: auto 
    overflow-y: auto 
    overflow-x: hidden
  }
</style>