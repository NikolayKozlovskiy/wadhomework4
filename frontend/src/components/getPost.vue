<template>

   <div class="logout">
      <button v-on:click="zero">Logout</button>
   </div>

    <div class="post" v-for="post in posts" :key="post.post_id"> 

       <div class="post-header">
          <div class="post-date">{{post.date}}</div>
        </div>
        <div class="post-content">
          <div class="post-contentItem">{{post.body}}</div>
        </div>
      <!-- <p>  <b> Body: </b> {{post.body}} </p> -->
    </div>

    <div class="addPost">
      <button v-on:click="zero" >Add post</button>
    </div>

    <div class="deleteAll">
      <button v-on:click="zero">
        Delete all
      </button>
    </div>
</template>


<script>
export default {
    name: "getPost",
    methods: {

      addlike: function(post_id){
        this.$store.commit("addlike", {post_id})
        
      },
      
      zero: function(){
        this.$store.commit("zero")
      }
    },
    computed: {
      
      posts () { 
        
  return this.$store.getters.postsget}
    }
}
</script>

<style scoped>


.reset{
  text-align:center;
  width: 75px;
  height: 20px;
  margin: 0 auto;
  }

body {
    line-height: 1.6;
    font-size: 600px;
}
.post {
  padding: 16px;
  border-radius: 12px;
  background-color: #A9A9A9;
  margin-bottom: 40px;
}

.logout{
    text-align:center;
    //align-items: center;
    margin-bottom: 20px;
}

.deleteAll{
    text-align:right;
    //align-items: center;
}

.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 8px;
}

.post-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 8px;
}


.post-profile {
  flex: 0 0 auto;
}

.profilePlate-image {
  display: inline-block;
  height: 40px;
  width: 40px;
  object-fit: cover; /* to avoid image distortion */
  vertical-align: top;
}

.post-image {
  display: inline-block;
  width: 100%;
  vertical-align: top;
  margin-bottom: 8px;
}

.post-image-like {
  display: inline-block;
  width: 10%;
  vertical-align: bottom;
}


</style>