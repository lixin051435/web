<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  data() {
    return {
      msg: "Use Vue 2.0 Today!"
    };
  },
  components: {
    Header
  }
};
</script>
<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
