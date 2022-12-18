<template>
<div id="main">
  <!-- <header-component/> -->
  <div class = 'page-contentGrid'>
    <leftright-cols/>
    <posts-component/>
    <leftright-cols/>
  </div>
  <!-- <footer-component/> -->
</div>

</template>

<script>
// import headerComponent from "@/components/header.vue";   
// import footerComponent from "@/components/footer.vue"
import leftrightCols from "@/components/leftrightcols.vue"
import postsComponent from "@/components/posts.vue"


export default {
  name: 'PostView',
  components: {leftrightCols, postsComponent}
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

#main{
  display:flex; 
  flex-direction: column;
  gap:40px; 
  height: 100%;
  padding: 8px;
}

.page-contentGrid {
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding-top: 80px;
}

</style>