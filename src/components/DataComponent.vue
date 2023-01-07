<template>
  <div v-if="timers">
    <table border="2px">
      <thead>
        <tr>
          <th>Empresa</th>
          <th>Sala</th>
          <th>Modificar</th>
          <th>Borrar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="time in timers" :key="time">
          <td>{{ time.empresa }}</td>
          <td>{{ time.sala }}</td>
          <td><router-link to="/update">Modificar</router-link></td>
          <td>
            <button @click="filtrarTabla(time.idEmpresa)">Borrar Alert</button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link to="/menu">Volver</router-link>
  </div>
</template>

<script>
import AdminService from "@/services/AdminService";
const service = new AdminService();
export default {
  name: "VisitanteComponent",
  data() {
    return {
      timers: [],
      getTiempo_Empresa: [],
      reload:false
    };
  },
  methods: {
    getDatos() {
      service.getTiemposEventos().then((result) => {
        this.timers = result;
      });
    },
    filtrarTabla(idtabla) {
      var idTablaTIEMPOS_EMPRESAS_SALAS = this.getTiempo_Empresa.find((i) => i.idEmpresa === idtabla);
      console.log(idTablaTIEMPOS_EMPRESAS_SALAS.id);
      console.log(idTablaTIEMPOS_EMPRESAS_SALAS.idEmpresa);
      console.log(idTablaTIEMPOS_EMPRESAS_SALAS.idSala);
      this.deleteTiemposSalEmp(idTablaTIEMPOS_EMPRESAS_SALAS.id);
      // this.deleteEmp(idTablaTIEMPOS_EMPRESAS_SALAS.idEmpresa);
      // this.deleteSal(idTablaTIEMPOS_EMPRESAS_SALAS.idSala);
      this.reload = true;
    },
    deleteTiemposSalEmp(idTablas) {
      service.deleteTiemposEmpresasSalas(idTablas).then((res) => {
        console.log(res + "borradoTodo");
      });
    },
    deleteSal(idSalas) {
      service.deleteSalas(idSalas).then((res) => {
        console.log(res + "borradoSalas");
      });
    },
    deleteEmp(idEmpresas) {
      service.deleteEmpresas(idEmpresas).then((res) => {
        console.log(res + "borradoEmpresas");
      });
    },

  },
  watch: {
    "reload"(newValue, oldValue) {
      if (newValue != oldValue) {
        this.reload = false;
        this.getDatos();
      }
    },
  },
  mounted() {
    this.getDatos();
    service.getTiempoEmpresaSala().then((res) => {
      this.getTiempo_Empresa = res.data;
    });
  },
};
</script>

<style></style>
