<template>

<div class="page-content">
  <main class='content'>
    <get-post/>
  </main>
</div>

</template>

<script>
export default {
  name: "postsComponent",
  components: {getPost}
}
</script>

<style scoped>
.page-content{
  flex: 1 1 auto; 
  max-width: 600px;
}
</style>