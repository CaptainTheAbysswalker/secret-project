<template>
  <tr>
    <td>{{ data.date }}</td>
    <td>{{ data.time }}</td>
    <!-- <td>{{ data.isAvaible }}</td> -->
    <td>{{ data.Name }}</td>
    <td>{{ data.Telephone }}</td>
    <td>
      <button
        v-on:click="clearItem(data._id)"
        v-if="!data.isAvaible"
        v-bind:disabled="!isComplete"
      >
        Clear
      </button>
    </td>
    <td>
      <button v-on:click="deleteItem(data._id)" v-bind:disabled="!isComplete">
        Remove
      </button>
    </td>
  </tr>
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
td {
  padding: 5px;
  border: 1px solid black;
}
tr {
  border: 1px solid black;
  padding: 0;
  box-sizing: border-box;
}
</style>