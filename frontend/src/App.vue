<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style>
body,html,ul,li{
    margin:0;
    padding:0;
    height: 100%;
    font-size: 14px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
   height: 100%;
}
</style>
