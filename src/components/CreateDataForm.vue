<template>
  <div class="form">
    <Loader v-if="isAwait" />
    <form v-else>
      <div class="formSelect">
        <label>Select date</label>
        <input type="date" required v-model="date" />
      </div>
      <div class="formSelect">
        <div class="timeSelect">
          <label>Time from: </label>
          <input type="text" required placeholder="00:00" v-model="timeFrom" />
        </div>
        <div class="timeSelect">
          <label>Time to: </label>
          <input type="text" required placeholder="00:00" v-model="timeTo" />
        </div>
      </div>
      <button v-on:click.prevent="addData">Add</button>
      <button v-on:click.prevent="saveData">Save</button>
      <button v-on:click.prevent="returnToData">Return</button>
    </form>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";

class SaveData {
  constructor(date, time) {
    (this.date = date), (this.time = time);
  }
}

export default {
  data: () => ({
    createdData: [],
    date: "",
    timeFrom: "",
    timeTo: "",
    isAwait: false,
  }),
  components: {
    Loader,
  },
  name: 'CreateDataForm',
  methods: {
      addData() {
      let element = new SaveData(
        this.date,
        this.timeFrom + " - " + this.timeTo
      );
      this.createdData.push(element);
      this.timeFrom = this.timeTo = "";
    },
    saveData() {
      function postRequest(url, data = {}) {
        return fetch(url, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.text());
      }
      if (!this.createdData) {
        this.alert = "Укажите данные";
      } else {
        this.isAwait = true;
        postRequest("http://localhost:3000/dominatus", this.createdData).then(
          (data) => {
            this.isAwait = false;
            console.log(data);
          }
        ).catch(err => console.log(err));
      }
    },
  }
};
</script>