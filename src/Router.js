import { createWebHistory, createRouter } from "vue-router";
import InicioComponent from "./components/InicioComponent.vue";
import LoginComponent from "./components/LoginComponent.vue";
import MenuComponent from "./components/MenuComponent.vue";
import SalasComponent from "./components/SalasComponent.vue";
import TimerComponent from "./components/TimerComponent.vue";
import ConfirmSalaEmpresa from "./components/ConfirmSalaEmpresa.vue";
import VisitanteComponent from "./components/VisitanteComponent.vue";
import DataComponent from "./components/DataComponent.vue";
import DescansoTimer from  "./components/DescansoComponent.vue"

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
        path:"/time",component:TimerComponent
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
    {
        path:"/descanso", component:DescansoTimer
    }

]

const router = createRouter({
    history:createWebHistory(),
    routes : routes
})

export default router;