<template>
    <div>
        <div class="ibox-content">
            <div class="form-horizontal">
                <div class="form-group has-feedback"><label class="col-lg-1 control-label">訂單號碼:</label>
                    <div class="col-lg-4"><input type="text" placeholder="訂單號碼" autofocus
                                                 class="form-control"
                                                 v-model="order._id" :readonly='!isNewOrder'>
                        <span v-if="isOrderIdOkay" class="glyphicon glyphicon-ok form-control-feedback info"></span>
                        <span v-else class="glyphicon glyphicon-remove form-control-feedback"></span>
                        <span v-if="!isOrderIdOkay" class="help-block">無效或重複的訂單號碼</span>
                    </div>
                </div>
                <div class="form-group"><label class="col-lg-1 control-label">品牌:</label>
                    <div class="col-lg-4"><input type="text" class="form-control" v-model="order.brand"></div>
                </div>
                <div class="form-group"><label class="col-lg-1 control-label">品名:</label>
                    <div class="col-lg-4"><input type="text" class="form-control" v-model="order.name"></div>
                </div>
                <div class="form-group"><label class="col-lg-1 control-label">工廠代號:</label>
                    <div class="col-lg-4"><input type="text" class="form-control" v-model="order.factoryId"></div>
                </div>
                <div class="form-group"><label class="col-lg-1 control-label">客戶編號:</label>
                    <div class="col-lg-4"><input type="text" class="form-control" v-model="order.customerId"></div>
                </div>
                <div class="form-group"><label class="col-lg-1 control-label">預定出貨日:</label>
                    <div class='col-lg-4'>
                        <datepicker v-model="expectedDeliverDate" language="zh"
                                    format="yyyy-MM-dd"></datepicker>
                    </div>
                </div>
                <div class="form-group"><label class="col-lg-1 control-label">訂單總數(打):</label>
                    <div class="col-lg-4"><input type="number" class="form-control" v-model="quantity" readonly>
                    </div>
                </div>
                <order-detail-item id="detailModal" :opType='detailOpType' :detailIndex='detailIndex'
                                   :detail='getDetailItem()'
                                   @addOrderDetail='addDetailItem'
                                   @updateOrderDetail='updateDetailItem'
                ></order-detail-item>
                <div class="modal inmodal" id="noticeModal" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content animated fadeIn">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"><span
                                        aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                <h4 class="modal-title">新增注意事項</h4>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <label class="col-lg-3 control-label">部門:</label>
                                        <div class="col-lg-9">
                                            <div class="btn-group" data-toggle="buttons">
                                                <label class="btn btn-outline btn-primary dim"
                                                       v-for="dep in departments"
                                                       @click="notice.department=dep.id">
                                                    <input type="radio">{{ dep.name }} </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-3 control-label">注意事項:</label>
                                        <div class="col-lg-9"><input type="text" class="form-control"
                                                                     v-model="notice.msg"></div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-white" data-dismiss="modal">取消</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addNotice">
                                    確認
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-lg-1 control-label">訂單細項:</label>
                    <div class="col-lg-4">
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th>顏色</th>
                                <th>尺寸</th>
                                <th>數量 (打)</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(detail, idx) in order.details">
                                <td>{{detail.color}}</td>
                                <td>{{detail.size}}</td>
                                <td><input type='text' :value="detailQuantity(idx)"
                                           @input="detail.quantity = getDozenQuantity($event.target.value)"></td>
                                <td>
                                    <button class="btn btn-danger" @click="delDetail(idx)" v-if='isNewOrder'>
                                        <i class="fa fa-trash" aria-hidden="true"></i>&nbsp;刪除
                                    </button>
                                    <button class="btn btn-warning" @click="editDetail(idx)" data-toggle="modal" data-target="#detailModal">
                                        <i class="fa fa-pencil" aria-hidden="true"></i>&nbsp;更新
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#detailModal" @click="detailOpType='add'">
                        <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;新增
                    </button>
                </div>

                <div class="form-group">
                    <label class="col-lg-1 control-label">注意事項:</label>
                    <div class="col-lg-4">
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th>部門</th>
                                <th>注意事項</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(notice, idx) in order.notices">
                                <td>{{displayDepartment(notice.department)}}</td>
                                <td><input type='text' v-model='notice.msg'></td>
                                <td>
                                    <button class="btn btn-danger" @click="delNotice(idx)">
                                        <i class="fa fa-trash" aria-hidden="true"></i>&nbsp;刪除
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#noticeModal">
                        <i class="fa fa-plus" aria-hidden="true"></i>&nbsp;新增
                    </button>
                </div>

                <div class="panel panel-success ">
                    <div class="panel-heading">採購包裝材料</div>
                    <div class="panel-body">
                        <div class="form-horizontal">
                            <div class='form-group'>
                                <label class="col-lg-1 control-label">包裝:</label>
                                <div class="col-lg-4">
                                    <input type='checkbox' v-model='order.packageInfo.packageOption[0]'>環帶
                                    <input type='checkbox' v-model='order.packageInfo.packageOption[1]'>紙卡
                                    <input type='checkbox' v-model='order.packageInfo.packageOption[2]'>紙盒
                                    <input type='checkbox' v-model='order.packageInfo.packageOption[3]'>掛卡
                                    <input type='checkbox' v-model='order.packageInfo.packageOption[4]'>掛盒
                                </div>
                            </div>
                            <div class='form-group'>
                                <label class="col-lg-1 control-label">包裝備註:</label>
                                <div class="col-lg-4">
                                    <textarea class='form-control' v-model="order.packageInfo.packageNote"></textarea>
                                </div>
                            </div>
                            <div class='form-group'>
                                <label class="col-lg-1 control-label">貼標:</label>
                                <div class="col-lg-4">
                                    <input type='checkbox' v-model='order.packageInfo.labelOption[0]'>成份標+Made in Taiwan
                                    <input type='checkbox' v-model='order.packageInfo.labelOption[1]'>價標
                                    <input type='checkbox' v-model='order.packageInfo.labelOption[2]'>條碼標
                                    <input type='checkbox' v-model='order.packageInfo.labelOption[3]'>型號標
                                    <input type='checkbox' v-model='order.packageInfo.labelOption[4]'>Size標
                                </div>
                            </div>
                            <div class='form-group'>
                                <label class="col-lg-1 control-label"></label>
                                <div class="col-lg-4">
                                    <input type='checkbox' v-model='order.packageInfo.cardOption[0]'>撐卡
                                    <input type='text' v-model='order.packageInfo.cardNote[0]'>
                                </div>
                            </div>
                            <div class='form-group'>
                                <label class="col-lg-1 control-label"></label>
                                <div class="col-lg-4">
                                    <input type='checkbox' v-model='order.packageInfo.cardOption[1]'>襯卡
                                    <input type='text' v-model='order.packageInfo.cardNote[1]'>
                                </div>
                            </div>
                            <div class='form-group'>
                                <label class="col-lg-1 control-label"></label>
                                <div class="col-lg-4">
                                    <input type='checkbox' v-model='order.packageInfo.cardOption[2]'>掛勾
                                    <input type='text' v-model='order.packageInfo.cardNote[2]'>
                                </div>
                            </div>
                            <div class='form-group'>
                                <label class="col-lg-1 control-label"></label>
                                <div class="col-lg-4">
                                    <input type='checkbox' v-model='order.packageInfo.cardOption[3]'>洗標
                                    <input type='text' v-model='order.packageInfo.cardNote[3]'>
                                </div>
                            </div>
                            <div class='form-group'>
                                <label class="col-lg-1 control-label">塑膠袋:</label>
                                <div class="col-lg-6">
                                    <input type='checkbox' v-model='order.packageInfo.bagOption[0]'>單入OPP
                                    <input type='checkbox' v-model='order.packageInfo.bagOption[1]'>單入PVC
                                    <input type='text' placeholder="PCV備註" v-model='order.packageInfo.pvcNote'>
                                    <input type='checkbox' v-model='order.packageInfo.bagOption[2]'>自黏
                                    <input type='checkbox' v-model='order.packageInfo.bagOption[3]'>高週波
                                    <input type='checkbox' v-model='order.packageInfo.bagOption[4]'>彩印
                                    <input type='checkbox' v-model='order.packageInfo.bagOption[5]'>掛孔
                                </div>
                            </div>
                            <div class='form-group'>
                                <label class="col-lg-1 control-label"></label>
                                <div class="col-lg-4">
                                    <input type='number' v-model='order.packageInfo.numInBag'>雙入大袋
                                    <input type='text' v-model='order.packageInfo.bagNote'>
                                </div>
                            </div>
                            <div class='form-group'>
                                <label class="col-lg-1 control-label">外銷箱:</label>
                                <div class="col-lg-6">
                                    <input type='checkbox' v-model='order.packageInfo.exportBoxOption[0]'>內盒
                                    <input type='text' v-model='order.packageInfo.exportBoxNote[0]'>
                                </div>
                            </div>
                            <div class='form-group'>
                                <label class="col-lg-1 control-label"></label>
                                <div class="col-lg-6">
                                    <input type='checkbox' v-model='order.packageInfo.exportBoxOption[1]'>外箱
                                    <input type='text' v-model='order.packageInfo.exportBoxNote[1]'>
                                </div>
                            </div>
                            <div class='form-group'>
                                <label class="col-lg-1 control-label">嘜頭:</label>
                                <div class="col-lg-6">
                                    <textarea rows="5" cols="30" v-model='order.packageInfo.ShippingMark'></textarea>
                                </div>
                            </div>
                            <div class='form-group'>
                                <label class="col-lg-1 control-label">備註欄:(生管評估後註記)</label>
                                <div class="col-lg-6">
                                    <textarea rows="5" cols="30" v-model='order.packageInfo.extraNote'></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div v-if='isNewOrder' class="col-lg-offset-1">
                        <button class="btn btn-primary" :class="{disabled: !readyForSubmit}"
                                @click.prevent="upsertOrder" :disabled="!readyForSubmit">新增
                        </button>
                    </div>
                    <div v-else class="col-lg-offset-1">
                        <button class="btn btn-primary" :class="{disabled: !readyForSubmit}"
                                @click.prevent="upsertOrder" :disabled="!readyForSubmit">更新
                        </button>
                    </div>
                </div>


            </div>
        </div>
    </div>

