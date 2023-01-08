import { createWebHistory, createRouter } from "vue-router";
import InicioComponent from "./components/InicioComponent.vue";
import LoginComponent from "./components/LoginComponent.vue";
import MenuComponent from "./components/MenuComponent.vue";
import SalasComponent from "./components/SalasComponent.vue";
import TimeComponent from "./components/TimeComponent.vue";
import ConfirmSalaEmpresa from "./components/ConfirmSalaEmpresa.vue";
import VisitanteComponent from "./components/VisitanteComponent.vue";
import DataComponent from "./components/DataComponent.vue";
const routes = [
    {
        path:"/", component:InicioComponent
    },
    {
        path:"/login", component:LoginComponent
    },
    {
        path:"/menu", component:MenuComponent    
    },
    {
        path:"/salas", component:SalasComponent
    },
    {
        path:"/time",component:TimeComponent
    },
    {
        path:"/confirm", component:ConfirmSalaEmpresa
    },
    {
        path:"/visitante", component:VisitanteComponent
    },
    {
        path:"/data", component:DataComponent
    },
   
]

const router = createRouter({
    history:createWebHistory(),
    routes : routes
})

export default router;