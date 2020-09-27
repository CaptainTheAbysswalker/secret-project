<template>
  <div class="dominatus">
  <div v-if="isShow" class='createForm'>
  <div class="form">
  <Loader v-if="isAwait" />
  <form v-else>
  <div class="formSelect">
  <label>Select date</label>
  <input type="date" required v-model="date"/>
  </div>
  <div class="formSelect">
  <div class="timeSelect">
  <label>Time from: </label>
  <input type="text" required placeholder="00:00" v-model="timeFrom"/>
  </div>
  <div class="timeSelect">
  <label>Time to: </label>
  <input type="text" required placeholder="00:00" v-model="timeTo"/>
  </div>
  
  </div>
  <button v-on:click.prevent="addData">Add</button>
  <button v-on:click.prevent="saveData">Save</button>
  <button v-on:click.prevent="returnToData">Return</button>
  </form>
  </div>
  </div>
    <div class="filterBox">
      <ul class="filter">
        <li>
          <ul class="getData">
            <h3>Get data</h3>
            <li v-on:click="setFilter('26.09.2020')">Svobodnie</li>
            <li v-on:click="setFilter('27.09.2020')">Zapisannie</li>
            <li v-on:click="setFilter('')">All</li>
          </ul>
          <button v-on:click="showForm">Create new</button>
        </li>
      </ul>
    </div>
    <div class="filteredData">
      <h1>Hydra dominatus</h1>
      <h2>{{this.$store.state.filter}}</h2>
      <AdminDataList />
    </div>
  </div>
</template>

<script>
import AdminDataList from "@/components/AdminDataList.vue"
import Loader from "@/components/Loader.vue";

class SaveData{
  constructor(date, time){
    this.date = date,
    this.time = time
  }
}

export default {
  data: () => ({
    isShow: false,
    createdData: [],
    date: '',
    timeFrom: '',
    timeTo: '',
    isAwait: false,
  }),
  components: {
    AdminDataList,
    Loader,
  },
  name: "Dominatus",
  methods: {
    setFilter(filter) {
      this.$store.dispatch("getFilter", filter);
    },
    showForm(){
      this.isShow = !this.isShow
    },
    returnToData(){
      this.isShow = !this.isShow
      this.date = this.timeFrom = this.timeTo = ''
  this.createdData = []
    },
    addData(){
      let element = new SaveData(this.date, this.timeFrom + ' ' + this.timeTo)
      this.createdData.push(element)
      this.timeFrom = this.timeTo = ''
    },
    saveData(){
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
        postRequest("http://localhost:3000/dominatus", this.createdData).then((data) => {
          this.isAwait = false;
          console.log(data)
        }
        
      );
      }
    }
  },
 
};
</script>

<style lang="scss" scoped>
.dominatus {
  display: flex;
  width: 100%;
  height: 100%;
}
.filterBox {
  width: 20%;
  height: 100px;
  background: aqua;
}
.filter {
  list-style: none;
}
.createForm {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form{
 width: 50%;
  background-color: white;
    height: 50%;
}
form {
 width: 100%;
 height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  padding: 15px;

}
.formSelect{
  display: flex;
}
.timeSelect{
  display: flex;
}
</style>