<template>
    <div>
        <br>
        <table class="table table-bordered table-condensed">
            <thead>
            <tr class='info'>
                <th></th>
                <th>流動卡編號</th>
                <th>訂單編號</th>
                <th class='text-center'>數量<br>(優/預定)</th>
                <th class='text-center'>顏色</th>
                <th class='text-center'>尺寸</th>
                <th class='text-center'>漂染卡號</th>
                <th class='text-center'>排程時間</th>
                <th class='text-center'>狀態</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for='(workCard, idx) in workCardList' :class='{success:idx==detail}'>
                <td><button class='btn btn-info' @click="showDetail(idx)"><i class="fa fa-eye"></i>&nbsp;內容</button></td>
                <td class='text-right'>{{workCard._id}}</td>
                <td class='text-right'>{{workCard.orderId}}</td>
                <td class='text-right'>{{workCard.good + "/" +workCard.quantity}}</td>
                <td class='text-right'>{{displayColor(workCard)}}</td>
                <td class='text-right'>{{displaySize(workCard)}}</td>
                <td class='text-right'>{{workCard.dyeCardID}}</td>
                <td class='text-right'>{{displayTime(workCard.startTime)}}</td>
                <td >
                    <i class="fa fa-hourglass-half" style="color:red" aria-hidden="true" v-if='workCard.active'>處理中</i>
                    <i class="fa fa-check" style="color:green" aria-hidden="true" v-else>結束</i>
                </td>
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
            },
            displayColor(workCard){
                if(workCard.order.details != null){
                    return workCard.order.details[workCard.detailIndex].color
                }else
                    return "查詢中"
            },
            displaySize(workCard){
                if(workCard.order && workCard.order.details){
                    return workCard.order.details[workCard.detailIndex].size
                }else
                    return "查詢中"
            },

        },
        components: {
            WorkCardDetail
        }
    }
</script>
