<template>
  <div class="form">
    <AddDataList v-if="this.$store.state.dataForSave.length && !dataSaved" />
    <div class="dataSaved" v-if="dataSaved">
      <h2>Данные успешно сохранены</h2>
      <button v-on:click.prevent="returnToData">
        Перейти к просмотру данных
      </button>
    </div>
    <Loader v-if="isAwait" />
    <form v-else-if="!dataSaved">
      <div class="dateSelect">
        <label>Select date</label>
        <input
          type="date"
          required
          v-model="date"
          pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
          v-bind:disabled="!isComplete"
        />
      </div>
      <div class="timeSelect">
        <label>Time from: </label>
        <input
          type="time"
          required
          placeholder="00:00"
          v-model="timeFrom"
          v-bind:disabled="!isComplete"
        />
      </div>
      <div class="timeSelect">
        <label>Time to: </label>
        <input
          type="time"
          required
          placeholder="00:00"
          v-model="timeTo"
          v-bind:disabled="!isComplete"
        />
      </div>
      <input type="text" v-model="message" class="alert" />
      <div class="buttons">
        <button v-on:click.prevent="addData" v-bind:disabled="!isComplete">
          Add
        </button>
        <button v-on:click.prevent="saveData" v-bind:disabled="!isComplete">
          Save
        </button>
        <button v-on:click.prevent="returnToData" v-bind:disabled="!isComplete">
          Return
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import sendRequest from "../req/request";
import Loader from "@/components/Loader.vue";
import AddDataList from "@/components/AddDataList.vue";

class SaveData {
  constructor(date, time) {
    (this.id = Date.now()), (this.date = date), (this.time = time);
  }
}
export default {
  data: () => ({
    createdData: [],
    date: "",
    timeFrom: "",
    timeTo: "",
    isAwait: false,
    message: "",
    isComplete: true,
    dataSaved: false,
  }),
  components: {
    Loader,
    AddDataList,
  },
  destroyed() {
    this.$store.dispatch("getAdminData");
  },
  name: "CreateDataForm",
  methods: {
    returnToData() {
      this.$store.commit("adminFormVisible");
      this.$store.commit("clearPrepared");
    },
    addData() {
      if (!this.date || !this.timeFrom || !this.timeTo) {
        this.message = "Недостаточно данных";
      } else {
        let date = new Date(this.date).toLocaleDateString();
        let element = new SaveData(date, this.timeFrom + " - " + this.timeTo);
        this.$store.dispatch("prepareToSave", element);
        this.timeFrom = this.timeTo = "";
        this.message = "Данные добавлены";
      }
    },
    saveData() {
      this.isComplete = false;
      if (!this.$store.state.dataForSave) {
        this.alert = "Укажите данные";
      } else {
        sendRequest("POST", "dominatus", this.$store.state.dataForSave)
          .then((data) => {
            this.$store.commit("clearPrepared");
            this.dataSaved = true;
            this.isComplete = true;
          })
          .catch((err) => {
            this.message = err;
            this.isComplete = true;
            console.log("err", err);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  background: black;
  display: flex;
  color: #f2c94c;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 40px;
  flex-direction: row-reverse;
}
form {
  height: 220px;
  display: flex;
  flex-direction: column;
  background: black;
  text-align: left;
  justify-content: space-around;
  margin-right: 15px;
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
  width: 200px;
  padding: 6px;
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
    align-items: center;
    justify-content: space-around;
  }
}
</style>