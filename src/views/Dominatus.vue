<template>
  <div class="dominatus">
    <div class="filteredData" v-if="!this.$store.state.showAdminForm">
      <h1>Data</h1>
      <ul class="getData" v-if="this.$store.state.filtered">
        <li v-on:click="setFilter(true)" >Show avaible</li>
        <li v-on:click="setFilter(false)">Show reserved</li>
        <li v-on:click="setFilter('')">Show all</li>
      </ul>
      <AdminDataList v-if="this.$store.state.filtered" />
      <Loader v-else />
      <div class="buttons">
        <button v-on:click="showForm" v-bind:disabled="!this.$store.state.filtered">Create new</button>
        <button v-on:click="refreshData" v-bind:disabled="!this.$store.state.filtered">Refresh</button>
        <router-link tag="button" to="/">main</router-link>
      </div>
    </div>
    <CreateDataForm v-else />
  </div>
</template>

<script>
import AdminDataList from "@/components/AdminDataList.vue";
import Loader from "@/components/Loader.vue";
import CreateDataForm from "@/components/CreateDataForm.vue";

class SaveData {
  constructor(date, time) {
    (this.date = date), (this.time = time);
  }
}

export default {
  data: () => ({
    isShow: false,
    createdData: [],
    date: "",
    timeFrom: "",
    timeTo: "",
    isLoaded: false
  }),
  components: {
    AdminDataList,
    Loader,
    CreateDataForm,
  },
  name: "Dominatus",
  methods: {
    setFilter(filter) {
      this.$store.dispatch("getFilter", filter);
    },
    showForm() {
      this.$store.commit("adminFormVisible");
    },
    returnToData() {
      this.isShow = !this.isShow;
      this.date = this.timeFrom = this.timeTo = "";
      this.createdData = [];
    },
    refreshData() {
      this.$store.dispatch("getAdminData");
    },
  },
  mounted: function () {
    this.$store.dispatch("getAdminData");
  },
};
</script>

<style lang="scss" scoped>
.dominatus {
  /* min-height: 100vh; */
  overflow: auto;
  padding-bottom: 20px;
  display: flex;
  position: relative;
}

.filteredData {
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.getData {
  display: flex;
  color: #f2c94c;
  cursor: default;
  margin-bottom: 15px;
}
.getData li {
  margin-right: 10px;
}
.getData li:hover {
  color: #ff9100;
}
.createForm {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
}
.formSelect {
  display: flex;
}
.timeSelect {
  display: flex;
}
h1 {
  color: #f2c94c;
  margin-bottom: 0;
}
.buttons {
  width: 320px;
  display: flex;
  justify-content: space-between;
}
</style>