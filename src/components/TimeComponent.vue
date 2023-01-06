<template>
    <div>
      <p>Tiempo restante: {{ hours }} horas {{ minutes }} minutos {{ seconds }} segundos</p>
      <h2>horas</h2><br/>
      <input type="number" v-model="hours"/>
      <h2>minutos</h2><br/>
      <input type="number" v-model="minutes"/>
      <h2>segundos</h2><br/>
      <input type="number" v-model="seconds"/><br/>
      <button @click="running = true">Comenzar</button>
      <button @click="running = false">Pausar</button>
      <button @click="resetTimer()">Reset</button>
      <router-link to="/menu">Volver</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name:"TimeComponent",
    data() {
      return {
        hours: 4,
        minutes: 0,
        seconds: 56,
        running: false,
        interval: null
      }
    },
    methods:{
      funTimer(){
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
      },
      resetTimer(){
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
      }

    },
    mounted() {
      this.funTimer();
  }
}

</script>