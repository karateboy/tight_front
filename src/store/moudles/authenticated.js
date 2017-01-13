/**
 * Created by user on 2017/1/12.
 */
import axios from 'axios';
import env from 'get-env';
import baseUrl from '../../baseUrl'

const state = {
    authenticated: false,
    user: {
        _id: "",
        password: "",
        name: "",
        phone: "",
        isAdmin: false,
        groupId: ""
    },
    config: {
        url:"/",
        withCredentials: true
    }
}

const getters = {
    isAuthenticated: state =>{
        return state.authenticated;
    },
    getConfig: state =>{
        return state.config;
    },
    user: state =>{
        return state.user;
    }
}

const mutations = {
    updateAuthenticated: (state, payload) => {
        state.authenticated = payload.authenticated
        state.user = payload.user
        state.config = payload.config
    }
}

const actions = {
    logout : ({commit}) => {
        commit('updateAuthenticated', {authenticated:false, config:{}});
    },
    testAuthenticated: ({commit, state}) =>{
        var url = baseUrl() + "/testAuthenticated"

        console.log(state.config)

        const resultP = axios.get(url)
        resultP.then((resp)=>{
            const ret = resp.data
            if(ret.ok)
                commit('updateAuthenticated', {authenticated:false, config})
        }).catch((err)=>
            console.log("session is not there...")
        )

    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
