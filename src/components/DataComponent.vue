<template>
  <div v-if="timers">
    <table class="table table-info">
      <thead>
        <tr>
          <th>Empresa</th>
          <th>Sala</th>
          <th>Borrar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="time in timers" :key="time">
          <td>{{ time.empresa }}</td>
          <td>{{ time.sala }}</td>
          <td>
            <button class="btn btn-danger" @click="alertDelete(time.idEmpresa)">Borrar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link class="btn btn-warning" to="/menu">Volver</router-link>
  </div>
</template>

<script>
import AdminService from "@/services/AdminService";
const service = new AdminService();
export default {
  name: "VisitanteComponent",
  data() {
    return {
      reload:false,
      timers: [],
      getTiempo_Empresa: [],
      delSal:"",
      delEmp:""
    };
  },
  methods: {
    getDatos() {
      service.getTiemposEventos().then((result) => {
        this.timers = result;
      });
    },
    deleteTiemposSalEmp(idTablas) {
      service.deleteTiemposEmpresasSalas(idTablas).then((res) => {
        console.log(res + "borrado");
      });
    },
    filtrarTabla(idtabla) {
      var idTablaTIEMPOS_EMPRESAS_SALAS = this.getTiempo_Empresa.find(
        (i) => i.idEmpresa === idtabla
      );
      console.log(idTablaTIEMPOS_EMPRESAS_SALAS.id);
      this.delEmp = idTablaTIEMPOS_EMPRESAS_SALAS.idEmpresa;
      this.delSal = idTablaTIEMPOS_EMPRESAS_SALAS.idSala;
      this.deleteTiemposSalEmp(idTablaTIEMPOS_EMPRESAS_SALAS.id);
      this.reload = true;
    },
    alertDelete(idtabla) {
      this.filtrarTabla(idtabla);
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
            this.deleteEmp();
            this.deleteSal();
          }
        });
    },
    deleteSal() {
      service.deleteSalas(this.delSal).then((res) => {
        console.log(res + "borrado");
      });
    },
    deleteEmp() {
      service.deleteEmpresas(this.delEmp).then((res) => {
        console.log(res + "borrado");
      });
    },
  },
  mounted() {
    this.getDatos();
    service.getTiempoEmpresaSala().then((res) => {
      this.getTiempo_Empresa = res.data;
    });
  },
  watch: {
    "reload"(newValue, oldValue) {
      if (newValue != oldValue) {
        this.reload = false;
        this.getDatos();
      }
    },
}
}
</script>

<style></style>
