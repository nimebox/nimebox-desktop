<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      temporary>
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

    <v-toolbar
      color="primary"
      dark
      app
      fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="(item, key) in items"
          :key="key"
          :to="item.to"
          flat> {{ item.name }}<v-icon  right>{{item.icon}}</v-icon></v-btn>
      </v-toolbar-items>
      <v-spacer/>
      <v-toolbar-side-icon @click="changeTheme">
        <v-icon>invert_colors</v-icon>
      </v-toolbar-side-icon>
    </v-toolbar>

    <v-content>
      <v-container
        fluid
        class="main-container">
        <v-slide-y-transition mode="out-in">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { SET_DARK_THEME } from '../store/actions.types'
import { mapGetters } from 'vuex'
export default {
  name: 'toolbar',
  data () {
    return {
      drawer: null,
      items: [
        {
          name: 'News',
          to: '/',
          icon: 'rss_feed'
        },
        {
          name: 'Anime',
          to: '/anime',
          icon: 'local_movies'
        },
        {
          name: 'Manga',
          to: '/manga',
          icon: 'books'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      dark: 'settings/dark'
    })
  },
  methods: {
    changeTheme () {
      if (this.dark) {
        this.$store.commit(`settings/${SET_DARK_THEME}`, false)
      } else {
        this.$store.commit(`settings/${SET_DARK_THEME}`, true)
      }
    }
  }
}
</script>

<style>
  .main-container {
    max-height: calc(100vh - 130px);
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
