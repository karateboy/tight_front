import Dashboard from "./components/Dashboard.vue"
import NewOrder from "./components/NewOrder.vue"
import Login from "./components/Login.vue"
import Order from "./components/Order.vue"
import MyOrder from "./components/MyOrder.vue"
import QueryOrder from "./components/QueryOrder.vue"
import Schedule from "./components/Schedule.vue"
import NewSchedule from "./components/NewSchedule.vue"
import ActiveDyeCardList from "./components/ActiveDyeCardList.vue"
import WorkCardView from "./components/ActiveWorkCard.vue"
import UpdateDyeCard from './components/UpdateDyeCard.vue'
import UpdateStylingCard from './components/UpdateStylingCard.vue'
import UpdateTidyCard from './components/UpdateTidyCard.vue'
import SystemManagement from './components/SystemManagement.vue'
import AddUser from './components/AddUser.vue'
import DelUser from './components/DelUser.vue'
import UpdateUser from './components/UpdateUser.vue'
export const routes = [
    {path: '/', component: Dashboard, name: 'Dashboard'},
    {path: '/Login', component: Login, name: 'Login'},
    {
        path: '/Order', component: Order, name: 'Order',
        children: [
            {path: 'New', component: NewOrder, name: 'NewOrder'},
            {path: 'Mine', component: MyOrder, name: 'MyOrder'},
            {path: 'Query', component: QueryOrder}
        ]
    },
    {
        path: '/Schedule', component: Schedule, name: 'Schedule',
        children: [
            {path: 'New', component: NewSchedule},
            {path: 'ActiveDyeCardList', component: ActiveDyeCardList, name: 'ActiveDyeCardList'},
            {path: 'WorkCard', component: WorkCardView}
        ]
    },
    {path: '/Dyeing', component: UpdateDyeCard, name: 'UpdateDyeCard'},
    {path: '/Styling', component: UpdateStylingCard, name: 'UpdateStylingCard'},
    {path: '/TidyCard/:phase', component: UpdateTidyCard, name: 'UpdateTidyCard'},
    {
        path: '/System', component: SystemManagement, name: 'SystemManagement',
        children: [
            {path: 'AddUser', component:AddUser, name:'AddUser' },
            {path: 'DelUser', component:DelUser, name:'DelUser' },
            {path: 'UpdateUser', component:UpdateUser, name:'UpdateUser' },
        ]
    },
    {path: '*', redirect: '/'}
];
