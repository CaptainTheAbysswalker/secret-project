import Vue from "vue";
import Vuex, { Store } from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: null,
    isLoaded: false,
    filter: "asda",
    filtered: "kekw",
    selectedTimes: [],
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
    selectTime(state, id) {
      state.selectedTimes.push(id);
    },
    removeSelected(state, index) {
      state.selectedTimes.splice(index, 1);
    },
    clearSelected(state) {
      state.selectedTimes = [];
    },
  },
  actions: {
    getData(context) {
      function sendRequest(
        method = "get",
        url = "https://secrethydra-server.herokuapp.com/data",
        state
      ) {
        return fetch(url, {
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
      }

      sendRequest()
        .then((data) => {
          context.commit("setData", data);
          context.commit("dataLoaded");
        })
        .catch((err) => {
          context.commit("setData", err);
          context.commit("dataLoaded");
        });
    },
    filterData(context) {},
    getFilter(context, filter) {
      context.commit("setFilter", filter);
      if (!!filter) {
        let filteredData = this.state.data.filter((element) => {
          return element.date == this.state.filter;
        });
        context.commit("setFilteredData", filteredData);
      } else {
        context.commit("setFilteredData", this.state.data);
      }
    },
    selectTime(context, id) {
      let findIndex = this.state.selectedTimes.findIndex(
        (element) => element == id
      );
      if (!(findIndex + 1)) {
        context.commit("selectTime", id);
      } else {
        context.commit("removeSelected", findIndex);
      }
    },
    clearSelected(context) {
      context.commit("clearSelected");
    },

    getAdminData(context, filter) {
      function sendRequest(
        method = "get",
        url = "https://secrethydra-server.herokuapp.com/dominatus",
        state
      ) {
        return fetch(url, {
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
      }

      sendRequest()
        .then((data) => {
          context.commit("setData", data);
        })
        .catch((err) => {
          context.commit("setData", err);
        });
    },
  },
  modules: {},
});