</template>
<style scoped>
    body{
        background-color:#0000ff;
    }








</style>
<script>
    import {mapGetters} from 'vuex'
    import axios from 'axios'
    import moment from 'moment'
    import Datepicker from 'vuejs-datepicker'
    import * as dozenExp from '../dozenExp'
    import OrderDetailItem from './OrderDetailItem.vue'

    export default{
        data(){
            return {
                detail: {
                    color: "",
                    size: "",
                    dozenNumber: 1,
                    quantity: 12,
                    complete: false
                },
                departmentList: [],
                departmentFetched: false,
                notice: {
                    department: "",
                    msg: ""
                },
                isOrderIdOkay: true,
                detailOpType: "add",
                detailIndex: 0
            }
        },
        computed: {
            ...mapGetters(['user', 'order', 'isNewOrder']),
            salesName(){
                return "";
            },
            quantity(){
                var sum = 0;
                for (var detail of this.order.details) {
                    sum += detail.quantity
                }
                return dozenExp.toDozenStr(sum)
            },
            departments(){
                if (!this.departmentFetched) {
                    axios.get("/Department").then((resp) => {
                        const ret = resp.data
                        this.departmentList.splice(0, this.departmentList.length)
                        for (let dep of ret) {
                            this.departmentList.push(dep)
                        }
                        this.departmentFetched = true
                    })
                }

                return this.departmentList
            },
            readyForSubmit(){
                if (this.order._id === ""
                        || this.order.name === ""
                        || this.order.expectedDeliverDate === ""
                        || this.order.factoryId === ""
                        || this.order.customerId === ""
                        || this.order.brand === ""
                        || this.order.details.length == 0)
                    return false;
                else
                    return true;
            },
            expectedDeliverDate: {
                get: function () {
                    if (this.order.expectedDeliverDate)
                        return new Date(this.order.expectedDeliverDate)
                    else {
                        const deliver = moment("0", "hh").add(1, 'month').toDate()
                        this.order.expectedDeliverDate = deliver.getTime()
                        return deliver
                    }
                },
                // setter
                set: function (newValue) {
                    this.order.expectedDeliverDate = newValue.getTime()
                }
            }
        },
        watch: {
            "order._id": function (newId) {
                if (!this.isNewOrder)
                    return

                if (newId.trim() != "") {
                    const url = "/checkOrderId/" + newId
                    axios.get(url).then(
                            (resp) => {
                                const data = resp.data
                                this.isOrderIdOkay = data.ok
                            }
                    )
                } else
                    this.isOrderIdOkay = false
            }
        },
        methods: {
            prepareOrder(){
                if (!this.order.salesId)
                    this.order.salesId = this.user._id;

                if (this.order.packageInfo.numInBag == "")
                    this.order.packageInfo.numInBag = null
                else{
                    this.order.packageInfo.numInBag = parseInt(this.order.packageInfo.numInBag)
                }
            },
            upsertOrder(){
                this.prepareOrder();
                axios.post("/Order", this.order).then(
                        (resp) => {
                            const data = resp.data
                            if (data.ok) {
                                alert("成功")
                                this.$router.push({name: 'MyOrder'})
                            }
                            else
                                alert("失敗:" + data.msg)
                        }
                ).catch((err) => {
                    alert(err);
                })
            },
            getDetailItem(){
                if (this.detailOpType === 'add')
                    return this.detail
                else
                    return this.order.details[this.detailIndex]
            },
            addDetailItem(detail){
                var copy = Object.assign({}, detail);
                this.order.details.push(copy);
            },
            updateDetailItem(evt){
              console.log(evt)
            },
            addDetail(){
                this.detail.quantity = this.detail.dozenNumber * 12;
                var copy = Object.assign({}, this.detail);
                this.order.details.push(copy);
            },
            delDetail(idx){
                this.order.details.splice(idx, 1)
            },
            editDetail(idx){
              this.detailOpType = 'edit'
                this.detailIndex = idx
            },
            detailQuantity(idx){
                return dozenExp.toDozenStr(this.order.details[idx].quantity)
            },
            getDozenQuantity(newValue){
                return dozenExp.fromDozenStr(newValue)
            },
            addNotice()
            {
                let copy = Object.assign({}, this.notice)
                this.order.notices.push(copy)
            }
            ,
            delNotice(idx)
            {
                this.order.notices.splice(idx, 1)
            }
            ,
            displayDepartment(id)
            {
                for (let dep of this.departmentList) {
                    if (dep.id == id)
                        return dep.name
                }

                return ""
            }

        },
        components: {
            Datepicker,
            OrderDetailItem
        }
    }
</script>
