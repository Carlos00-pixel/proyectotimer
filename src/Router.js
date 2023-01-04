import { createWebHistory, createRouter } from "vue-router";
import InicioComponent from "./components/InicioComponent.vue"
import TimeComponent from "./components/TimeComponent.vue"
const routes = [
    {
        path:"/", component:InicioComponent
    },
    {
        path:"/time", component:TimeComponent
    }

]

const router = createRouter({
    history:createWebHistory(),
    routes : routes
})

export default router;