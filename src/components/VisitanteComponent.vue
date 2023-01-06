<template>
  <div v-if="timers">
    <table border="2px">
      <thead>
        <tr>
          <th>Empresa</th>
          <th>Sala</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="time in timers" :key="time">
          <td>{{ time.empresa }}</td>
          <td>{{ time.sala }}</td>
        </tr>
      </tbody>
    </table>
    <router-link to="/">Home</router-link>
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
    };
  },
  methods: {
    getDatos() {
      service.getTiemposEventos().then((result) => {
        this.timers = result;
      });
    },
  },
  mounted() {
    this.getDatos();
  },
};
</script>

<style></style>
