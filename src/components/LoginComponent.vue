<template>
  <form v-on:submit.prevent="accessLogin()">
    <label>Email</label>
    <input type="text" class="form-control" v-model="dato.userName" />
    <label>Password</label>
    <input type="text" class="form-control" v-model="dato.password" />
    <button class="btn btn-success">Enviar</button>
  </form>
  
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

<style></style>
