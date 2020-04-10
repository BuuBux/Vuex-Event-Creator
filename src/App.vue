<template>
  <div id="app">
    <div class="head">
      Vue Event <span class="decorator">Creator</span>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
