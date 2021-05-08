import Vue from 'vue';
import Vuex from 'vuex';
import { SearchService } from '@/services';
import types from './types.store';

Vue.use(Vuex);

const {
  STORE_SET_HITS,
  STORE_UPDATE_INPUT,
  STORE_SET_TOTAL_HITS,
  STORE_SET_PROGRESS,
  STORE_SET_PAGE,
  STORE_SET_TOTAL_PAGES,
  STORE_SET_PER_PAGE,
  STORE_REQUEST_HITS,
  STORE_SET_ACTIVE_HIT,
  STORE_CLEAR_HITS,
} = types;

export default new Vuex.Store({
  state: {
    search: '',
    hits: [],
    page: 0,
    totalPages: 0,
    hitsPerPage: 10,
    totalHits: 0,
    activeHit: null,
    inProgress: false,
  },
  mutations: {
    [STORE_UPDATE_INPUT](state, text) {
      state.search = text;
    },
    [STORE_SET_HITS](state, data) {
      state.hits = data;
    },
    [STORE_SET_PAGE](state, page) {
      state.page = page;
    },
    [STORE_SET_PER_PAGE](state, perPage) {
      state.hitsPerPage = perPage;
    },
    [STORE_SET_TOTAL_PAGES](state, totalPages) {
      state.totalPages = totalPages;
    },
    [STORE_SET_PROGRESS](state, data) {
      state.inProgress = data;
    },
    [STORE_SET_TOTAL_HITS](state, data) {
      state.totalHits = data;
    },
    [STORE_SET_ACTIVE_HIT](state, hit) {
      state.activeHit = hit;
    },
  },
  actions: {
    async [STORE_UPDATE_INPUT]({ commit, dispatch }, text) {
      commit(STORE_UPDATE_INPUT, text);

      if (text) {
        await dispatch(STORE_REQUEST_HITS);
      } else {
        await dispatch(STORE_CLEAR_HITS);
      }
    },
    async [STORE_SET_PAGE]({ commit, dispatch }, page) {
      commit(STORE_SET_PAGE, page);
      await dispatch(STORE_REQUEST_HITS);
    },
    async [STORE_SET_PER_PAGE]({ commit, dispatch }, perPage) {
      commit(STORE_SET_PER_PAGE, perPage);
      await dispatch(STORE_REQUEST_HITS);
    },
    async [STORE_REQUEST_HITS]({ commit, state }) {
      commit(STORE_SET_PROGRESS, true);

      try {
        const response = await SearchService.search({
          text: state.search,
          page: state.page,
          hitsPerPage: state.hitsPerPage,
        });

        commit(STORE_SET_PAGE, response.page);
        commit(STORE_SET_TOTAL_HITS, response.nbHits);
        commit(STORE_SET_TOTAL_PAGES, response.nbPages);
        commit(STORE_SET_HITS, response.hits);
        commit(STORE_SET_PROGRESS, false);
      } catch (e) {
        console.error(e);
      }
    },
    async [STORE_SET_ACTIVE_HIT]({ commit }, hit) {
      // const response = await JsdelivrService.getPackage(hit.name);
      // console.log('response', response);
      commit(STORE_SET_ACTIVE_HIT, hit);
    },
    async [STORE_CLEAR_HITS]({ commit }) {
      commit(STORE_SET_PAGE, 0);
      commit(STORE_SET_HITS, []);
      commit(STORE_SET_TOTAL_PAGES, 0);
      commit(STORE_SET_TOTAL_HITS, 0);
    },
  },
  modules: {
  },
});
