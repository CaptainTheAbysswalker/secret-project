<template>
  <ul>
    <h1>{{ data.date }}</h1>
    <li>
      time: <span>{{ data.time }}</span>
    </li>
    <li>
      isAvaible: <span>{{ data.isAvaible }}</span>
    </li>
    <li>
      Name: <span>{{ data.Name }}</span>
    </li>
    <li>
      Phone: <span>{{ data.Telephone }}</span>
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
export default {
  name: "AdminDataItem",
  props: ["data"],
  data: () => ({
    isComplete: true,
  }),
  methods: {
    deleteItem(id) {
      this.isComplete = false;
      function deleteRequest(url, id) {
        return fetch(url, {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id),
        }).then((res) => res.text());
      }
      let data = { id: id };
      deleteRequest(
        "https://secrethydra-server.herokuapp.com/dominatus",
        data
      ).then((data) => {
        this.$destroy;
      });
    },

    clearItem(id) {
      this.isComplete = false;
      function clearRequest(url, id) {
        return fetch(url, {
          method: "PATCH",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id),
        }).then((res) => res.text());
      }
      let data = { id: id };
      clearRequest(
        "https://secrethydra-server.herokuapp.com/dominatus",
        data
      ).then((data) => {
        console.log(data);
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
.buttons{
  width: 100%;
  display: flex;
  justify-content: space-around;
}
@media (max-width: 900px){
  ul{
    margin-right: 0;
  }
}
</style>