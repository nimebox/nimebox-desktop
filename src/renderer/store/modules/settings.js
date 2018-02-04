const state = {
  dark: false
}

const mutations = {
  setDark (state, dark) {
    state.dark = dark
  }
}

const getters = {
  isDark: state => state.dark
}

export default {
  state,
  mutations,
  getters
}
