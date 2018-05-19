import { FETCH_NEWS, SET_NEWS_LOADED } from '../actions.types'
import api from '../../api'

const state = {
  news: [],
  newsLoaded: false
}

const actions = {
  async [FETCH_NEWS] (store) {
    try {
      const response = await api.get(`v1/news`)
      store.commit(FETCH_NEWS, response.data)
      store.commit(SET_NEWS_LOADED, true)
    } catch (err) {
      store.commit(SET_NEWS_LOADED, false)
      throw new Error(err)
    }
  }
}

const mutations = {
  [FETCH_NEWS] (state, payload) {
    state.news = payload
  },
  [SET_NEWS_LOADED] (state, payload) {
    state.newsLoaded = payload
  }
}

const getters = {
  news: state => state.news,
  newsLoaded: state => state.newsLoaded
}

export default {
  state,
  actions,
  mutations,
  getters
}
