/**
 * Created by user on 2017/1/20.
 */
const emptyOrder = {
    _id: "",
    salesId: "",
    name: "",
    expectedDeliverDateObj: new Date(),
    expectedDeliverDate: 0,
    factoryId: "",
    customerId: "",
    brand: "",
    date: 0,
    details: [],
    notices: [],
    active: true
}

const state = {
    order_op_mode:"new",
    order: Object.assign({}, emptyOrder)
}

const getters = {
    order: state =>{
        return state.order;
    }
}

const mutations = {
    updateOrder: (state, payload) => {
        state.order = payload.order
        state.order_op_mode = payload.order_op_mode
    }
}

const actions = {
    newOrder : ({commit}) => {
        const newOrder = Object.assign({}, emptyOrder)
        newOrder.expectedDeliverDateObj = new Date()
        commit('updateOrder', {order:newOrder, order_op_mode:"new"});
    },
    displayOrder : ({commit}, myOrder) =>{
        commit('updateOrder', {order:myOrder, order_op_mode:"display"})
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
