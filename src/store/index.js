import Vue from "vue";
import Vuex, { Store } from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: null,
    isLoaded: false,
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    },
    dataLoaded(state) {
      state.isLoaded = true;
    },
  },
  actions: {
    getData(context) {
      function sendRequest(
        method = "get",
        url = "http://localhost:3000/data",
        state
      ) {
        return fetch(url).then((res) => res.json());
      }

      sendRequest().then((data) => {
        context.commit("setData", data);
        context.commit('dataLoaded')
      }).catch(err => {
        context.commit("setData", err);
        context.commit('dataLoaded')
      });
    },
  },
  modules: {},
});
