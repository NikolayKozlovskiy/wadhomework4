<template>

<div class="page-header">
  <header class='header'>
    <nav>
        <router-link to="/">Home</router-link> |
      <router-link to="/about">Contacts</router-link>

    </nav>
  </header>
</div>

</template>

<script>
export default {
  name: "headerComponent",
}
</script>

<style scoped>
.page-header{
  position: fixed;
  left:0; 
  top:0; 
  right:0; 
  padding:9px;
}

.header{
  display:flex; 
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 12px;
  background-color: rgb(197, 195, 195);
}

nav {
  padding: 10px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

</style>

