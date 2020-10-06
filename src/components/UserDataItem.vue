<template>
  <li
    v-on:click="selectTime(data.id, data.isAvaible)"
    v-bind:class="{
      disabled: !data.isAvaible,
      active: data.isAvaible,
      selected: isSelected && this.$store.state.selectedTimes.length,
    }"
  >
    {{ data.time }}
    <span v-if="!data.isAvaible"> not avaible</span>
  </li>
</template>
<script>
export default {
  name: "UserDataItem",
  props: ["data"],
  data: () => ({
    isSelected: false,
  }),
  methods: {
    selectTime: function (id, isAvaible) {
      if (isAvaible) {
        this.isSelected = !this.isSelected;
        this.$store.dispatch("selectTime", id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  position: relative;
  margin: 10px;
  padding: 10px;
  width: 100px;
  border-radius: 10px;
  color: black;
  background: #f2c94c;
  cursor: default;
}
span {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: red;
  font-size: 12px;
}
.disabled {
  background: #ccc;
}
.active:hover,
.selected {
  background: #ff9100;
}
</style>