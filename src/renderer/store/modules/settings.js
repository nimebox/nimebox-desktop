import { SET_DARK_THEME } from '../actions.types'

const state = {
  dark: false
}

const mutations = {
  [SET_DARK_THEME] (state, payload) {
    state.dark = payload
  }
}

const getters = {
  dark: state => state.dark
}

export default {
  state,
  mutations,
  getters
}
