<template>
  <v-app :dark="dark">
    <systembar></systembar>
    <toolbar></toolbar>
    <v-footer fixed>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Systembar from '@/components/Systembar'
  import Toolbar from '@/components/Toolbar'

  export default {
    name: 'NimeboxDesktop',
    computed: {
      ...mapGetters({
        dark: 'isDark'
      })
    },
    components: { Systembar, Toolbar }
  }
</script>

<style lang="stylus">
  @import './stylus/main.styl'
  body, html {
    overflow: hidden
  }
</style>
