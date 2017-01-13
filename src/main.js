import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import {routes} from  './route';
import {store} from './store/store';

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


new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})
