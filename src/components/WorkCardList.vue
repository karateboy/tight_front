<template>
    <div>
        <br>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th></th>
                <th>編號</th>
                <th>訂單號碼</th>
                <th class='text-center'>數量<br>(優/預定)</th>
                <th class='text-center'>漂染卡號</th>
                <th class='text-center'>排程時間</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for='(workCard, idx) in workCardList' :class='{success:idx==detail}'>
                <td><button class='btn btn-info' @click="showDetail(idx)"><i class="fa fa-eye"></i>&nbsp;內容</button></td>
                <td class='text-right'>{{workCard._id}}</td>
                <td class='text-right'>{{workCard.orderId}}</td>
                <td class='text-right'>{{workCard.good + "/" +workCard.quantity}}</td>
                <td class='text-right'>{{workCard.dyeCardID}}</td>
                <td class='text-right'>{{displayTime(workCard.startTime)}}</td>
            </tr>
            </tbody>
        </table>
        <hr>
        <div v-if='detail>=0'>
            <work-card-detail :workCard='workCard'></work-card-detail>
        </div>
    </div>
</template>
<style>
</style>
<script>
    import moment from 'moment'
    import WorkCardDetail from './WorkCardDetail.vue'
    export default{
        props: {
            workCardList: {
                type: Array,
                required: true
            }
        },
        data(){
            return {
                detail:-1,
                workCard:{}
            }
        },
        methods: {
            displayTime(millis){
                return moment(millis).format('LL')
            },
            showDetail(idx){
                this.workCard = this.workCardList[idx]
                this.detail = idx
            }
        },
        components: {
            WorkCardDetail
        }
    }
</script>
