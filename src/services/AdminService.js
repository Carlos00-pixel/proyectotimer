import axios from "axios";
import Global from "@/Global";
export default class AdminService {
  getToken(data) {
    return new Promise(function (resolve) {
      var request = "/Auth/Login";
      var url = Global.urlApiTimer + request;
      var token = "";
      axios.post(url, data).then((res) => {
        token = res.data.response;
        localStorage.setItem("token", token);
        resolve(token);
      });
    });
  }

  addEmpresa(dato) {
    return new Promise(function (resolve) {
      var request = "/api/Empresas/CreateEmpresa/" + dato;
      var url = Global.urlApiTimer + request;
      axios.post(url).then((res) => {
        resolve(res);
      });
    });
  }

  addSala(dato) {
    return new Promise(function (resolve) {
      var request = "/api/Salas/CreateSala/" + dato;
      var url = Global.urlApiTimer + request;
      axios.post(url).then((res) => {
        resolve(res);
      });
    });
  }

  getSala() {
    return new Promise(function (resolve) {
      var request = "/api/Salas";
      var url = Global.urlApiTimer + request;
      axios.get(url).then((res) => {
        resolve(res);
      });
    });
  }

  getEmpresa() {
    return new Promise(function (resolve) {
      var request = "/api/Empresas";
      var url = Global.urlApiTimer + request;
      axios.get(url).then((res) => {
        resolve(res);
      });
    });
  }

  addTiempoEmpresaSala(datos) {
    return new Promise(function (resolve) {
      var request = "/api/TiempoEmpresaSala";
      var url = Global.urlApiTimer + request;
      axios.post(url, datos).then((res) => {
        resolve(res);
      });
    });
  }

  getTiempoEmpresaSala() {
    return new Promise(function (resolve) {
      var request = "/api/TiempoEmpresaSala";
      var url = Global.urlApiTimer + request;
      axios.get(url).then((res) => {
        resolve(res);
      });
    });
  }

  getTiemposEventos() {
    return new Promise(function (resolve) {
      var request = "/api/TimerEventos";
      var url = Global.urlApiTimer + request;
      var tiempos = [];
      axios.get(url).then((res) => {
        tiempos = res.data;
        resolve(tiempos);
      });
    });
  }

  deleteTiemposEmpresasSalas(idBorrar) {
    return new Promise(function (resolve) {
      var request = "/api/TiempoEmpresaSala/" + idBorrar;
      var url = Global.urlApiTimer + request;
      axios.delete(url).then((res) => {
        resolve(res);
      });
    });
  }

  deleteSalas(idBorrar) {
    return new Promise(function (resolve) {
      var request = "/api/Salas/" + idBorrar;
      var url = Global.urlApiTimer + request;
      axios.delete(url).then((res) => {
        resolve(res);
      });
    });
  }

  deleteEmpresas(idBorrar) {
    return new Promise(function (resolve) {
      var request = "/api/Empresas/" + idBorrar;
      var url = Global.urlApiTimer + request;
      axios.delete(url).then((res) => {
        resolve(res);
      });
    });
  }
}
