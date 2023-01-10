<template>
  <div class="flex-column navbar navbar-expand-lg navbar-light text-center">
    <h1 style="font-family: 'Montserrat', sans-serif;">Por favor confirme los siguientes nombres</h1><br/>
    <div v-if="names">
      <h1 style="font-family: 'Montserrat', sans-serif;;color:red">Nombre Empresa</h1>
      <h2 >{{ names.nombreEmpresa }}</h2>
      <h1 style="font-family: 'Montserrat', sans-serif;;color:red">Nombre Sala</h1>
      <h2 >{{ names.nombreSala }}</h2>
    </div>
    <div v-else>
      <img src="../assets/images/load2.gif" />
    </div>
    <button style="margin-top:10px; width: 350px;font-family: 'Montserrat', sans-serif;" class="btn btn-success" @click="postDatosEmpresaSala()">Confirmar</button>
  </div>
</template>

<script>
import AdminService from "@/services/AdminService";
const service = new AdminService();
export default {
  name: "ConfirmSalaEmpresa",
  data() {
    return {
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
    "datos.idSala"(newValue, oldValue) {
      if (newValue != oldValue) {
        this.tenerSalasAndEmpresa();
      }
    },
  },
};
</script>

<style>  </style>