<template>
  <div>
    <div>
    <router-link style="position:relative; left:880px;top: 0px;" class="btn btn-warning" to="/menu">Volver</router-link>
  </div>

  <div class="container mt-5"  id="cajaForm">
    <div class="form-inline mb-3"  style="width:350px;position: relative;left: 480px;">
      <label class="mr-3" for="name">Categoria:</label>
      <input style="width:350px" class="form-control mr-3" type="text" id="name" v-model="name" />
      <label class="mr-3" for="minutes">Minutos:</label>
      <input style="width:350px" class="form-control mr-3" type="number" min="0" max="59" id="minutes" v-model="minutes" />
      <button style="margin-top:10px; width: 350px;" class="btn btn-primary" @click="createCounter">Crear Temporizador</button>
      <button class="btn btn-primary" style="width:350px;margin-top: 10px;" @click="startAll">Iniciar </button>
      <button class="btn btn-primary" style="width:350px;margin-top: 10px;" @click="reset">Reset </button>
    </div>
    
    <div class="counters mt-3">
      <counter
        v-for="(counter, index) in counters"
        :key="index"
        :minutes="counter.minutes"
        :seconds="counter.seconds"
        :is-running="counter.isRunning && currentIndex === index"
        :index="index"
        :current-index="currentIndex"
        :name="counter.name"
        @start-next="startNext"
        @remove-counter="removeCounter(index)"
        @edit-counter="editCounter(index)"
      />
    </div>
  </div>
  </div>
 
</template>
<script>
import Swal from 'sweetalert2'
import Counter from './CounterComponent.vue'
import TimerService from '@/services/TimerService'
const service = new TimerService();
export default {
  components: {
    Counter,
  },
  data() {
    return {
      counters: [],
      currentIndex: 0,
      name: '',
      minutes: 0,
      aux:0,
      timenow:{
        hour:0,
        minutes:0,
        seconds:0
      }
      
    }
  },
  mounted(){
    if(JSON.parse(localStorage.getItem('contadores'))==[]){
      return
      
    }else{
      this.counters=JSON.parse(localStorage.getItem('contadores'))
      console.log("aqui")
    }
      
  },
  methods: {
    reset(){
      if(this.counters==[]){
              Swal.fire(
        'No hay temporizadores',
        '',
        'warning'
        )
      }else{
        Swal.fire({
        title: '¿Esta seguro que quiere borrar los temporizadores?',
        text: "Es irreversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          this.counters=[]
          localStorage.setItem("contadores",JSON.stringify(this.counters))
        }
      })
      }
      
      
    },
    createCounter() {
      if(this.name=="" || this.minutes==0){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Los campos no pueden estar vacios',
          footer: ''
        })
      }else{
          this.counters.push({
          minutes: this.minutes,
          seconds: 0,
          isRunning: false,
          name: this.name.toUpperCase(),
          })

          localStorage.setItem("contadores",JSON.stringify(this.counters))
         
      }
     
    },
    startAll() {
      
      if(this.counters!=[]){
              Swal.fire(
        'No hay temporizadores para iniciar',
        '',
        'warning'
        )
      }else{
        for(let i=0 ; i<this.counters.length;i++){
        this.aux+=this.counters[i].minutes;
      }
      var today = new Date();
      this.timenow.hour= today.getHours();
      this.timenow.minutes= today.getMinutes();
      this.timenow.seconds= today.getSeconds();
      console.log(this.aux)
      var obj = {
        idCategoria:8,
        categoria:"prueba",
        duracion:today.getMinutes()
      }
      service.putCategoriaTimer(obj).then(res=>{
        console.log(res) //esto para almacenar el tiempo 
      })

      var obj2 = {
        idCategoria:7,
        categoria:"horaclick",
        duracion:this.aux
      }

      service.putCategoriaTimer(obj2).then(res=>{
        console.log(res) //esto para almacenar la suma total de los temporizadores
      })
      localStorage.setItem("temporizador",JSON.stringify(this.aux))
      localStorage.setItem("timenow",JSON.stringify(this.timenow))

      if (this.counters.some(counter => !counter.isRunning)) {
        this.currentIndex = 0
        this.counters = this.counters.map((counter, index) => {
          if (index === 0) {
            return {
              ...counter,
              isRunning: true
            }
          } else {
            
            return counter
          }
        })
      } else {
        this.currentIndex = 0
        this.counters = this.counters.map((counter, index) => {
          if (index === 0) {
            return {
              ...counter,
              isRunning: true
            }
          } else {
            console.log("terminado")
            return {
              ...counter,
              
              isRunning: false
            }
          }
        })
      }
      }
      
    },
    startNext(index) {
      this.counters = this.counters.map((counter, i) => {
        if (i === index + 1) {
          return {
            ...counter,
            isRunning: true
          }
        } else if (i === index) {
          return {
            ...counter,
            isRunning: false
}
        } else {
          return counter
        }
      })
      this.currentIndex = index + 1
    },
    removeCounter(index) {

      this.counters.splice(index, 1)

      },

      editCounter(index){
          
          Swal.fire({
        title: 'Ingresa el nombre del timer',
        input: 'text',
        inputLabel: 'Nombre',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Siguiente',
        showLoaderOnConfirm: true,
        preConfirm: (nombre) => {
         this.counters[index].name=nombre
        },
        allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.value) {
            Swal.fire({
              title: `Ingresa los minutos del timer`,
              input: 'number',
              inputLabel: 'Minutos',
              inputAttributes: {
                min: 0,
              },
              showCancelButton: true,
              confirmButtonText: 'Enviar',
              showLoaderOnConfirm: true,
              preConfirm: (min) => {
               this.counters[index].minutes=min
              },
              allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
              if (result.value) {
                Swal.fire(
                  'Enviado',
                  `El timer ha sido editado correctamente :D`,
                  'success'
                )
              }
            })
          }
        })

          
      }
  },
}
</script>
<style scoped>
.counter {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}

#cajaForm{
  position: relative;
  left:  30px;
}
</style>