<template>
    <div>
      <h1>Descanso</h1>
      <h2>Minutos</h2><br/>
      <input type="number" v-model="timer.minutes"/>
      <h2>Segundos</h2><br/>
      <input type="number" v-model="timer.seconds"/><br/>
      <button @click="confirmar" style="margin-top: 10px">CONFIRMAR</button>
    </div>
</template>
  
<script>
    export default {
        name:"DescansoTimer",
        data(){
            return{
                timer:{
                    minutes:0,
                    seconds:0
                }, 
                interval: null
                
            }
        },
        methods:{
            confirmar(){
            localStorage.setItem("descanso",JSON.stringify(this.timer))
            this.$router.push("/")
            }
        },
        mounted(){
            
        }
    }
  </script>
  
  <style>
  
  </style>