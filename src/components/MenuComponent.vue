<template>
  <div>
    <nav class="flex-column navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="nav-link active" to="/">Home</router-link><br /><br />

      <router-link class="nav-link " to="/time"
        >Establecer Temporizadores</router-link
      ><br /><br />

      <router-link class="nav-link" to="/salas">Añadir Empresa</router-link
      ><br /><br />

      <router-link class="nav-link" to="/data">Ver Datos</router-link
      ><br /><br />

      <router-link class="nav-link" @click="outMenu()" to="/"
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
        this.$router.push("/");611
      }
    },
  },
  mounted() {
    this.passAdmin();
  },
};
</script>

<style></style>
