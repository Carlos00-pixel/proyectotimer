<template>
  <div>
    <nav class="flex-column navbar navbar-expand-lg navbar-light">
      <router-link style="margin-top: 10px; width: 320px;font-family: 'Montserrat', sans-serif;" class="btn btn-primary" to="/login">Admin</router-link><br />
      <router-link style="margin-top: 10px; width: 320px;font-family: 'Montserrat', sans-serif;" class="btn btn-primary" to="/visitante">Visitante</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "InicioComponent",
  data() {
    return {};
  },
};
</script>

<style></style>
