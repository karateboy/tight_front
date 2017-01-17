import Dashboard from "./components/Dashboard.vue"
import NewOrder from "./components/NewOrder.vue"
import Login from "./components/Login.vue"
import Order from "./components/Order.vue"
import MyOrder from "./components/MyOrder.vue"
import QueryOrder from "./components/QueryOrder.vue"
import Schedule from "./components/Schedule.vue"
import NewSchedule from "./components/NewSchedule.vue"
import DyeCardList from "./components/DyeCardList.vue"
import WorkCardView from "./components/WorkCardView.vue"

export const routes = [
    {path: '/', component: Dashboard, name: 'Dashboard'},
    {path: '/Login', component: Login, name: 'Login'},
    {
        path: '/Order', component: Order, name: 'Order',
        children: [
            {path: 'New', component: NewOrder},
            {path: 'Mine', component: MyOrder, name: 'MyOrder'},
            {path: 'Query', component: QueryOrder}
        ]
    },
    {
        path: '/Schedule', component: Schedule, name: 'Schedule',
        children: [
            {path: 'New', component: NewSchedule},
            {path: 'DyeCardList', component: DyeCardList},
            {path: 'WorkCard', component: WorkCardView}
        ]
    },
    {path: '*', redirect: '/'}
];
