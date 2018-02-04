<template>
  <v-app :dark="dark">
    <system-bar></system-bar>
    <tool-bar></tool-bar>
    <v-footer fixed>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SystemBar from '@/components/SystemBar'
  import ToolBar from '@/components/ToolBar'

  export default {
    name: 'NimeboxDesktop',
    computed: {
      ...mapGetters({
        dark: 'isDark'
      })
    },
    components: { SystemBar, ToolBar }
  }
</script>

<style lang="stylus">
  @import './stylus/main.styl'
  body, html {
    overflow: hidden
  }
</style>
