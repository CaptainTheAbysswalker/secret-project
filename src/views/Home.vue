<template>
  <div class="home">
    <vueTelegramLogin
      mode="callback"
      telegram-login="CaptainTheAbysswalker_bot"
      @callback="logIn"
    />
  </div>
</template>

<script>
import { vueTelegramLogin } from "vue-telegram-login";

export default {
  name: "Home",
  components: {
    vueTelegramLogin,
  },
  methods: {
    logIn(user) {
      function postRequest(url, data = {}) {
        return fetch(url, {
          method: "POST",
          mode: "cors",
          credentials: "include",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.text());
      }

      postRequest("https://secrethydra-server.herokuapp.com/login", user)
        .then((data) => {
          console.log('heh ', document.cookie)
          alert(data);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
