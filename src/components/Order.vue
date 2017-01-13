<template>
    <div>
        <new-order></new-order>
    </div>
</template>
<style scoped>
</style>
<script>
import newOrder from "./NewOrder.vue"
    export default{
        data(){
            return{
                msg:'訂單'
            }
        },
        components:{
            newOrder
        }
    }
</script>
