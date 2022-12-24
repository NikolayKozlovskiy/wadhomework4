<template>
  <div class="signuppage">
    <div class="form">
      <div class="container">
          Add post
      </div>
      <div class="form_row_2">
        <label for="body">Body: </label>
        <input name="body" type="text" id="body" required v-model="post.body" />
      </div>
      <div class="container">
      <button @click="addPost" class="addPost">Add Post</button>
      </div>
    </div>
    <!-- <footer-component/> -->

  </div>
  </template>


<script>
export default {
  name: "AddPost",
  data() {
    return {
      post: {
        body: "",
      },
    };
  },
  methods: {
    addPost() {
      var data = {
        body: this.post.body,
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((response) => {
        console.log(response.data);
        // redirect to /allposts view
        this.$router.push("/api/allposts");
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.form {
  max-width: 620px;
  hight: 30%;
  margin: 1px auto;
  background:  rgb(208,240,192);
  border-radius: 20px;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

.signuppage {
  display:flex;
  flex-direction: column;
  height: 58vh;
  margin-top: 30vh;
  padding-top: 10px;
  padding: 8px;
}

.form_row_2{
  display: flex;
  width:100%;
  height: 30%;
  margin-top: 10px;
}

button {
  background: rgb(32, 60, 160);
  border: 0;
  padding: 10px 20px;
  margin: 20px 20px 20px 20px;
  color: white;
  border-radius: 20px;
  align-items: center;
  text-align: center;
}

.container {
  display: flex;
  justify-content: center;
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
width: 60%;
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