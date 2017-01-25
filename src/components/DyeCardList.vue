<template>
    <div>
        <table class="table  table-bordered">
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
            </tr>
            </thead>
            <tbody>
            <tr v-for="(card, idx) in cardList" :class='{success: selectedIdx==idx}'>
                <td>
                    <button class="btn btn-info" @click="displayDyeCardDetail(card, idx)">細節</button>
                    <button class="btn btn-info" @click="dyeCardPDF(card)">列印</button>
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
            </tr>
            </tbody>
        </table>
        <hr/>
        <div v-if="displayDetail">
            <dye-card-detail :dyeCard="targetDyeCard" :edit='false'></dye-card-detail>
        </div>
    </div>
</template>
<style>
</style>
<script>
    import moment from 'moment'
    import DyeCardDetail from './DyeCardDetail.vue'
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
                displayDetail: false,
                selectedIdx:-1,
                targetDyeCard: {}
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
                this.displayDetail = true
                this.targetDyeCard = dyeCard
            },
            dyeCardPDF(dyeCard){
                let url = baseUrl() + "/DyeCardPDF/" + dyeCard._id
                window.open(url)
            }
        },
        components: {
            DyeCardDetail
        }
    }
</script>
