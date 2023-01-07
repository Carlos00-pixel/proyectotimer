<template>
  <h1>Delete</h1>

  <ul>
    <li v-for="sal in getTiempo_Empresa" :key="sal">
      id sala{{ sal.idSala }}------id empresa{{ sal.idEmpresa }}------id tabla
      {{ sal.id }}
    </li>
  </ul>

  <button @click="filtrarTabla()">dato</button>
</template>

<script>
import AdminService from "@/services/AdminService";
const service = new AdminService();
export default {
  name: "DeleteComponent",
  data() {
    return {
      getEMPRESA: [],
      getSala: [],
      getTiempo_Empresa: [],
    };
  },
  methods: {
    filtrarTabla() {
      var idEmpresa = this.$route.params.idEmpresa;
      var idTablaTIEMPOS_EMPRESAS_SALAS = this.getTiempo_Empresa.find((i) => i.idEmpresa == idEmpresa);
      console.log(idTablaTIEMPOS_EMPRESAS_SALAS.id);
    },
  },
  mounted() {
    service.getEmpresa().then((res) => {
      console.log(res.data);
      this.getEMPRESA = res.data;
    }),
      service.getSala().then((res) => {
        console.log(res.data);
        this.getSala = res.data;
      });

    service.getTiempoEmpresaSala().then((res) => {
      this.getTiempo_Empresa = res.data;
    });
  },
};
</script>

<style></style>
