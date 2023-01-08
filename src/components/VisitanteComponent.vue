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
    <p>Tiempo restante: {{ hours }} horas {{ minutes }} minutos {{ seconds }} segundos</p>
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
      hours:0,
      minutes:0,
      seconds:0,
      running:true,
      estado:"WORK"
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
            this.estado="Descanso"


          }
        }
      }, 1000)
           
    }
  },
  mounted() {
    this.getDatos();
    var timer = JSON.parse(localStorage.getItem('tiempo'));
    this.hours=timer.hours
    this.minutes=timer.minutes
    this.seconds=timer.seconds
       
    this.temporizador()
  },
  watch:{
    estado:function(newValue, oldValue){
        if (newValue != oldValue) {
            
            var timerD = JSON.parse(localStorage.getItem('descanso'));
            this.hours=0
            this.minutes=timerD.minutes
            this.seconds=timerD.seconds
            this.running=true   
            this.temporizador();
        }
    }
}
};
</script>

<style></style>
