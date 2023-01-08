<template>
  <form v-on:submit.prevent="postSalaAndEmpresa()">
    <label>Nombre Empresa</label><br />
    <input type="text" v-model="nombreEmpresa" class="form-control"/><br />
    <label>Sala</label><br />
    <input type="text" v-model="nombreSala" class="form-control" /><br />
    <button class="btn btn-success">Confirmar</button>
  </form>
  <br/><router-link class="btn btn-warning" to="/menu">Volver</router-link>
</template>

<script>
import AdminService from "@/services/AdminService";
const service = new AdminService();
export default {
  name:"SalasComponent",
  data() {
    return {
      nombreSala: "",
      nombreEmpresa: "",

    };
  },
  methods: {
    postEmpresa() {
      service.addEmpresa(this.nombreEmpresa).then((result) => {
        console.log(result);
        console.log("Añadido");
      });
    },
    postSala() {
      service.addSala(this.nombreSala).then((result) => {
        console.log(result);
        console.log("Add");
      });
    },

    postSalaAndEmpresa() {
      this.postEmpresa();
      this.postSala();
      this.$router.push("/confirm")
    },
  },
};
</script>

<style></style>
