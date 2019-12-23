import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hotels: [],
    selected: -1
  },
  mutations: {
    updateHotels(state, payload) {
      state.hotels = payload;
      for (var c in state.hotels) {
        if (state.hotels[c].selected) {
          state.selected = c;
        }
      }
    },
    selectHotel(state, payload) {
      for (var c in state.hotels) {
        state.hotels[c].selected = false;
      }
      state.hotels[payload].selected = true;
      state.selected = payload;
    }
  },
  actions: {},
  modules: {}
});
