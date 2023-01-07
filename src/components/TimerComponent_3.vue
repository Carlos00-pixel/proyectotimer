<template>
  <div>
    <ul v-for="dat in datos" :key="dat">
      <li>{{dat.empresa}}</li> 
      <li> - Sala {{dat.idSala}}: {{dat.sala}}</li>
    </ul>
  </div>
</template>

<script>
import ServiceTimer from "../services/ServiceTimer";
const service = new ServiceTimer();

export default {
  name: 'TimerComponent_3',
  data() {
    return {
      datos:[],
    }
  },
  methods: {
    loadEmpresasSalas(){
      service.mostrarEmpresasSalas().then(result => {
        console.log(result);
        this.datos = result;
      });
    }
  },
  mounted() {
    this.loadEmpresasSalas();
  }
}
</script>

<style scoped>
 li{
  display: inline;
 }
</style>
