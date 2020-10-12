import Vue from "vue";
import Vuex, { Store } from "vuex";
import sendRequest from "../req/request";

Vue.use(Vuex);
const initialSate ={
  data: null,
  isAdminLoaded: true,
  isLoaded: true,
  isSelected: false,
  isSaved: false,
  filter: "",
  filtered: "",
  selectedTimes: [],
  dataForSave: [],
  userSelectedData: [],
  showAdminForm: false,
}

export default new Vuex.Store({
  state: {...initialSate },
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
    adminLoaded(state) {
      state.isAdminLoaded = !state.isAdminLoaded;
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
    prepareToSave(state, item) {
      state.dataForSave.push(item);
    },
    removePrepared(state, index) {
      state.dataForSave.splice(index, 1);
    },
    clearPrepared(state) {
      state.dataForSave = [];
    },
    setUserSelectedData(state, element) {
      state.userSelectedData.push(element);
    },
    removeUserSelected(state, index) {
      state.userSelectedData.splice(index, 1);
    },
    clearUserSelected(state) {
      state.userSelectedData = [];
    },
    setSelectedStatus(state) {
      state.isSelected = !state.isSelected;
    },
    adminFormVisible(state) {
      state.showAdminForm = !state.showAdminForm;
    },
    saveDataStatus(state) {
      state.isSaved = !state.isSaved;
    },
    resetState(state){
      for(let st in state){
        Vue.set(state, st, initialSate[st])
      }
    },
  },
  actions: {
    getData(context) {
      sendRequest("get", "data")
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
      if (filter || filter === false) {
        let filteredData = this.state.data.filter((element) => {
          return element.isAvaible == this.state.filter;
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
    removeUserSelected(context, id) {
      let findIndex = this.state.userSelectedData.findIndex(
        (element) => element == id
      );
      context.commit("removeUserSelected", findIndex);
    },
    clearSelected(context) {
      context.commit("clearSelected");
    },
    prepareToSave(context, item) {
      context.commit("prepareToSave", item);
    },
    removePrepared(context, id) {
      let findIndex = this.state.dataForSave.findIndex(
        (element) => element.id == id
      );
      context.commit("removePrepared", findIndex);
    },
    setUserSelectedData(context, element) {
      context.commit("setUserSelectedData", element);
    },

    getAdminData(context, filter) {
      context.commit("adminLoaded");
      sendRequest("get", "dominatus")
        .then((data) => {
          context.commit("setData", data);
          context.commit("setFilteredData", data);
          context.commit("adminLoaded");
        })
        .catch((err) => {
          context.commit("adminLoaded");
          console.log(err.message);
        });
    },
  },
  modules: {},
});
