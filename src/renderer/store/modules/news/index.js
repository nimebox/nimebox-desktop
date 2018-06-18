import { FETCH_NEWS, SET_NEWS_LOADING, SET_NEWS_ERROR } from '../../actions.types'
import api from '../../../api'

const state = {
  loading: false,
  error: false,
  items: []
}

const actions = {
  async [FETCH_NEWS] (store) {
    store.commit(SET_NEWS_LOADING, true)
    try {
      const response = await api.get(`v1/news`)
      store.commit(FETCH_NEWS, response.data)
    } catch (err) {
      console.error(err)
      store.commit(SET_NEWS_ERROR, err.message)
    } finally {
      store.commit(SET_NEWS_LOADING, false)
    }
  }
}

const mutations = {
  [FETCH_NEWS] (state, payload) {
    state.items = payload
  },
  [SET_NEWS_LOADING] (state, payload) {
    state.loading = payload
  },
  [SET_NEWS_ERROR] (state, payload) {
    state.error = payload
  }
}

const getters = {
  items: state => state.items,
  loading: state => state.loading,
  error: state => state.error,
  isEmpty: state => !state.items.length
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
