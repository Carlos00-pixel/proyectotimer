import axios from 'axios';
import Global from '@/Global';
export default class TimerService {
    
    getEmpresas() {
        return new Promise (function (resolve){
            var request  = "/api/Empresas";
            var url = Global.urlApiTimer + request;
            var empresas = [];
            axios.get(url).then(res=>{
                empresas = res.data;
                resolve(empresas);
            })
        })
    }

    getTimers() {
        return new Promise (function (resolve){
            var request  = "/api/Timers";
            var url = Global.urlApiTimer + request;
            var timers = [];
            axios.get(url).then(res=>{
                timers = res.data;
                resolve(timers);
            })
        })
    }

    getCategoriaTimer(id) {
        return  new Promise (function (resolve){
            var request  = "/api/CategoriasTimer/"+id;            
            var url = Global.urlApiTimer + request;
           
            axios.get(url).then(res=>{
                
                resolve(res.data);
            })
        })
    }

    postCategoriaTimer(objeto){
        return new Promise (function (resolve){
            var request  = "/api/CategoriasTimer";
            var url = Global.urlApiTimer + request;
            
            axios.post(url,objeto).then(res=>{
                
                resolve(res);
            })
        })
    }

    putCategoriaTimer(objeto){
        return new Promise (function (resolve){
            var request  = "/api/CategoriasTimer";
            var url = Global.urlApiTimer+request;
            
            axios.put(url,objeto).then(res=>{
                
                resolve(res);
            })
        })
    }
}