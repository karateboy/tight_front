<template>
    <div>
        查詢訂單
        <hr>
        <order-list :order-list="[]"></order-list>
    </div>
</template>
<style>

</style>
<script>
    import OrderList from "./OrderList.vue"

    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            OrderList
        }
    }
</script>
