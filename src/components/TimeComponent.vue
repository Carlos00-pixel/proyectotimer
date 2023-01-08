<template>
  <div>
    <p>Tiempo restante: {{ timer.hours }} horas {{ timer.minutes }} minutos {{ timer.seconds }} segundos</p>
    <h2>Horas</h2><br/>
    <input type="number" v-model="timer.hours"/>
    <h2>Minutos</h2><br/>
    <input type="number" v-model="timer.minutes"/>
    <h2>Segundos</h2><br/>
    <input type="number" v-model="timer.seconds"/><br/>
    <button @click="confirmar">Confirmar</button>
    <button @click="running = true">Comenzar</button>
    <button @click="running = false">Pausar</button>
    <button @click="resetTimer()">Reset</button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      timer:{
        hours: 4,
        minutes: 0,
        seconds: 56
      },
     
      running: false,
      interval: null
    }
  },
  methods:{
    funTimer(){
      this.interval = setInterval(() => {
        if (this.running) {
          this.timer.seconds--;
          if (this.timer.seconds < 0) {
            this.timer.minutes--;
            this.timer.seconds = 59;
          }
          if (this.timer.minutes < 0) {
            this.timer.hours--;
            this.timer.minutes = 59;
          }
          if (this.timer.hours < 0) {
            this.timer.hours = 0;
            this.timer.minutes = 0;
            this.timer.seconds = 0;
            this.timer.running = false;
          }
        }
      }, 1000)
    },
    resetTimer(){
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
    },
    confirmar(){
      localStorage.setItem("tiempo",JSON.stringify(this.timer))
      this.$router.push("/descanso")
    }

  },
  mounted() {
    this.funTimer();
}
}

</script>