<template>
    
    <div class="card" style="margin-top:15px;border: solid 1px;border-radius: 8px;border-color: rosybrown;">
        <div class="card-body">
            <label style="float:left;font-family: monospace;width: 200px;">Categoria:   <b>{{ name }}</b></label>
            <div style=" display: inline; padding-left: 30%;">
                
                <label style="text-align:center">{{ minutesString }}:</label>
                <label  style="text-align:center" > {{ secondsString }}</label> 
            </div>
            
            <div style="display: inline; float: right;">
                <button class="btn btn-danger btn-sm" @click="$emit('remove-counter')">Eliminar</button>
                <button class="btn btn-warning btn-sm" @click="$emit('edit-counter')">Editar</button>
            </div>   
            

        </div>
    </div>
    
  </template>
<script>
  export default {
    name: "CounterComponent",
    props: {
      minutes: {
        type: Number,
        required: true,
      },
      seconds: {
        type: Number,
        required: true,
      },
      isRunning: {
        type: Boolean,
        required: true,
      },
      index: {
        type: Number,
        required: true,
      },
      currentIndex: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        timeLeft: (this.minutes * 60) + this.seconds,
      }
    },
    computed: {
      minutesString() {
       
        return String(Math.floor(this.timeLeft / 60)).padStart(2, '0')
      },
      secondsString() {
        return String(this.timeLeft % 60).padStart(2, '0')
      },
    },
    watch: {
      isRunning(newValue) {
        if (newValue) {
          const interval = setInterval(() => {
            this.timeLeft--
            if (this.timeLeft <= 0) {
              clearInterval(interval)
              this.$emit('start-next', this.index)
              this.timeLeft = 0
            }
          }, 1000)
          
        }
      },
      minutes(newValue){
        if(newValue) {
          
           this.timeLeft=(this.minutes * 60) + this.seconds
        }
      }    
  }
    
  }
  </script>
  <style scoped>
  .counter {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
  }
  #toasts {
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
  </style>