import Vue from "vue";
import Vuex, {
  Store
} from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: null,
    isLoaded: false,
    filter: "asda",
    filtered: 'kekw',
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    },
    setFilter(state, filter) {
      state.filter = filter;
    },
    setFilteredData(state, filtered) {
      state.filtered = filtered;
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
    filterData(context) {


    },
    getFilter(context, filter) {
      context.commit('setFilter', filter)
      if (!!filter) {
        let filteredData = this.state.data.filter((element) => {
          return element.date == this.state.filter
        })
        context.commit('setFilteredData', filteredData)
      }else{
        context.commit('setFilteredData', this.state.data)
      }

    },
    getAdminData(context, filter) {
      function sendRequest(
        method = "get",
        url = "http://localhost:3000/dominatus",
        state
      ) {
        return fetch(url).then((res) => res.json());
      }

      sendRequest().then((data) => {
        context.commit("setData", data);

      }).catch(err => {
        context.commit("setData", err);

      });
    },
  },
  modules: {},
});