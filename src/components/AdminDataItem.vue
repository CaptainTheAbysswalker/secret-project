<template>
  <ul>
    <h1 v-if="isRemoved">Item removed</h1>
    <h1 v-else>{{ data.date }}</h1>
    <li>
      time: <span>{{ data.time }}</span>
    </li>
    <li v-if="!data.isAvaible">
      isAvaible:
      <span >{{ data.isAvaible }}</span>
    </li>
    <li>
      Name: 
      <span v-if="data.Name">{{ data.Name }}</span>
    </li>
    <li>
      Phone: 
      <span v-if="data.Telephone">{{ data.Telephone }}</span>
    </li>
    <li>
      <div class="buttons">
        <button
          v-on:click="clearItem(data._id)"
          v-if="!data.isAvaible"
          v-bind:disabled="!isComplete"
        >
          Clear
        </button>
        <button v-on:click="deleteItem(data._id)" v-bind:disabled="!isComplete">
          Remove
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import sendRequest from "../req/request";

export default {
  name: "AdminDataItem",
  props: ["data"],
  data: () => ({
    isComplete: true,
    isRemoved: false,
  }),
  methods: {
    deleteItem(id) {
      this.isComplete = false;
      let data = { id: id };
      sendRequest("DELETE", "dominatus", data)
        .then((data) => {
          this.isComplete = true;
          this.isRemoved = true
          this.$store.dispatch("getAdminData");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    clearItem(id) {
      this.isComplete = false;
      let data = { id: id };
      sendRequest("PATCH", "dominatus", data)
        .then((data) => {
          this.isComplete = true;
          this.$store.dispatch("getAdminData");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
ul {
  width: 320px;
  height: 250px;
  background: black;
  border: 1px solid #f2c94c;
  border-radius: 8px;
  margin-right: 15px;
  margin-bottom: 15px;
  color: #f2c94c;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
li {
  width: 70%;
  display: flex;
  justify-content: space-between;
  text-align: right;
}
h1 {
  margin: 0;
}
span {
  font-weight: bold;
}
.buttons {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
@media (max-width: 900px) {
  ul {
    margin-right: 0;
  }
}
</style>