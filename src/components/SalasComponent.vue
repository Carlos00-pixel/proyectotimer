<template>
   <div class="flex-column navbar navbar-expand-lg navbar-light text-center">
  <form v-on:submit.prevent="postSalaAndEmpresa()">
    <label style="font-family: 'Montserrat', sans-serif;font-size: 1.5rem;">Nombre Empresa</label><br />
    <input type="text" v-model="nombreEmpresa" class="form-control"/><br />
    <label style="font-family: 'Montserrat', sans-serif;font-size: 1.5rem;">Sala</label><br />
    <input type="text" v-model="nombreSala" class="form-control" /><br />
    <button style="margin-top:10px; width: 350px;font-family: 'Montserrat', sans-serif;" class="btn btn-success">Confirmar</button>
  </form>
 <router-link style="margin-top:10px; width: 350px;font-family: 'Montserrat', sans-serif;" class="btn btn-warning" to="/menu">Volver</router-link>
</div>
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
