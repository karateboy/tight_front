<template>
    <div>
        <table class="table table-striped table-hover">
            <thead>
            <tr>
                <th></th>
                <th>訂單編號</th>
                <th>客戶編號</th>
                <th>預定出貨日</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(order, index) in myList">
                <td>{{ index+1 }}</td>
                <td>{{ order._id}}</td>
                <td>{{ order.customerId}}</td>
                <td>{{ displayDate(order.expectedDeliverDate) }}</td>
                <td>
                    <button class="btn btn-info" @click="displayOrder(index)">顯示細節</button>
                    <button class="btn btn-info" @click="copyOrder(index)">複製訂單</button>
                </td>
            </tr>
            </tbody>
        </table>
        <hr>
        <div v-if="displayDetail">
            <order-detail :my-order="order"></order-detail>
        </div>
    </div>
</template>
<style scoped>
    body{
    }

</style>
<script>
    import orderDetail from './OrderDetail.vue'
    import moment from 'moment'
    export default{
        props: {
            orderList: {
                type: Array,
                required: true
            }
        },
        data(){
            return {
                displayDetail: false,
                order: {}
            }
        },
        computed:{
            myList(){
                return this.orderList;
            }
        },
        methods: {
            displayDate(millis){
                const mm = moment(millis).locale("zh_tw")
                const dateStr = mm.format('YYYY-MM-DD')
                const afterStr = mm.fromNow()
                return dateStr + " (" + afterStr + ")";
            },
            displayOrder(idx){
                this.order = this.myList[idx]
                this.displayDetail = true;
            },
            copyOrder(idx){

            }
        },
        components: {
            orderDetail
        }
    }
</script>
