<template>
    <div>
        <table class="table table-striped table-hover">
            <thead>
            <tr>
                <th></th>
                <th>訂單編號</th>
                <th>客戶編號</th>
                <th>預定出貨日</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(order, index) in myList">
                <td>
                    <button class="btn btn-info" @click="displayOrder(index)">顯示細節</button>
                    <button class="btn btn-info" @click="copyOrder(index)">複製訂單</button>
                    <button class="btn btn-info" @click="closeOrder(index)">結案</button>
                </td>
                <td>{{ order._id}}</td>
                <td>{{ order.customerId}}</td>
                <td>{{ displayDate(order.expectedDeliverDate) }}</td>
            </tr>
            </tbody>
        </table>
        <hr>
        <div v-if="displayDetail">
            <order-detail></order-detail>
        </div>
    </div>
</template>
<style scoped>
    body{
    }

</style>
<script>
    import {mapActions} from 'vuex'
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
                ...mapActions(['displayOrder']),
            displayDate(millis){
                const mm = moment(millis)
                const dateStr = mm.format('YYYY-MM-DD')
                const afterStr = mm.fromNow()
                return dateStr + " (" + afterStr + ")";
            },
            displayOrder(idx){
                this.$store.dispatch('displayOrder', this.myList[idx])
                //this.order = this.myList[idx]
                this.displayDetail = true;
            },
            copyOrder(idx){
                alert("複製訂單")
            },
            closeOrder(idx){
                alert("結束訂單")
            }
        },
        components: {
            orderDetail
        }
    }
</script>
