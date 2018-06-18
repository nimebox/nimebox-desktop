import {
  FETCH_ANIME_LIST,
  SET_ANIME_LIST_LOADING,
  SET_ANIME_LIST_ERROR,
  FETCH_ANIME_INFO,
  SET_ANIME_INFO_LOADING,
  SET_ANIME_INFO_ERROR,
  FETCH_ANIME,
  SET_ANIME_LOADING,
  SET_ANIME_ERROR,
  FETCH_ANIME_EPISODE,
  SET_ANIME_EPISODE_LOADING,
  SET_ANIME_EPISODE_ERROR
} from '../../actions.types'
import * as mal from 'mal-scraper'
import api from '../../../api'

const state = {
  animeList: null,
  animeListLoading: false,
  animeListError: false,
  animeInfo: null,
  animeInfoLoading: false,
  animeInfoError: false,
  anime: null,
  animeLoading: false,
  animeError: false,
  animeEpisode: null,
  animeEpisodeLoading: false,
  animeEpisodeError: false
}

const actions = {
  async [FETCH_ANIME_LIST] (store) {
    store.commit(SET_ANIME_LIST_LOADING, true)
    try {
      const response = await api.get(`v1/anime`)
      store.commit(FETCH_ANIME_LIST, response.data)
    } catch (err) {
      console.error(err)
      store.commit(SET_ANIME_LIST_ERROR, err.message)
    } finally {
      store.commit(SET_ANIME_LIST_LOADING, false)
    }
  },
  async [FETCH_ANIME_INFO] (store, query) {
    store.commit(SET_ANIME_INFO_LOADING, true)
    try {
      const data = await mal.getInfoFromName(query)
      store.commit(FETCH_ANIME_INFO, data)
    } catch (err) {
      console.error(err)
      store.commit(SET_ANIME_INFO_ERROR, err.message)
    } finally {
      store.commit(SET_ANIME_INFO_LOADING, false)
    }
  },
  async [FETCH_ANIME] (store, query) {
    store.commit(SET_ANIME_LOADING, true)
    try {
      const response = await api.get(`v1/anime/${query}`)
      store.commit(FETCH_ANIME, response.data)
    } catch (err) {
      console.error(err)
      store.commit(SET_ANIME_ERROR, err.message)
    } finally {
      store.commit(SET_ANIME_LOADING, false)
    }
  },
  async [FETCH_ANIME_EPISODE] (store, {query, number}) {
    store.commit(SET_ANIME_EPISODE_LOADING, true)
    try {
      const response = await api.get(`v1/anime/${query}/${number}`)
      store.commit(FETCH_ANIME_EPISODE, response.data)
    } catch (err) {
      console.error(err)
      store.commit(SET_ANIME_EPISODE_ERROR, err.message)
    } finally {
      store.commit(SET_ANIME_EPISODE_LOADING, false)
    }
  }
}

const mutations = {
  [FETCH_ANIME_LIST] (state, payload) {
    state.animeList = payload
  },
  [SET_ANIME_LIST_LOADING] (state, payload) {
    state.animeListLoading = payload
  },
  [SET_ANIME_LIST_ERROR] (state, payload) {
    state.animeListError = payload
  },
  [FETCH_ANIME_INFO] (state, payload) {
    state.animeInfo = payload
  },
  [SET_ANIME_INFO_LOADING] (state, payload) {
    state.animeInfoLoading = payload
  },
  [SET_ANIME_INFO_ERROR] (state, payload) {
    state.animeInfoError = payload
  },
  [FETCH_ANIME] (state, payload) {
    state.anime = payload
  },
  [SET_ANIME_LOADING] (state, payload) {
    state.animeLoading = payload
  },
  [SET_ANIME_ERROR] (state, payload) {
    state.animeError = payload
  },
  [FETCH_ANIME_EPISODE] (state, payload) {
    state.animeEpisode = payload
  },
  [SET_ANIME_EPISODE_LOADING] (state, payload) {
    state.animeEpisodeLoading = payload
  },
  [SET_ANIME_EPISODE_ERROR] (state, payload) {
    state.animeEpisodeError = payload
  }
}

const getters = {
  animeList: state => state.animeList,
  animeListLoading: state => state.animeListLoading,
  animeListError: state => state.animeListError,
  animeInfo: state => state.animeInfo,
  animeInfoLoading: state => state.animeInfoLoading,
  animeInfoError: state => state.animeInfoError,
  anime: state => state.anime,
  animeLoading: state => state.animeLoading,
  animeError: state => state.animeError,
  animeEpisode: state => state.animeEpisode,
  animeEpisodeLoading: state => state.animeEpisodeLoading,
  animeEpisodeError: state => state.animeEpisodeError
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
