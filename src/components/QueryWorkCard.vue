<template>
    <div>
        <br>
        <div class="form-horizontal">
            <div class="form-group"><label class="col-lg-1 control-label">工作卡編號:</label>
                <div class="col-lg-4"><input type="text" placeholder="工作卡編號"
                                             class="form-control"
                                             v-model="queryParam._id">
                </div>
            </div>
            <div class="form-group"><label class="col-lg-1 control-label">訂單編號:</label>
                <div class="col-lg-4"><input type="text" placeholder="訂單編號"
                                             class="form-control"
                                             v-model="queryParam.orderId">
                </div>
            </div>
            <div class="form-group"><label class="col-lg-1 control-label">排定日期從:</label>
                <div class="col-lg-5">
                    <div class="input-daterange input-group">
                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                        <datepicker v-model="start" language="zh"
                                    format="yyyy-MM-dd"></datepicker>
                    </div>
                </div>
            </div>
            <div class="form-group"><label class="col-lg-1 control-label">至(不含):</label>
                <div class="col-lg-5">
                    <div class="input-daterange input-group">
                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                        <datepicker v-model="end" language="zh"
                                    format="yyyy-MM-dd"></datepicker>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-lg-offset-1">
                    <button class='btn btn-primary' @click='query'>查詢</button>
                </div>
            </div>
        </div>
        <div v-if='display'>
            <div v-if='cardList.length != 0'>
                <work-card-list :workCardList='cardList'></work-card-list>
            </div>
            <div v-else class="alert alert-info">沒有符合的工作卡</div>
        </div>
    </div>
</template>
<style>
    body{
        background-color:#ff0000;
    }
</style>
<script>
    import axios from 'axios'
    import moment from 'moment'
    import Datepicker from 'vuejs-datepicker'
    import WorkCardList from "./WorkCardList.vue"
    import cardHelper from '../cardHelper'

    export default{
        data(){
            return{
                display: false,
                cardList: [],
                queryParam: {}
            }
        },
        computed: {
            start: {
                get: function () {
                    if (this.queryParam.start)
                        return moment(this.queryParam.start).toDate()
                    else{
                        const start = moment("0", "hh").toDate()
                        this.queryParam.start = start.getTime()
                        return start;
                    }

                },
                // setter
                set: function (newValue) {
                    this.queryParam.start = newValue.getTime()
                }
            },
            end: {
                get: function () {
                    if (this.queryParam.end)
                        return moment(this.queryParam.end).toDate()
                    else{
                        const end = moment("0", "hh").add(1, 'month').toDate()
                        this.queryParam.end = end.getTime()
                        return end
                    }
                },
                // setter
                set: function (newValue) {
                    this.queryParam.end = newValue.getTime()
                }
            }
        },
        methods: {
            prepareParam(){
                if(this.queryParam._id == "")
                    this.queryParam._id = null

                if(this.queryParam.color == '')
                    this.queryParam.color = null
            },
            query(){
                this.prepareParam()
                axios.post('/QueryWorkCard', this.queryParam).then((resp) => {
                    const ret = resp.data
                    this.cardList.splice(0, this.cardList.length)
                    for(let card of ret){
                        cardHelper.populateWorkCard(card)
                        this.cardList.push(card)
                    }
                    this.display = true
                }).catch((err) => {
                    alert(err)
                })
            }
        },
        components:{
            Datepicker,
            WorkCardList
        }
    }
</script>
