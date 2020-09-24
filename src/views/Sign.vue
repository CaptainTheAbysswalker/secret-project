

<template>
  <div class="sign">
    <Loader v-if="!getStatus" />
    <div class="dates" v-else>
      <ul v-for="date in getState" v-bind:key="date.id" class="dateLists">
        <h1>{{ date.date }}</h1>
        <div class="timeLists">
          <li
            v-for="time in date.times"
            v-bind:key="time.id"
            v-on:click="selectTime(date.date, time)"
          >
            {{ time.time }}
          </li>
        </div>
      </ul>
    </div>

    <button class="signButton" v-on:click="alertSelected">Sign</button>
    <div v-if="isSelected" class="registration">
      <div class="reginfo">
        <h1>Reg Info</h1>
        <h3 v-for="item in getSelectedTimes" v-bind:key="item.date">
          {{ item }}
        </h3>
        <form>
          <input type="text" v-model="name" placeholder="type Name" required />
          <input
            type="text"
            v-model="tnumber"
            placeholder="type phone number"
            required
          />
          <p class="alert">{{ this.alert }}</p>
          <div class="buttons">
            <button type="submit" v-on:click.prevent="sendData">
              Sign now
            </button>
            <button type="reset" v-on:click="returnToSelect" class="return">
              Return to select
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
class CreateRequestData {
  constructor(name, phone) {
    (this.id = []), (this.name = name), (this.phone = phone);
  }
}
import Loader from "@/components/Loader.vue";

export default {
  name: "Home",
  components: {
    Loader,
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
    selectTime: function (date, time) {
      let newItem = {
        id: time.id,
        date,
        time: time.time,
      };

      let findIndex = this.selectedTimes.findIndex(
        (element) => element.id == newItem.id
      );
      if (!(findIndex + 1)) {
        this.selectedTimes.push(newItem);
        console.log(newItem.id)
      } else {
        this.selectedTimes.splice(findIndex, 1);
      }
    },
    alertSelected: function () {
      if (this.selectedTimes.length) {
        this.isSelected = !this.isSelected;
      }
    },
    returnToSelect: function () {
      this.selectedTimes = [];
      this.isSelected = !this.isSelected;
    },
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
        for(let i in this.selectedTimes){
          newRequest.id.push(this.selectedTimes[i].id)
        }
         postRequest("http://localhost:3000/data", newRequest).then((data) =>
        console.log(data)
      );
      }


    },
  },
  computed: {
    getStatus: function () {
      return this.$store.state.isLoaded;
    },
    getSelectedTimes: function () {
      const elements = this.selectedTimes.map((element) => {
        return `Date: ${element.date} time:${element.time} `;
      });
      return elements;
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
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.dates {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}
.dateLists {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 4px;
  margin-right: 20px;
  width: 320px;
}
.timeLists {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
ul {
  list-style: none;
  display: flex;
  margin: 0;
  flex-wrap: wrap;
  padding: 0;
  width: 50%;
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
  width: 100%;
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
</style>