import axios from "axios";
import Global from "@/Global";

export default class ServiceTimer {
    mostrarEmpresasSalas() {
        return new Promise(function(resolve) {
            var request = "/api/TimerEventos";
            var url = Global.urlApiTimers + request;

            var datos = [];
            axios.get(url).then(response => {
                datos = response.data;
                resolve(datos);
            });
        });
    }

    mostrarDuracionTimer(){
        return new Promise(function(resolve) {
            var request = "/api/CategoriasTimer";
            var url = Global.urlApiTimers + request;

            axios.get(url).then(response => {
                resolve(response.data);
            });
        });
    }
}