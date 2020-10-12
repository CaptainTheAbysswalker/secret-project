

<template>
  <ContactForm v-if="this.$store.state.isSaved" />
  <div v-else class="sign">
    <Loader v-if="!getStatus" />
    <div class="dates" v-else-if="!this.$store.state.isSelected">
      <h1>Select times</h1>
      <div class="lists">
        <UserDataList
          v-for="date in getState"
          v-bind:key="date.id"
          v-bind:data="date"
        />
      </div>
      <div class="buttons">
        <button class="signButton" v-on:click="checkSelected">
          Go to reserv
        </button>
        <router-link tag="button" to="/">Main page</router-link>
      </div>
    </div>
    <SignForm v-else />
  </div>
</template>

<script>
class CreateRequestData {
  constructor(name, phone) {
    (this.id = []), (this.name = name), (this.phone = phone);
  }
}

class userSelectedElement {
  constructor(id, date, time) {
    (this.id = id), (this.date = date), (this.time = time);
  }
}
import Loader from "@/components/Loader.vue";
import UserDataList from "@/components/UserDataList.vue";
import SignForm from "@/components/SignForm.vue";
import ContactForm from "@/components/ContactForm.vue";

export default {
  name: "Home",
  components: {
    Loader,
    UserDataList,
    SignForm,
    ContactForm,
  },
  data: () => ({
    name: "",
    tnumber: "",
    alert: "",
    isSelected: false,
    selectedTimes: [],
    dates: [],
  }),
  methods: {
    checkSelected: function () {
      if (this.getSelectedTimes.length) {
        this.$store.commit("setSelectedStatus");
        this.setUserSelected();
      }
    },
    setUserSelected() {
      let fullData = this.$store.state.data;
      this.$store.state.selectedTimes.forEach((selectElement) => {
        fullData.find((element) => {
          for (let item in element.times) {
            if (element.times[item].id == selectElement) {
              let newElement = new userSelectedElement(
                element.times[item].id,
                element.date,
                element.times[item].time
              );
              this.$store.dispatch("setUserSelectedData", newElement);
            }
          }
        });
      });
    },
    returnToSelect: function () {
      this.$store.dispatch("clearSelected");
      this.isSelected = !this.isSelected;
    },
  },
  computed: {
    getStatus: function () {
      return this.$store.state.isLoaded;
    },
    getSelectedTimes: function () {
      return this.$store.state.selectedTimes;
    },
    getState: function () {
      return this.$store.state.data;
    },
  },
  beforeCreate: async function () {
    this.$store.dispatch("getData");
  },
};
</script>
<style lang="scss" scoped>
.sign {
  min-height: 100vh;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: black;
}
.lists {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.dates {
  padding: 20px;
  display: flex;
  justify-content: space-around;
  /* flex-wrap: wrap; */
  flex-direction: column;
  align-items: center;
}
.dateLists {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 4px;
  margin-right: 20px;
  width: 320px;
}
li {
  margin: 10px;
  padding: 10px;
  width: 100px;
  border: 1px solid #bc9cff;
  background: rgba(31, 32, 65, 0.05);
  cursor: default;
}
.registration {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}
.reginfo {
  width: 50%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  height: 50%;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 40%;
  width: 50%;
}
input {
  width: 100%;
  box-sizing: border-box;
}
.buttons {
  display: flex;
  justify-content: space-between;
  width: 320px;
}
.return {
  background: white;
  color: #bc9cff;
  border: 2px solid #bc9cff;
  bottom: 5px;
}
.alert {
  margin: 0;
  color: red;
}
.signButton {
  width: 86px;
}
h1 {
  color: #f2c94c;
}
@media (max-width: 900px) {
  .lists {
    flex-direction: column;
    align-items: center;
  }
}
</style>