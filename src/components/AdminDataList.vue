<template>
  <div class="list">
      <AdminDataItem
        v-for="item in getState"
        v-bind:data="item"
        v-bind:key="item._id"
      >
      </AdminDataItem>
  </div>
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
.list{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
@media (max-width: 900px){
  .list{
    flex-direction: column;
  }
}
</style>