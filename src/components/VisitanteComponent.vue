<template>
      <div class="flex-column navbar navbar-expand-lg navbar-light bg-light">
        <router-link
        style="margin-top: 10px; width: 320px;font-family: 'Montserrat', sans-serif;"
          class="btn btn-warning"
          to="/"
          >Home</router-link
        >
        <button
        style="margin-top: 10px; width: 320px;font-family: 'Montserrat', sans-serif;"
          class="btn btn-warning"
          @click="ver"
        >
          Cargar
        </button>

        <p style="font-size: 23px;font-family: 'Montserrat',sans-serif;">
          Tiempo restante:<br />
          <b> {{ minutes }}</b> minutos <b>{{ seconds }}</b> segundos
        </p>
      </div>
</template>

<script>
import AdminService from "@/services/AdminService";
const service = new AdminService();
import TimerService from "@/services/TimerService";
const serviceTimer = new TimerService();
export default {
  name: "VisitanteComponent",
  data() {
    return {
      timers: [],
      minutes: 0,
      seconds: 0,
      running: true,
      estado: "WORK",
      tiempoTotal: {
        idCategoria: 0,
        categoria: "",
        duracion: 0,
      },
      tiempoEjecucion: {
        idCategoria: 0,
        categoria: "",
        duracion: 0,
      },
    };
  },
  methods: {
    getDatos() {
      service.getTiemposEventos().then((result) => {
        this.timers = result;
      });
    },
    temporizador() {
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
      }, 1000);
    },
    ver() {
      var today = new Date();

      var now = today.getMinutes();

      if (now > this.tiempoEjecucion.duracion) {
        var tiempoRestante = now - this.tiempoEjecucion.duracion;
        var aux = this.tiempoTotal.duracion - tiempoRestante;
        this.minutes = aux;
        this.running = true;
        this.temporizador();
      } else {
        var aux2 = 60 - this.tiempoEjecucion.duracion;
        if (aux2 >= this.tiempoTotal) {
          this.minutes = 0;
        } else {
          var tiempoRestante2 = now - this.tiempoEjecucion.duracion;
          var aux3 = this.tiempoTotal.duracion - tiempoRestante2;
          this.minutes = aux3;
          this.running = true;
          this.temporizador();
        }
      }
    },
  },
  mounted() {
    this.getDatos();
    serviceTimer.getCategoriaTimer(8).then((res) => {
      this.tiempoEjecucion = res;
    });

    serviceTimer.getCategoriaTimer(7).then((res) => {
      this.tiempoTotal = res;
    });
  },
  watch: {
    estado: function (newValue, oldValue) {
      if (newValue != oldValue) {
        console.log("nada");
      }
    },
  },
};
</script>

<style scoped>

</style>
