<template>
  <div class="form">
    <SelectedDataList v-if="this.$store.state.userSelectedData.length" />
    <form>
      <h2>Type your info</h2>
      <input type="text" v-model="name" placeholder="type Name" required />
      <input
        type="text"
        v-model="tnumber"
        placeholder="type phone number"
        required
      />
      <p class="alert">{{ this.alert }}</p>
      <div class="buttons">
        <button type="submit" v-on:click.prevent="sendData">Sign now</button>
        <button type="reset" v-on:click="returnToSelect" class="return">
          Return to select
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import SelectedDataList from "@/components/SelectedDataList.vue";

class CreateRequestData {
  constructor(name, phone) {
    (this.id = []), (this.name = name), (this.phone = phone);
  }
}

export default {
  data: () => ({
    name: "",
    tnumber: "",
    alert: "Type info",
    isAwait: false,
  }),
  components: {
    SelectedDataList,
  },
  name: "CreateDataForm",
  methods: {
    sendData(url) {
      function postRequest(url, data = {}) {
        return fetch(url, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((res) => res.text());
      }
      if (!this.name || !this.tnumber) {
        this.alert = "Укажите данные";
      } else {
        let newRequest = new CreateRequestData(this.name, this.tnumber);
        console.log(newRequest);
        for (let i in this.$store.state.selectedTimes) {
          newRequest.id.push(this.$store.state.selectedTimes[i]);
        }
        postRequest(
          "https://secrethydra-server.herokuapp.com/data",
          newRequest
        ).then((data) => {
          this.$store.commit("saveDataStatus");
        });
      }
    },
    returnToSelect: function () {
      this.$store.commit("setSelectedStatus");
      this.$store.commit("clearUserSelected");
      this.$store.dispatch("clearSelected");
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  margin: 0;
}
.form {
  padding: 40px;
  width: 100%;
  background: black;
  display: flex;
  color: #f2c94c;
  justify-content: space-around;
  flex-direction: row-reverse;
}
form {
  display: flex;
  flex-direction: column;
  background: black;
  text-align: left;
  justify-content: space-around;
  width: 322px;
  height: 200px;
}
label {
  width: 100px;
}
.formSelect {
  display: flex;
  flex-direction: column;
}
.dateSelect {
  display: flex;
  justify-content: space-between;
}
.timeSelect {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
input {
  height: 30px;
  border-radius: 4px;
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
}
.alert {
  align-self: center;
  background: black;
  color: red;
  border: 0;
  height: 15px;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
@media (max-width: 900px) {
  .form {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
}
p{
  margin: 0;
}
</style>