<template>
  <div class="container mt-5">
    <div class="form-inline mb-3">
      <label class="mr-3" for="name">Nombre:</label>
      <input class="form-control mr-3" type="text" id="name" v-model="name" />
      <label class="mr-3" for="minutes">Minutos:</label>
      <input class="form-control mr-3" type="number" min="0" max="59" id="minutes" v-model="minutes" />
      <button class="btn btn-primary" @click="createCounter">Crear</button>
    </div>
    <div class="center">
      <button class="btn-iniciar" ref="botonIniciar" @click="startAll"></button>
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
</template>

<script>
import Counter from './CounterComponent.vue'
import Swal from 'sweetalert2'

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
    }
  },
  methods: {
    createCounter() {
      this.counters.push({
        minutes: this.minutes,
        seconds: 0,
        isRunning: false,
        name: this.name,
      })
    },
    startAll() {
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
            return {
              ...counter,
              isRunning: false
            }
          }
        })
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
    editCounter(index) {
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
        this.counters = this.counters.map((counter, i) => {
        if (i === index) {
          return {
            ...counter,
            name: nombre,
            }
          } else {
            return counter
          }
        })
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
              if (isNaN(min)) {
                Swal.showValidationMessage(
                  `Los minutos deben ser un número válido`
                )
              }else {
                this.counters = this.counters.map((counter, i) => {
                  if (i === index) {
                    return {
                      ...counter,
                      minutes: min,
                      }
                    } else {
                      return counter
                    }
                  })
              }
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
    },
  }
}
</script>

<style scoped>
div.center{
  text-align: center;
  margin-top: 10px;
}
.counter {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}
.btn-iniciar {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 50%;
  background-color: #27ff39;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  color: #fff;
  font-size: 16px;
  text-align: center;
  background-image: url('./../assets/images/inicio.png');
  background-size: cover;
  height: 200px;
  width: 200px;
}

.btn-iniciar:hover {
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
}

.btn-iniciar:active {
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  transform: scale(0.9);
}
</style>