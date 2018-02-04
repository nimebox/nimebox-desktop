<template>
  <v-system-bar app fixed window dark class="windowBar">
    <div>NIMEBOX DESKTOP</div>
    <v-spacer></v-spacer>
    <v-btn small flat @click="minimize" class="btns">
      <v-icon>remove</v-icon>
    </v-btn>
    <v-btn small flat @click="maximize" class="btns">
      <v-icon>check_box_outline_blank</v-icon>
    </v-btn>
    <v-btn small flat @click="close" class="btns">
      <v-icon>close</v-icon>
    </v-btn>
  </v-system-bar>
</template>

<script>
  export default {
    name: 'Systembar',
    methods: {
      minimize () {
        let window = this.$electron.remote.BrowserWindow.getFocusedWindow()
        window.minimize()
      },
      maximize () {
        let window = this.$electron.remote.BrowserWindow.getFocusedWindow()
        if (window.isMaximized()) {
          window.unmaximize()
        } else {
          window.maximize()
        }
      },
      close () {
        let window = this.$electron.remote.BrowserWindow.getFocusedWindow()
        window.close()
      }
    }
  }
</script>

<style scoped lang="stylus">
  .windowBar {
    -webkit-app-region: drag
  }

  .btns {
    -webkit-app-region: no-drag
  }
</style>
