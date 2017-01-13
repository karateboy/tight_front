import Dashboard from "./components/Dashboard.vue"
import NewOrder from "./components/NewOrder.vue"
import Schedule from "./components/Schedule.vue"
import Login from "./components/Login.vue"

export const routes = [
    {path: '/', component: Dashboard, name: 'Dashboard'},
    {path: '/Login', component: Login, name: 'Login'},
    {path: '/Order/New', component: NewOrder},
    {path: '/Schedule', component: Schedule},
    {path: '*', redirect: '/'}
];
