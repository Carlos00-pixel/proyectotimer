<template>
  <form v-on:submit.prevent="postSalaAndEmpresa()">
    <label>Sala</label><br />
    <input type="text" v-model="nombreSala" /><br />
    <label>Nombre Empresa</label><br />
    <input type="text" v-model="nombreEmpresa" /><br />
    <button>Confirmar</button>
  </form>
  <router-link to="/menu">Volver</router-link>
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
      reload:false,

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
      this.$router.push("/confirm/" + this.reload)
    },
  },
};
</script>

<style></style>
