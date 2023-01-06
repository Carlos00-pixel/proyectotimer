<template>
  <h1>Delete</h1>

    <ul>
        <li  v-for="sal in getTiempo_Empresa" :key="sal">id sala{{ sal.idSala }} id de la empresa{{ sal.idEmpresa }} id de la tabla{{ sal.id }}</li>
        <li  v-for="sal in getSala" :key="sal">id sala{{ sal.idSala }} nombre {{ sal.nombreSala }}</li>
        
    </ul>
    <table>
        <thead>
            <tr>
                <th>
                    Empresa
                </th>
                <th>
                    IdEmpresa
                </th>
                <th>
                    Sala
                </th>
                <th>
                    idSala
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="sal in getEMPRESA" :key="sal">
                <td>{{ sal.nombreEmpresa  }}</td>
                <td>{{ sal.idEmpresa  }}</td>
                
            </tr>
            <tr v-for="sal in getSala" :key="sal">
                <td>{{ sal.nombreSala  }}</td>
                <td>{{ sal.idSala  }}</td>
            </tr>
        </tbody>
    </table>

</template>

<script>
import AdminService from "@/services/AdminService";
const service = new AdminService();
export default {
name:"DeleteComponent",
data(){
    return{
        getEMPRESA:[],
        getSala:[],
        getTiempo_Empresa:[]
    }
},
methods:{

},
mounted(){
    service.getEmpresa().then(res=>{
        console.log(res.data)
        this.getEMPRESA = res.data;
    }),

    service.getSala().then(res=>{
        console.log(res.data)
        this.getSala = res.data;
    })

    service.getTiempoEmpresaSala().then(res=>{
        this.getTiempo_Empresa = res.data
    })
    
}
}
</script>

<style>

</style>