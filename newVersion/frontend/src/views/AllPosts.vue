<template>
<div id="page">
<div class="page-contentGrid">
        <div class="page-leftCol">
          <div class="leftCol"> </div>
        </div>
        <div class="page-content">
          <div class="header">
    <div class="container">
        <button v-if = "authResult" @click="Logout" class="center">Logout</button>
    </div>
    <div class="post-list" v-for="post in posts"   :key="post.id">
      <a class="singlepost" :href="'/api/apost/' + post.id">
            <span class="title"> {{ post.day_num}} {{ post.month_name}}, {{ post.year}} </span><br />
            <span class="body">  {{ post.body }} </span> <br />
          </a>
    </div>
    <div class="container">
        <button @click='this.$router.push("/api/addpost")' class="center">Add post</button>
        <button class="center" @click=deleteAll>Delete</button>
    </div>
  </div>
        </div>
        <div class="page-rightCol">
          <div class="rightCol"> </div>
        </div>
</div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import auth from "../auth";
import leftrightCols from "@/components/leftrightcols.vue"

export default {
  name: "AllPosts",
  data() {
    return {
      posts: [],
      authResult: auth.authenticated()
    };
  },
  methods: {
    async deleteAll() {
      try {
        await axios.delete('http://localhost:3000/api/posts');
        this.posts = []
        // Perform any necessary actions after the delete operation is successful
      } catch (error) {
        // Handle errors
      }
    },
    fetchPosts() {
      // You should remember how Fetch API works
      // fetch is a GET request unless stated otherwise. Therefore, it will fetch all posts from the database
      fetch(`http://localhost:3000/api/posts/`)
        .then((response) => response.json())
        .then((data) => (this.posts = data))
        .catch((err) => console.log(err.message));
    },
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
          credentials: 'include', //  Don't forget to specify this if you need cookies
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('jwt removed');
        //console.log('jwt removed:' + auth.authenticated());
        this.$router.push("/login");
        //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error logout");
      });
    },
  },
  mounted() {
    // call fetchPosts() when this element (AllPosts) mounts
    this.fetchPosts();
    console.log("mounted");
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
body {
  height: 100%;
  margin: 0;
  padding: 0;
  line-height: 1.6;
  font-size: 14px;
  font-family: "Courier";
}

/* descendant selector */
body a {
  text-decoration: none;
}
#page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  padding: 8px;
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
.page-content{
  flex: 1 1 auto;
  max-width: 600px;
}
.reset{
  text-align:center;
  width: 75px;
  height: 20px;
  margin: 0 auto;
  }

.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 8px;
}

/* class selector #2 */
.page-contentGrid {
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding-top: 100px;
}

.page-leftCol {
  flex: 0 0 100px;
  max-width: 20%;
}

.page-rightCol {
  flex: 0 0 100px;
  max-width: 20%;
}

/* adjacent sibling selector */
.page-leftCol + div {
  flex: 1 1 auto;
  max-width: 600px;
}

.feed {}

/* pseudo-class selectors, namely: ':not' and ':last-child' */
.feed-item:not(:last-child) {
  margin-bottom: 40px;
}

.singlepost {
  padding: 16px;
  border-radius: 12px;
  text-align: left;
}

.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 8px;
}

.leftCol {
  height: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: rgb(197, 195, 195);
  text-align: center;
}

.rightCol {
  height: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: rgb(197, 195, 195);
  text-align: center;
}

.post-list{
  background: rgb(197, 195, 195);
  margin-bottom: 5px;
  padding: 10px 15px;
  border-radius: 10px;
  text-align: left;
}
p{
  background: #796dbd;
}
h1, h2, h3, h4, ul, li, a, input, label, button, div, footer{
  margin: 0;
  padding: 0;
  font-family: "Courier", sans-serif;
  color: #444;
}
nav{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 80px;
}
input{
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1em;
  width: 100%;
}
label{
  display: block;
  margin: 20px 0 10px;
}
button{
background:  rgb(137, 207, 240);
border: 0;
padding: 5px 20px;
margin-top:  15px;
color: black;
border-radius: 20px;
}
nav{
  display: flex;
  align-items: center;
}
.center {
  margin: auto;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  margin: 10px auto;
  width: 30%;
}
.container {
  display: flex;
  justify-content: center;
}

</style>