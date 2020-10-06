<template>
  <table>
    <tr>
      <th>Date</th>
      <th>Time</th>
      <!-- <th>isAvaible</th> -->
      <th>Name</th>
      <th>Phone</th>
      <th>Clear item</th>
      <th>Remove item</th>
    </tr>
    <AdminDataItem
      v-for="item in getState"
      v-bind:data="item"
      v-bind:key="item._id"
    >
    </AdminDataItem>
  </table>
</template>

<script>
import AdminDataItem from "@/components/AdminDataItem.vue";

export default {
  name: "AdminDataList",
  components: {
    AdminDataItem,
  },
  computed: {
    getState: function () {
      return this.$store.state.filtered;
    },
  },
};
</script>

<style lang="scss" scoped>
th {
  border: 1px solid black;
}
table {
  background: #f2c94c;
  border-collapse: collapse;
  margin-bottom: 15px;
  width: 500px;
}
</style>