const state = {
  dark: false,
  animes: []
}

const mutations = {
  setDark (state, dark) {
    state.dark = dark
  },
  setAnimes (state, animes) {
    state.animes = animes
  }
}

const getters = {
  isDark: state => state.dark,
  animes: state => state.animes
}

export default {
  state,
  mutations,
  getters
}
