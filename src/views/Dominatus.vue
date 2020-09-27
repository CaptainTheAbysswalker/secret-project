<template>
  <div class="dominatus">
    <div class="filterBox">
      <ul class="filter">
        <li>
          <ul class="getData">
            <h3>Get data</h3>
            <li v-on:click="setFilter('26.09.2020')">Svobodnie</li>
            <li v-on:click="setFilter('27.09.2020')">Zapisannie</li>
            <li v-on:click="setFilter('')">All</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="filteredData">
      <h1>Hydra dominatus</h1>
      <h2>{{this.$store.state.filter}}</h2>
      <ul class="data">
        <li v-for="date in getState" v-bind:key="date.id">{{date}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dominatus",
  methods: {
    setFilter(filter) {
      this.$store.dispatch("getFilter", filter);
    }
  },
  computed: {
    getState: function() {
      return this.$store.state.filtered;
    }
  },
  beforeCreate: async function() {
    this.$store.dispatch("getAdminData");
  }
};
</script>

<style lang="scss" scoped>
.dominatus {
  display: flex;
  width: 100%;
  height: 100%;
}
.filterBox {
  width: 20%;
  height: 100px;
  background: aqua;
}
.filter {
  list-style: none;
}
</style>