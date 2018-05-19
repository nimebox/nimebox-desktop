import {
  FETCH_ANIME_LIST,
  SET_ANIME_LIST_LOADED,
  FETCH_ANIME_INFO,
  SET_ANIME_INFO_LOADED,
  FETCH_ANIME,
  SET_ANIME_LOADED,
  FETCH_ANIME_EPISODE,
  SET_ANIME_EPISODE_LOADED
} from '../actions.types'
import * as mal from 'mal-scraper'
import api from '../../api'

const state = {
  animeList: null,
  animeListLoaded: false,
  animeInfo: null,
  animeInfoLoaded: false,
  anime: null,
  animeLoaded: false,
  animeEpisode: null,
  animeEpisodeLoaded: false
}

const actions = {
  async [FETCH_ANIME_LIST] (store) {
    try {
      const response = await api.get(`v1/anime`)
      store.commit(FETCH_ANIME_LIST, response.data)
      store.commit(SET_ANIME_LIST_LOADED, true)
    } catch (err) {
      store.commit(SET_ANIME_LIST_LOADED, false)
      throw new Error(err)
    }
  },
  async [FETCH_ANIME_INFO] (store, query) {
    try {
      const data = await mal.getInfoFromName(query)
      store.commit(FETCH_ANIME_INFO, data)
      store.commit(SET_ANIME_INFO_LOADED, true)
    } catch (err) {
      store.commit(SET_ANIME_INFO_LOADED, false)
      throw new Error(err)
    }
  },
  async [FETCH_ANIME] (store, query) {
    try {
      const response = await api.get(`v1/anime/${query}`)
      store.commit(FETCH_ANIME, response.data)
      store.commit(SET_ANIME_LOADED, true)
    } catch (err) {
      store.commit(SET_ANIME_LOADED, false)
      throw new Error(err)
    }
  },
  async [FETCH_ANIME_EPISODE] (store, {query, number}) {
    try {
      const response = await api.get(`v1/anime/${query}/${number}`)
      store.commit(FETCH_ANIME_EPISODE, response.data)
      store.commit(SET_ANIME_EPISODE_LOADED, true)
    } catch (err) {
      store.commit(SET_ANIME_EPISODE_LOADED, false)
      throw new Error(err)
    }
  }
}

const mutations = {
  [FETCH_ANIME_LIST] (state, payload) {
    state.animeList = payload
  },
  [SET_ANIME_LIST_LOADED] (state, payload) {
    state.animeListLoaded = payload
  },
  [FETCH_ANIME_INFO] (state, payload) {
    state.animeInfo = payload
  },
  [SET_ANIME_INFO_LOADED] (state, payload) {
    state.animeInfoLoaded = payload
  },
  [FETCH_ANIME] (state, payload) {
    state.anime = payload
  },
  [SET_ANIME_LOADED] (state, payload) {
    state.animeLoaded = payload
  },
  [FETCH_ANIME_EPISODE] (state, payload) {
    state.animeEpisode = payload
  },
  [SET_ANIME_EPISODE_LOADED] (state, payload) {
    state.animeEpisodeLoaded = payload
  }
}

const getters = {
  animeList: state => state.animeList,
  animeListLoaded: state => state.animeListLoaded,
  animeInfo: state => state.animeInfo,
  animeInfoLoaded: state => state.animeInfoLoaded,
  anime: state => state.anime,
  animeLoaded: state => state.animeLoaded,
  animeEpisode: state => state.animeEpisode,
  animeEpisodeLoaded: state => state.animeEpisodeLoaded
}

export default {
  state,
  actions,
  mutations,
  getters
}
