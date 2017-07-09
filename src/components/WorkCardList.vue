<template>
    <div>
        <div v-if="workCardList.length != 0">
            <table class="table table-bordered table-condensed">
                <thead>
                <tr class='info'>
                    <th></th>
                    <th>流動卡編號</th>
                    <th>訂單編號</th>
                    <th class='text-center'>數量<br>優/預定(打)</th>
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
                    <td class='text-right'>{{displayGoodQuantity(workCard)}}</td>
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
            <pagination for="workCardList" :records="total" :per-page="5"
                        count-text="第{from}到第{to}筆/共{count}筆|{count} 筆|1筆"></pagination>
        </div>
        <div v-else class="alert alert-info" role="alert">沒有符合的流動卡</div>
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
    import axios from 'axios'
    import {Pagination, PaginationEvent} from 'vue-pagination-2'
    import cardHelper from '../cardHelper'
    import WorkCardDetail from './WorkCardDetail.vue'
    import * as dozenExpr from '../dozenExp'

    export default{
        props: {
            url: {
                type: String,
                required: true
            },
            param: {
                type: Object
            }
        },
        data(){
            return {
                workCardList:[],
                skip:0,
                limit:5,
                total:0,
                detail:-1,
                workCard:{}
            }
        },
        mounted: function () {
            this.fetchCard(this.skip, this.limit)
            PaginationEvent.$on('vue-pagination::workCardList', this.handlePageChange)
        },
        watch: {
            url: function () {
                this.fetchCard(this.skip, this.limit)
            },
            param: function () {
                this.fetchCard(this.skip, this.limit)
            }
        },

        methods: {
            processResp(resp){
                const ret = resp.data
                this.workCardList.splice(0, this.workCardList.length)
                for(let workCard of ret){
                    cardHelper.populateWorkCard(workCard)
                    this.workCardList.push(workCard)
                }
            },
            fetchCard(skip, limit){
                let request_url = `${this.url}/${skip}/${limit}`

                if (this.param) {
                    axios.post(request_url, this.param).then(this.processResp).catch((err) => {
                        alert(err)
                    })
                } else {
                    axios.get(request_url).then(this.processResp).catch((err) => {
                        alert(err)
                    })
                }
                this.fetchCardCount()
            },
            fetchCardCount(){
                let request_url = `${this.url}/count`
                if (this.param) {
                    axios.post(request_url, this.param).then(resp => {
                        this.total = resp.data
                    }).catch((err) => {
                        alert(err)
                    })
                } else {
                    axios.get(request_url).then(resp => {
                        this.total = resp.data
                    }).catch((err) => {
                        alert(err)
                    })
                }
            },
            handlePageChange(page){
                this.skip = (page - 1) * this.limit
                this.fetchCard(this.skip, this.limit)
            },

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
            displayGoodQuantity(workCard){
                //workCard.good + "/" +workCard.quantity
                return dozenExpr.toDozenStr(workCard.good) + "/" + dozenExpr.toDozenStr(workCard.quantity)
            }
        },
        components: {
            WorkCardDetail,
            Pagination
        }
    }
</script>
