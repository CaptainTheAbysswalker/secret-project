<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
html,
body {
  height: 100%;
  margin: 0;
}
button {
  border: 1px solid rgba(31, 32, 65, 0.25);
  border-radius: 4px;
  padding: 5px;
  color: white;
  background: linear-gradient(180deg, #bc9cff 0%, #8ba4f9 100%);
}
ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
