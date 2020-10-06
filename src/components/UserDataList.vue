<template>
  <ul>
    <h1>{{ data.date }}</h1>
    <div class="timeList">
      <UserDataItem
        v-for="item in data.times"
        v-bind:data="item"
        v-bind:key="item._id"
      />
    </div>
  </ul>
</template>

<script>
import UserDataItem from "@/components/UserDataItem.vue";

export default {
  name: "UserDataList",
  props: ["data"],
  components: {
    UserDataItem,
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-direction: column;
  border: 1px solid #f2c94c;
  border-radius: 4px;
  margin-right: 20px;
  margin-bottom: 20px;
  width: 320px;
  min-height: 300px;
  background:black;
  color: #f2c94c;;
}
.timeList{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
@media (max-width: 900px){
  ul{
    margin-right: 0;
  }
}
</style>