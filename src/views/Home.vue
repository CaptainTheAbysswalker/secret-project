<template>
  <div class="home">
    <div class="info">
      Main info
      <div class="buttons">
        <router-link tag="button" to="/sign">Go to sign</router-link>
        <div class="auth">
          <label for=""> Admin auth</label>
          <vueTelegramLogin
            mode="callback"
            telegram-login="CaptainTheAbysswalker_bot"
            @callback="logIn"
          />
        </div>
      </div>
    </div>

    <footer>
      <p>
        Created by
        <a href="https://captaintheabysswalker.github.io/card/" target="blank"
          >CaptainTheAbysswalker</a
        >
      </p>
    </footer>
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
          alert(data);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  align-items: center;
}
.info {
  height: 60vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.buttons {
  display: flex;
  width: 50%;
  justify-content: space-between;
}
footer {
  position: absolute;
  bottom: 0;
  height: 70px;
  border-top: 1px solid #ccc;
  width: 100%;
  background: white;
}
a {
  text-decoration: none;
}
</style>
