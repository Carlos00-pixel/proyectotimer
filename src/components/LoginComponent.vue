<template>
   <div class="flex-column navbar navbar-expand-lg navbar-light text-center">

  <form v-on:submit.prevent="accessLogin()">
    <label>Login</label>
    <input type="text" class="form-control" v-model="dato.userName" />
    <label>Password</label>
    <input type="text" class="form-control" v-model="dato.password" />
    <button style="margin-top: 10px; width: 320px;font-family: 'Montserrat', sans-serif;" class="btn btn-success">Acceder</button>
  </form>
</div>
</template>

<script>
import AdminServices from "../services/AdminService";
const service = new AdminServices();
export default {
  name: "LoginComponent",
  data() {
    return {
      dato: {
        userName: "",
        password: "",
      },
    };
  },
  methods: {
    accessLogin() {
      service.getToken(this.dato).then((result) => {
        console.log(result);
        this.$router.push("/menu");
      });
    },
    passAdmin() {
      var token = localStorage.getItem("token");
      if (token) {
        this.$router.push("/menu");
      }
    },
  },
  mounted(){
    this.passAdmin();
  }
};
</script>

<style>
label{
  font-family: 'Montserrat', sans-serif;
}

</style>
