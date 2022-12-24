<template>
  <div class="loginForm">
    <div class="form">
      <div class="form_row_1">
        <label for="email">Email</label>
        <input type="email" name="email"  required v-model="email">
      </div>
      <div class="form_row_2">
        <label for="password">Password</label>
        <input type="password" name="password" required v-model="password">
      </div>
      <div class="container">
        <button @click="LogIn"  class="center">LogIn</button>
        <button @click='this.$router.push("/signup")' class="center">Signup</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
name: "LogIn", 

data: function() {
    return {
   email: '',
   password: '',
  }
  },
  methods: {


LogIn() {
      var data = {
        email: this.email,
        password: this.password
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
          body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      //this.$router.push("/");
      location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
    },
  }, 
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.form {
  max-width: 520px;
  hight: 30%;
  margin: 10px auto;
  background:  rgb(208,240,192);
  border-radius: 20px;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

.loginForm {
  display:flex;
  flex-direction: column;
  height: 58vh;
  margin-top: 30vh;
  padding-top: 10px;
  padding: 8px;
}
.form_row_1, .form_row_2{
  display: flex;
  width:100%;
  height: 30%;
}

.form_row_2{
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