<template>
    <ul>
  <AdminDataItem v-for='item in getState' v-bind:data="item" v-bind:key="item._id">
  </AdminDataItem>
  </ul>
</template>

<script>
import AdminDataItem from "@/components/AdminDataItem.vue"

export default {
    name: 'AdminDataList',
        components: {
    AdminDataItem,
  },
  computed: {
    getState: function() {
      return this.$store.state.filtered;
    }
  },
  beforeCreate: async function() {
    this.$store.dispatch("getAdminData");
  }
}
</script>