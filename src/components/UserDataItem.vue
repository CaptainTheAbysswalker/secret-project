<template>
  <li v-on:click="selectTime(data.id)">
    {{ data.time }}
  </li>
</template>
<script>
export default {
  name: "UserDataItem",
  props: ["data"],
  methods: {
    selectTime: function (id) {
      this.$store.dispatch("selectTime", id);
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  margin: 10px;
  padding: 10px;
  width: 100px;
  border-radius: 10px;
/*   border: 1px solid #f2c94c; */
  color:black;
  background: #f2c94c;
  cursor: default;
}
</style>