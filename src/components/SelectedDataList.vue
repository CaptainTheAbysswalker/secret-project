<template>
  <table>
    <caption>
      Your Selected Times
    </caption>
    <tr>
      <th>Date</th>
      <th>Time</th>
      <th>Remove</th>
    </tr>
    <tr v-for="item in getUserSelected" v-bind:key="item.id">
      <td>{{ item.date }}</td>
      <td>{{ item.time }}</td>
      <td>
        <button class="remove" v-on:click="removeSelected(item.id)">
          remove
        </button>
      </td>
    </tr>
  </table>
</template>

<script>
import AdminDataItem from "@/components/AdminDataItem.vue";

export default {
  name: "AddDataList",
  components: {},
  methods: {
    removeSelected(id) {
      this.$store.commit("removeSelected", id);
      this.$store.dispatch("removeUserSelected", id);
    },
  },
  computed: {
    getUserSelected() {
      return this.$store.state.userSelectedData;
    },
  },
};
</script>

<style lang="scss" scoped>
caption {
  color: #f2c94c;
}
th {
  border: 1px solid black;
}
table {
  box-sizing: border-box;
  min-width: 320px;
  background: #f2c94c;
  border-collapse: collapse;
  color: black;
}
td {
  border: 1px solid black;
}
.remove {
  background: red;
}
</style>