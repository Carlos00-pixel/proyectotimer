<template>
  <div>
    <nav class="flex-column navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="nav-link active" to="/login">Admin</router-link><br />
      <router-link class="nav-link" to="/visitante">Visitante</router-link>
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
