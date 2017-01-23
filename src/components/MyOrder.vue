<template>
    <div>
        <order-list :order-list="myOrder"></order-list>
    </div>
</template>
<style>
    body{
    }



</style>
<script>
    import OrderList from './OrderList.vue'
    import {mapGetters} from 'vuex'
    import axios from 'axios'

    export default{
        data(){
            return {
                msg: 'hello vue',
                fetchOrder: false,
                orderList: []
            }
        },
        computed: {
            ...mapGetters(['user']),
            myOrder(){
                if (!this.fetchOrder) {
                    const url = "/MyActiveOrder/" + this.user._id;
                    axios.get(url).then(
                            (resp) => {
                                const ret = resp.data
                                const len = this.orderList.length
                                this.orderList.splice(0, len)
                                for (let v of resp.data) {
                                    this.orderList.push(v)
                                }
                            }
                    ).catch((err) => {
                        alert(err)
                    })
                    this.fetchOrder = true
                }
                return this.orderList;
            }
        },

        components: {
            OrderList
        }
    }
</script>
