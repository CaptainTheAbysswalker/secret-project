<template>
  <li>
    <div class="data">
      <span>{{ data.date }}</span>
      <span>{{ data.time }}</span>
      <span v-if="data.isAvaible">Svobodno</span>
      <span>{{ data.Name }}</span>
      <span>{{ data.Phone }}</span>
    </div>
    <div class="buttons">
      <button v-on:click="clearItem(data._id)">Clear</button>
      <button v-on:click="deleteItem(data._id)">Remove</button>
    </div>
  </li>
</template>

<script>
export default {
  name: "AdminDataItem",
  props: ["data"],
  methods: {
    deleteItem(id) {
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
      let data = {id: id}
      deleteRequest("http://localhost:3000/dominatus", data).then((data) =>
        console.log(data)
      );
    },

    clearItem(id){
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
      let data = {id: id}
      clearRequest("http://localhost:3000/dominatus", data).then((data) =>
        console.log(data)
      );
    }
  },
};
</script>
<style lang="scss" scoped>
li {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
.data {
  width: 80%;
  display: flex;
  justify-content: space-between;
}
.buttons {
  width: 20%;
  display: flex;
  justify-content: space-between;
}
</style>