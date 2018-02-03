const state = {
  query: ''
}

const mutations = {
  setQuery (state, query) {
    state.query = query
  }
}

const getters = {
  getQuery: state => state.query
}

const actions = {
}

export default {
  state,
  mutations,
  getters,
  actions
}
