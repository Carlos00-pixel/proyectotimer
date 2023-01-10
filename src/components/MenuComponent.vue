<template>
  <div>
    <nav class="flex-column navbar navbar-expand-lg navbar-light">
      <router-link
      style="margin-top: 10px; width: 320px;font-family: 'Montserrat', sans-serif;"
        class="btn btn-primary"
        to="/"
        >Home</router-link
      ><br /><br />

      <router-link
        style="margin-top: 10px; width: 320px;font-family: 'Montserrat', sans-serif;"
        class="btn btn-primary"
        to="/time"
        >Establecer Temporizadores</router-link
      ><br /><br />

      <router-link
      style="margin-top: 10px; width: 320px;font-family: 'Montserrat', sans-serif;"
        class="btn btn-primary"
        to="/salas"
        >Añadir Empresa</router-link
      ><br /><br />

      <router-link
       style="margin-top: 10px; width: 320px;font-family: 'Montserrat', sans-serif;"
        class="btn btn-primary"
        to="/data"
        >Ver Datos</router-link
      ><br /><br />

      <router-link
       style="margin-top: 10px; width: 320px;font-family: 'Montserrat', sans-serif;"
        class="btn btn-primary"
        @click="outMenu()"
        to="/"
        >Cerrar Sesión</router-link
      ><br /><br />
    </nav>
  </div>
</template>

<script>
export default {
  name: "MenuComponent",
  methods: {
    outMenu() {
      var removeToken = localStorage.removeItem("token");
      console.log(removeToken);
    },
    passAdmin() {
      var token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/");
        611;
      }
    },
  },
  mounted() {
    this.passAdmin();
  },
};
</script>

<style>

</style>
