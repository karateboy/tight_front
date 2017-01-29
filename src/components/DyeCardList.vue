<template>
    <div>
        <table class="table  table-bordered table-condensed">
            <thead>
            <tr>
                <th></th>
                <th>漂染卡編號</th>
                <th>訂單編號</th>
                <th>客戶</th>
                <th>出貨日</th>
                <th>工廠代號</th>
                <th>尺寸</th>
                <th>顏色</th>
                <th>數量(打)</th>
                <th>編織批號</th>
                <th>狀態</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(card, idx) in cardList" :class='{success: selectedIdx==idx}'>
                <td>
                    <button class="btn btn-primary" @click="displayDyeCardDetail(card, idx)"><i class="fa fa-eye" aria-hidden="true"></i>&nbsp;內容</button>
                    <button class="btn btn-primary" @click="dyeCardPDF(card)"><i class="fa fa-print" aria-hidden="true"></i>&nbsp;列印</button>
                    <button class="btn btn-primary" @click="displayWorkCards(card, idx)"><i class="fa fa-eye" aria-hidden="true"></i>&nbsp;顯示工作卡</button>
                    <button class="btn btn-primary" @click="workCardLabel(card)"><i class="fa fa-print" aria-hidden="true"></i>&nbsp;列印工作卡</button>
                </td>
                <td>{{card._id}}</td>
                <td>{{displayOrderId(card)}}</td>
                <td>{{displayCustomerId(card)}}</td>
                <td>{{displayDeliverDate(card)}}</td>
                <td>{{displayFactoryId(card)}}</td>
                <td>{{displaySize(card)}}</td>
                <td>{{card.color}}</td>
                <td>{{totalQuantity(card)}}</td>
                <td>-</td>
                <td>
                    <i class="fa fa-hourglass-half" style="color:red" aria-hidden="true" v-if='card.active'>處理中</i>
                    <i class="fa fa-check" style="color:green" aria-hidden="true" v-else>結束</i>
                </td>
            </tr>
            </tbody>
        </table>
        <hr/>
        <div v-if="display=='detail'">
            <dye-card-detail :dyeCard="targetDyeCard" :edit='false'></dye-card-detail>
        </div>
        <div v-else-if="display=='workCards'">
            <work-card-list :workCardList='workCardList'></work-card-list>
        </div>
    </div>
</template>
<style>
</style>
<script>
    import moment from 'moment'
    import axios from 'axios'
    import DyeCardDetail from './DyeCardDetail.vue'
    import WorkCardList from './WorkCardList.vue'
    import baseUrl from '../baseUrl'
    export default{
        props: {
            cardList: {
                type: Array,
                required: true
            }
        },
        data(){
            return {
                display: "",
                selectedIdx:-1,
                targetDyeCard: {},
                workCardList:[]
            }
        },
        methods: {
            mkStr(list, mapper){
                let set = new Set()
                for (let item of list) {
                    set.add(mapper(item))
                }
                let ret = ""
                for (let item of set) {
                    if (ret === "")
                        ret += item
                    else
                        ret += "/" + item
                }
                return ret
            },
            displayOrderId(card){
                return this.mkStr(card.workCards, (card) => card.orderId)
            },
            displayCustomerId(card){
                return this.mkStr(card.workCards, (card) => card.order.customerId)
            },
            displayDeliverDate(card){
                let deliverDate = Number.MAX_SAFE_INTEGER
                for (let workCard of card.workCards) {
                    if (deliverDate > workCard.order.expectedDeliverDate)
                        deliverDate = workCard.order.expectedDeliverDate
                }

                return moment(deliverDate).format('YYYY-MM-DD')
            },
            displayFactoryId(card){
                return this.mkStr(card.workCards, (card) => card.order.factoryId)
            },
            displaySize(card){
                return this.mkStr(card.workCards,
                        (card) => {
                            if (card.order && card.order.details)
                                return card.order.details[card.detailIndex].size
                            else
                                return ""
                        })
            },
            totalQuantity(dyeCard){
                let total = 0
                for (let workCard of dyeCard.workCards) {
                    total += workCard.quantity
                }
                return total/12
            },
            displayDyeCardDetail(dyeCard, idx){
                this.selectedIdx = idx
                this.display = 'detail'
                this.targetDyeCard = dyeCard
            },
            dyeCardPDF(dyeCard){
                let url = baseUrl() + "/DyeCardPDF/" + dyeCard._id
                window.open(url)
            },
            displayWorkCards(dyeCard, idx){
                this.selectedIdx = idx
                axios.post("/GetWorkCards", dyeCard.workIdList).then((resp)=>{
                    const ret = resp.data
                    this.workCardList.splice(0, this.workCardList.length)
                    for(let workCard of ret){
                        this.workCardList.push(workCard)
                    }
                }).catch((err)=>{
                    alert(err)
                })
                this.display = 'workCards'
            },
            workCardLabel(dyeCard){
                let url = baseUrl() + "/WorkCardLabelByDyeCard/" + dyeCard._id
                window.open(url)
            }
        },
        components: {
            DyeCardDetail,
            WorkCardList
        }
    }
</script>
