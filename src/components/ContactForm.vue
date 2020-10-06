<template>
  <div class="contactForm">
    <h1>You have resrved:</h1>
    <ul class="reservedData">
      <li
        v-for="item in this.$store.state.userSelectedData"
        v-bind:key="item.id"
      >
        <span>{{ item.date }}</span>
        <span>{{ item.time }}</span>
      </li>
    </ul>
    <h2>For more info contact me:</h2>
    <Contact />
    <div class="buttons">
      <router-link tag="button" to="/">Перейти к Foo</router-link>
      <button v-on:click="returnToSelect">Go to select</button>
    </div>
  </div>
</template>

<script>
import Contact from "@/components/Contact.vue";

export default {
  name: "ContactForm",
  components: {
    Contact,
  },
  destroyed(){
    this.$store.dispatch('getData')
  },
  methods: {
    returnToSelect: function () {
      this.$store.commit("setSelectedStatus");
      this.$store.commit("clearUserSelected");
      this.$store.commit("saveDataStatus");
      this.$store.dispatch("clearSelected");
    },
  },
};
</script>

<style lang="scss" scoped>
.contactForm {
  height: 100vh;
  background: black;
  color: #f2c94c;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
h1 {
  margin-bottom: 10px;
  margin-top: 0;
}
.reservedData {
  width: 270px;
}
li {
  display: flex;
  justify-content: space-around;
}
.buttons {
  margin-top: 30px;
  width: 270px;
  display: flex;
  justify-content: space-around;
}
</style>