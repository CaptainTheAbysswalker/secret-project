<template>
  <table>
    <caption>
      Data prepared for save
    </caption>
    <tr>
      <th>Date</th>
      <th>Time</th>
      <th>Remove</th>
    </tr>
    <tr v-for="item in getPrepared" v-bind:key="item.id">
      <td>{{ item.date }}</td>
      <td>{{ item.time }}</td>
      <td><button class="remove" v-on:click="removeItem(item.id)">remove</button></td>
    </tr>
  </table>
</template>

<script>
import AdminDataItem from "@/components/AdminDataItem.vue";

export default {
  name: "AddDataList",
  components: {},
  methods: {
      removeItem(id){
          this.$store.dispatch("removePrepared", id);
      }
  },
  computed: {
    getPrepared() {
      return this.$store.state.dataForSave;
    },
  },
};
</script>

<style lang="scss" scoped>
caption{
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
td{
    border: 1px solid black;
}
.remove{
    background: red;
}
</style>