<template>
  <div v-if="empresas">
    <h1 v-for="emp in empresas" :key="emp">{{ emp.nombreEmpresa }}</h1>
  </div>
  <div>
    <ul>
      <li v-for="tim in timers" :key="tim">{{ tim.pausa }}</li>
    </ul>
  </div>
  <router-link to="/time">Timer</router-link>
  
</template>

<script>
import TimerService from '@/services/TimerService';
const service = new TimerService();
export default {
name:"InicioComponent",
data(){
  return {
    empresas:[],
    timers:[]
  }
},
mounted(){
  service.getEmpresas().then((result)=>{
    this.empresas = result
  });

  service.getTimers().then((result)=>{
    this.timers = result
  })

}
}
</script>

<style>

</style>