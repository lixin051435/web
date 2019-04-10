<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <nav-header></nav-header>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    NavHeader
  },
}
</script>
