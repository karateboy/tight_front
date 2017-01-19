import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import {routes} from  './route';
import {store} from './store/store';
import axios from 'axios'
import baseUrl from './baseUrl'

Vue.use(VueRouter);
const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next)=>{
    if(to.name == 'Login' || store.getters.isAuthenticated)
        next(true)
    else
        next({name:'Login'})
})

//Setup axios config
axios.defaults.baseURL = baseUrl()
axios.defaults.withCredentials = true

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})
