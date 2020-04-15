<template>
  <div id="app">
    <div class="head">
      Vue Event <span class="decorator">Creator</span>
    </div>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;700&display=swap');
@import './styles/variables';
@import '~nprogress/nprogress';
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
  background: $smoke;
  scroll-behavior: smooth;
  ::-webkit-scrollbar-track
  {
    border-radius: 10px;
    background-color: #F5F5F5;
  }
  ::-webkit-scrollbar
  {
    width: 8px;
    background-color: #F5F5F5;
  }
  ::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
  }
}

#app {
  font-family: 'Ubuntu', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $jet;
}

.head {
  font: 400 48px/1.5 'Permanent Marker', cursive;
  margin: 45px auto;
  display: inline-block;
  .decorator {
    color: $flame;
  }
}
</style>
