<template>
  
    <div>
    <router-link to="/time">Establecer Temporizador</router-link><br/><br/>
    <router-link to="/salas">Añadir Empresa</router-link><br/><br/>
    <router-link to="/">Home</router-link><br/><br/>
    <router-link to="/data">Ver Datos</router-link><br/><br/>
    <router-link @click="outMenu()" to="/">Salir</router-link><br/><br/>
  </div>
  
</template>

<script>
export default {
name:"MenuComponent",
methods:{
  outMenu(){
    var removeToken = localStorage.removeItem("token");
    console.log(removeToken);
  },
  passAdmin() {
      var token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/");
      }
    },
},
mounted(){
  this.passAdmin();
}
}
</script>

<style>

</style>