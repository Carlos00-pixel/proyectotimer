<template>
  <div v-if="timers">
    <table class="table table-info">
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
    <router-link class="btn btn-warning" to="/">Home</router-link>
  </div>

  <div>
    <label>Sala 1</label><br/>
    <div>

    </div>
    <label>Estado {{estado}}</label>
    <p>Tiempo restante:  {{ minutes }} minutos {{ seconds }} segundos</p>
  </div>
</template>

<script>
import AdminService from "@/services/AdminService";
const service = new AdminService();
import TimerService from '@/services/TimerService'
const serviceTimer = new TimerService();
export default {
  name: "VisitanteComponent",
  data() {
    return {
      timers: [],
      minutes:0,
      seconds:0,
      running:true,
      estado:"WORK",
      tiempoTotal:0,
      tiempoEjecucion:0
    };
  },
  methods: {
    getDatos() {
      service.getTiemposEventos().then((result) => {
        this.timers = result;
      });
    },
    temporizador(){
      this.interval = setInterval(() => {
        if (this.running) {                   
            this.seconds--;
          if (this.seconds < 0) {
            this.minutes--;
            this.seconds = 59;
          }
          if (this.minutes < 0) {
            this.hours--;
            this.minutes = 59;
          }
          if (this.hours < 0) {
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
            this.running = false;
            


          }
        }
      }, 1000)
           
    }
  },
  mounted() {
    this.getDatos();
    serviceTimer.getCategoriaTimer(8).then(res=>{
      this.tiempoEjecucion=res
    })
    serviceTimer.getCategoriaTimer(7).then(res=>{
      this.tiempoTotal=res
    })

    var today = new Date();
     
    today.getMinutes();

    

    
    
     
   
  },
  watch:{
    estado:function(newValue, oldValue){
        if (newValue != oldValue) {
          console.log("nada")
        }
    }
}
};
</script>

<style></style>
