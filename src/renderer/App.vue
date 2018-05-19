<template>
  <v-app :dark="dark">
    <systembar/>
    <toolbar/>
    <v-footer fixed>
      <v-spacer/>
      <div>Nimebox &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Systembar from '@/components/Systembar'
import Toolbar from '@/components/Toolbar'

export default {
  name: 'NimeboxDesktop',
  components: { Systembar, Toolbar },
  computed: {
    ...mapGetters({
      dark: 'dark'
    })
  }
}
</script>

<style>
  body, html {
    overflow: hidden;
  }
</style>
