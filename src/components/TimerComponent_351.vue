<template>
  <div class="center">
    <div class="rectangulo">
        <ul v-for="dat in datos" :key="dat">
            <li>{{dat.empresa}}</li> 
            <li> - Sala {{dat.idSala}}: {{dat.sala}}</li>
        </ul>
    </div>
    <button style="margin-top: 5px; margin-bottom: 5px" class="btn btn-primary" @click="trabajoTimer()">WORK</button>
    <button style="margin-top: 5px; margin-bottom: 5px" class="btn btn-primary" @click="descansoTimer()">Descanso</button>
    <h1>{{ timer }}</h1>
    <button class="btn btn-success" @click="comenzarTimer()">Comenzar</button>
    <button class="btn btn-info" @click="pausarTimer()">Pausar</button>
    <button class="btn btn-danger" @click="reiniciarTimer()">Reiniciar</button>
  </div>
</template>

<script>
import ServiceTimer from "../services/ServiceTimer";
const service = new ServiceTimer();
import Swal from 'sweetalert2'

export default {
  data() {
    return {
        datos: [],
        timer: '00:00',
        minutos: 15,
        segundos: 0,
        segundosRestantes: 0,
        interval: null
    }
  },
  methods: {
    comenzarTimer() {
        this.interval = setInterval(() => {
        this.segundosRestantes = this.segundosRestantes - 1;
        this.updateTimer();
        if (this.segundosRestantes < 0) {
            clearInterval(this.interval);
            this.interval = null;
        }
      }, 1000)
    },
    pausarTimer() {
        clearInterval(this.interval);
        this.interval = null;
    },
    reiniciarTimer() {
        this.pausarTimer();
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: '¿Estas seguro de querer reiniciar?',
            text: "El contador volverá a su estado inicial para tí y todos los demás dispositivos!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '¡Sí, reiniciar!',
            cancelButtonText: '¡No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                '¡Reiniciado!',
                '¡El contador ha sido reiniciado!',
                'success',
                clearInterval(this.interval),
                this.interval = null,
                this.segundosRestantes = this.minutos * 60 + this.segundos,
                this.updateTimer(),
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                'Cancelado',
                'Todo sigue tal cual lo dejaste :)',
                'error',
                this.comenzarTimer()
                )
            }
        })
    },
    descansoTimer(){
        clearInterval(this.interval);
        this.interval = null;
        this.minutos = 5;
        this.segundosRestantes = this.minutos * 60 + this.segundos;
        this.updateTimer();
    },
    trabajoTimer(){
        clearInterval(this.interval);
        this.interval = null;
        this.minutos = 15;
        this.segundosRestantes = this.minutos * 60 + this.segundos;
        this.updateTimer();
    },
    updateTimer() {
        let min = parseInt(this.segundosRestantes / 60);
        let sec = parseInt(this.segundosRestantes % 60);
        this.timer = `${this.paddedFormat(min)}:${this.paddedFormat(sec)}`;
    },
    paddedFormat(time) {
        return time.toString().padStart(2, '0')
    }
  },
  mounted() {
    this.segundosRestantes = this.minutos * 60 + this.segundos;
    this.updateTimer();
    service.mostrarEmpresasSalas().then(result => {
        console.log(result);
        this.datos = result;
    });
  }
}
</script>

<style scoped>
    div.center{
        text-align: center;
        margin-top: 10px;
    }

    div.rectangulo{
        margin: 0 auto;
        width: 50%;
        border: 1px solid black;
        border-radius: 0;
        
    }

    h1{
        font-size: 90px;
    }

    button{
        margin-right: 5px;
        margin-left: 5px;
    }

    li{
        display: inline;
    }
</style>
