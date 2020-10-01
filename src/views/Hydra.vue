<template>

  <form action="">
    <vue-telegram-login 
    mode="callback"
    telegram-login="CaptainTheAbysswalker_bot"
    @callback="login"/>
    <!-- <input type="text" v-model="login" />
    <input type="password" v-model="password" />
    <button v-on:click.prevent="logIn">Login</button> -->
  </form>
</template>

<script>
import {vueTelegramLogin} from 'vue-telegram-login'


export default {
  name: "Hydra",
  components: {vueTelegramLogin},
  data: () => ({
    login: "Alpharius",
    password: "4113529786",
  }),
  methods: {
    logIn(user) {
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
      if (!this.login || !this.password) {
        this.alert = "Укажите данные";
      } else {
        postRequest("https://secrethydra-server.herokuapp.com/login", user)
          .then((data) => {
            console.log(data);
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>