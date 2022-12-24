<template>
  <div class=editform>
    <div class="form">
      <div class="container">
          A Post
      </div>

      <div class="form_row_2">
        <label for="body">Body: </label>
        <input name="body" type="text" id="body" required v-model="post.body" />
      </div>
      <div class="container">
      <button @click="updatePost" class="updatePost">Update Post</button>
      <button @click="deletePost" class="deletePost">Delete Post</button>
      </div>
    </div>

  </div>
  </template>






<script>
export default {
  name: "APost",
  data() {
    return {
      post: {
        id: "",
        title: "",
        body: "",
        urllink: "",
      },
    };
  },
  methods: {
    fetchAPost(id) {
      // fetch one post with the specied id (id)
      fetch(`http://localhost:3000/api/posts/${id}`)
        .then((response) => response.json())
        .then((data) => (this.post = data))
        .catch((err) => console.log(err.message));
    },
    updatePost() {
      // using Fetch - put method - updates a specific post based on the passed id and the specified body
      fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.post),
      })
        .then((response) => {
          console.log(response.data);
          //this.$router.push("/apost/" + this.post.id);
          // We are using the router instance of this element to navigate to a different URL location
          this.$router.push("/api/allposts");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deletePost() {
      // using Fetch - delete method - delets a specific post based on the passed id
      fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          console.log(response.data);
          // We are using the router instance of this element to navigate to a different URL location
          this.$router.push("/api/allposts");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    // call fetchAPost() when this element mounts, and pass to it a route parameter  (id)
    // Route parameters (this.$route.params.id) are named URL segments that are used to capture the values specified at their 
    // position in the URL. The captured values are populated in the req.params object, with the name 
    // of the route parameter specified in the path as their respective keys
    this.fetchAPost(this.$route.params.id);
  },
};
</script>

<style scoped>

* {
  box-sizing: border-box;
}

.editform{
  display:flex;
  flex-direction: column;
  height: 58vh;
  margin-top: 30vh;
  padding-top: 10px;
  padding: 8px;
  max-width: 720px;
}

.form {
  max-width: 720px;
  hight: 30%;
  margin: 10px auto;
  background:  rgb(208,240,192);
  border-radius: 20px;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

.form_row_1{
  display: flex;
  width:100%;
  height: 30%;
}

.form_row_2{
  display: flex;
  width:100%;
  height: 50%;
}
.container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.form_row_2{
  margin-top: 10px;
}


label {
    flex: 1 1 auto;
    color: black;
    display: block;
    text-align: center;
    padding-top: 7px;
}

input{
flex: 0 0 auto;
display: block;
padding: 10px 6px;
width: 70%;
text-align: center;
box-sizing: border-box;
border-radius: 20px;
border: none;
border-bottom: 1px solid white;
color: blue;
}

button{
background:  rgb(137, 207, 240);
border: 0;
padding: 5px 20px;
margin-top:  15px;
color: black;
border-radius: 20px;
}
h2, .submit{
    text-align: center;
    margin-top: 10px;
}


.error{
    color: red;
    font-size: 0.7em;
    margin-top:  10px;
    text-align: center;
}

</style>

