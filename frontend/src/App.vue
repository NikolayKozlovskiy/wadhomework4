<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/signup">Form Val.</router-link> |
    <router-link to="/fetch">FetchAPI</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/fun">Fun</router-link>
  </nav>

  <router-view /> -->

 <header-component/>
 <router-view/>
 <footer-component/>
</template>

<script>
import headerComponent from "@/components/header.vue";
import footerComponent from "@/components/footer.vue";
export default {
  components: {headerComponent, footerComponent}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}


</style>
