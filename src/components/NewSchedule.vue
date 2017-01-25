<template>
    <div v-if="myDyeCardSpecList.length != 0">
        <br>
        <div class="form-horizontal">
            <div class="form-group">
                <label class="col-lg-1 control-label">顏色:</label>
                <div class="col-lg-11">
                    <div class="btn-group" data-toggle="buttons">
                        <label class="btn btn-outline btn-primary dim" v-for="(spec, idx) in myDyeCardSpecList"
                               @click="setActiveSpec(spec)">
                            <input type="radio">{{ spec.color }} 交期:{{ displayDate(spec.due)}}</label>
                    </div>
                </div>
            </div>
            <div v-if="activeSpec">
                <div class="text-primary">
                    <h2>條碼不輸入, 則由系統自行產生</h2>
                </div>
                <div class="form-group">
                    <label class="col-lg-1 control-label">漂染條碼:</label>
                    <div class="col-lg-2">
                        <input type="text" class="form-control" v-model="activeSpec.barcode">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-1 control-label">訂單需求:</label>
                    <div class="col-lg-11">
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th>選擇</th>
                                <th>訂單編號</th>
                                <th>預定交貨日</th>
                                <th>尺寸</th>
                                <th>需求數量</th>
                                <th>排定生產數量</th>
                                <th>條碼</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(workSpec, idx) in activeSpec.workCardSpecList">
                                <td><input type="checkbox" v-model="workSpec.selected"></td>
                                <td>{{workSpec.orderId}}</td>
                                <td>{{displayDate(workSpec.due)}}</td>
                                <td>{{workSpec.detail.size}}</td>
                                <td>{{workSpec.need}}</td>
                                <td><input type="number" v-model="workSpec.toProduce"></td>
                                <td><input type="text" v-model="workSpec.barcode"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="form-group" v-if="readyToSchedule">
                    <button class="col-lg-offset-1 btn btn-primary" @click="schedule">排定生產</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="alert alert-info" role="alert">
            <strong>沒有可以排定的工作</strong>
        </div>
    </div>

</template>
<style>

</style>
<script>
    import axios from 'axios'
    import moment from 'moment'

    export default{
        data(){
            return {
                dyeCardSpecList: [],
                fetched: false,
                activeSpec: null
            }
        },
        computed: {
            myDyeCardSpecList(){
                if (!this.fetched) {
                    axios.get("/DyeCardSpec").then(
                            (resp) => {
                                const ret = resp.data
                                const len = this.dyeCardSpecList.length
                                this.dyeCardSpecList.splice(0, len)
                                for (let v of resp.data) {
                                    this.dyeCardSpecList.push(v)
                                }
                            }
                    ).catch((err) => {
                        console.log(err)
                    })
                    this.fetched = true
                    return this.dyeCardSpecList
                } else
                    return this.dyeCardSpecList
            },
            readyToSchedule(){
                return true;
            }
        },
        methods: {
            displayDate(millis){
                const mm = moment(millis).locale("zh_tw")
                const dateStr = mm.format('YYYY-MM-DD')
                const afterStr = mm.fromNow()
                return dateStr + " (" + afterStr + ")";
            },
            setActiveSpec(spec){
                this.activeSpec = spec
                for (let workSpec of this.activeSpec.workCardSpecList) {
                    workSpec.toProduce = workSpec.need
                }
            },
            schedule(){
                const dyeCard = {
                    _id: "",
                    workIdList: [],
                    color: this.activeSpec.color
                }
                if (this.activeSpec.barcode)
                    dyeCard._id = this.activeSpec.barcode

                const workCards = []
                for (let workCardSpec of this.activeSpec.workCardSpecList) {
                    if (workCardSpec.selected) {
                        let workCard = {
                            _id: "",
                            orderId: workCardSpec.orderId,
                            detailIndex: workCardSpec.index,
                            quantity: parseInt(workCardSpec.toProduce)
                        }
                        if (workCardSpec.barcode)
                            workCard._id = workCardSpec.barcode

                        workCards.push(workCard)
                    }
                }
                const url = "/ScheduleDyeWork"
                axios.post(url, {dyeCard, workCards}).then(
                        (resp) => {
                            const ret = resp.data
                            if (ret.ok){
                                alert("成功")
                                this.$router.push({name: 'ActiveDyeCardList'})
                            }
                        }
                ).catch(
                        (err) => {
                            alert(err)
                        }
                )
            }
        },
        components: {}
    }
</script>
