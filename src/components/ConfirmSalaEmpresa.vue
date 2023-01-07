<template>
  <div v-if="names">
    <h1 style="color: red">Nombre Empresa</h1>
    <h2>{{ names.nombreEmpresa }} IdEmpresa{{ datos.idEmpresa }}</h2>
    <h1 style="color: blue">Nombre Sala</h1>
    <h2>{{ names.nombreSala }} Id Sala{{ datos.idSala }}</h2>
  </div>
  <div v-else>
    <img src="../assets/images/load2.gif" />
  </div>
  <button @click="postDatosEmpresaSala()">Confirmar</button>
</template>

<script>
import AdminService from "@/services/AdminService";
const service = new AdminService();
export default {
  name: "ConfirmSalaEmpresa",
  data() {
    return {
      reload:false,
      names: {
        nombreSala: "",
        nombreEmpresa: "",
      },
      datos: {
        id: 0,
        idTimer: 1,
        idEmpresa: "",
        idSala: "",
        idEvento: 1,
      },
    };
  },
  methods: {
    postDatosEmpresaSala() {
      service.addTiempoEmpresaSala(this.datos).then((result) => {
        console.log(result);
        console.log("lo que dios quiera");
        this.$router.push("/salas");
      });
      this.reload=true;
    },
    tenerSalasAndEmpresa() {
      service.getSala().then((res) => {
        var long = res.data.length;
        console.log("el id de la sala es " + res.data[long - 1].idSala);
        this.datos.idSala = res.data[long - 1].idSala;
        this.names.nombreSala = res.data[long - 1].nombreSala;
      });

      service.getEmpresa().then((res) => {
        var long = res.data.length;
        console.log("el id de la Empresa es " + res.data[long - 1].idEmpresa);
        this.datos.idEmpresa = res.data[long - 1].idEmpresa;
        this.names.nombreEmpresa = res.data[long - 1].nombreEmpresa;
      });
    },
  },
  mounted() {
    this.tenerSalasAndEmpresa();
  },
  watch: {
    "$route.params.reload"(newValue, oldValue) {
      if (newValue != oldValue) {
        this.tenerSalasAndEmpresa();
      }
    },
  },
};
</script>

<style></style>
