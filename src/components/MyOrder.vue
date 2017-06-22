<template>
    <div>
        <div v-if='myOrder.length != 0'>
            <order-list :order-list="myOrder"></order-list>
        </div>
        <div v-else class="alert alert-info" role="alert"> 沒有訂單</div>

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
                orderList: [],
                fetched: false
            }
        },
        computed: {
            ...mapGetters(['user']),
            myOrder(){
                if(!this.fetched){
                    const url = "/MyActiveOrder/" + this.user._id;
                    axios.get(url).then(
                        (resp) => {
                            this.fetched = true
                            for (let v of resp.data) {
                                this.orderList.push(v)
                            }
                        }
                    ).catch((err) => {
                        alert(err)
                    })
                }
                return this.orderList
            }

        },
        methods:{
        },
        components: {
            OrderList
        }
    }
</script>
