<template>
    <div>
        <table class="table table-hover">
            <thead>
            <tr>
                <th></th>
                <th>訂單編號</th>
                <th>客戶編號</th>
                <th>預定出貨日</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(order, index) in myList" :class='{success: selectedIndex == index}'>
                <td>
                    <button class="btn btn-info" @click="displayOrder(index)">顯示細節</button>
                    <button class="btn btn-info" @click="prepareCloneOrder(index)">複製訂單</button>
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
                selectedIndex: -1,
                order: {}
            }
        },
        computed: {
            myList(){
                return this.orderList;
            }
        },
        methods: {
            ...mapActions(['showOrder', 'cloneOrder']),
            displayDate(millis){
                const mm = moment(millis)
                const dateStr = mm.format('YYYY-MM-DD')
                const afterStr = mm.fromNow()
                return dateStr + " (" + afterStr + ")";
            },
            displayOrder(idx){
                this.selectedIndex = idx
                this.showOrder(this.myList[idx])
                this.displayDetail = true;
            },
            prepareCloneOrder(idx){
                this.selectedIndex = idx
                this.cloneOrder(this.myList[idx])
                this.$router.push({name: 'NewOrder'})
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
