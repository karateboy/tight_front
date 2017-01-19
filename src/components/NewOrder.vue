<template>
    <div>
        <div class="ibox-content">
            <div class="form-horizontal">
                <div class="form-group has-feedback"><label class="col-lg-1 control-label">訂單號碼:</label>
                    <div class="col-lg-4"><input type="text" placeholder="訂單號碼" autofocus
                                                 class="form-control"
                                                 v-model="order._id">
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
                        <datepicker v-model="order.expectedDeliverDateObj" language="zh"
                                    format="yyyy-MM-dd"></datepicker>
                    </div>
                </div>
                <div class="form-group"><label class="col-lg-1 control-label">訂單總數(雙):</label>
                    <div class="col-lg-4"><input type="number" class="form-control" v-model="quantity" readonly>
                    </div>
                </div>
                <div class="modal inmodal" id="detailModal" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content animated fadeIn">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"><span
                                        aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                <h4 class="modal-title">新增細項</h4>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label">顏色:</label>
                                        <div class="col-lg-2"><input type="text" class="form-control"
                                                                     v-model="detail.color"></div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label">尺寸:</label>
                                        <div class="col-lg-2"><input type="text" class="form-control"
                                                                     v-model="detail.size"></div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label">數量(打):</label>
                                        <div class="col-lg-2"><input type="number" class="form-control"
                                                                     v-model.number.lazy="detail.dozenNumber"></div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-white" data-dismiss="modal">取消</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addDetail">
                                    確認
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
                        <table class="table table-striped table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>顏色</th>
                                <th>尺寸</th>
                                <th>數量 (雙/打)</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(detail, idx) in order.details">
                                <td>{{detail.color}}</td>
                                <td>{{detail.size}}</td>
                                <td>{{detail.quantity}} / {{detail.quantity/12}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="delDetail(idx)"><i class="fa fa-trash"
                                                                                              aria-hidden="true"></i>刪除
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#detailModal">新增細項
                    </button>
                </div>

                <div class="form-group">
                    <label class="col-lg-1 control-label">注意事項:</label>
                    <div class="col-lg-4">
                        <table class="table table-striped table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>部門</th>
                                <th>注意事項</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(notice, idx) in order.notices">
                                <td>{{displayDepartment(notice.department)}}</td>
                                <td>{{notice.msg}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="delNotice(idx)">
                                        <i class="fa fa-trash" aria-hidden="true"></i>刪除
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#noticeModal">新增
                    </button>
                </div>

                <div class="form-group">
                    <div class="col-lg-offset-1">
                        <button class="btn btn-primary" :class="{disabled: !readyForSubmit}"
                                @click.prevent="newOrder" :disabled="!readyForSubmit">新增
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<style scoped>
</style>
<script>
    import {mapGetters} from 'vuex'
    import axios from 'axios'
    import baseUrl from '../baseUrl'
    import Datepicker from 'vuejs-datepicker'

    //$("finalDeliverDate")

    export default{
        data(){
            return {
                order: {
                    _id: "",
                    salesId: "",
                    name: "",
                    expectedDeliverDateObj: new Date(),
                    expectedDeliverDate: 0,
                    factoryId: "",
                    customerId: "",
                    brand: "",
                    date: 0,
                    details: [],
                    notices: [],
                    active: true
                },
                detail: {
                    color: "",
                    size: "",
                    dozenNumber: 1,
                    quantity: 12,
                    workCardIDs: [],
                    finishedWorkCards: [],
                    complete: false
                },
                departmentList: [],
                departmentFetched: false,
                notice: {
                    department: "",
                    msg: ""
                },
                isOrderIdOkay: true
            }
        },
        computed: {
            ...mapGetters(['user']),
            salesName(){
                this.order.salesId = this.user._id;
                return this.user.name;
            },
            quantity(){
                var sum = 0;
                for (var detail of this.order.details) {
                    sum += detail.quantity
                }
                return sum;
            },
            departments(){
                if (!this.departmentFetched) {
                    axios.get("/Department").then((resp) => {
                        const ret = resp.data
                        this.departmentList.splice(0, this.departmentList.length)
                        for(let dep of ret){
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
            }
        },
        watch: {
            "order._id": function (newId) {
                if (newId.trim() != "") {
                    const url = baseUrl() + "/checkOrderId/" + newId
                    axios.get(url, {withCredentials: true}).then(
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
                this.order.salesId = this.user._id;
                this.order.expectedDeliverDate = this.order.expectedDeliverDateObj.getTime()
                this.order.date = new Date().getTime()
            },
            newOrder(){
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
            addDetail(){
                this.detail.quantity = this.detail.dozenNumber * 12;
                var copy = Object.assign({}, this.detail);
                this.order.details.push(copy);
            },
            delDetail(idx){
                this.order.details.splice(idx, 1)
            },
            addNotice(){
                let copy =  Object.assign({}, this.notice)
                this.order.notices.push(copy)
            },
            delNotice(idx){
                this.order.notices.splice(idx, 1)
            },
            displayDepartment(id){
                for(let dep of this.departmentList){
                    if(dep.id == id)
                        return dep.name
                }

                return ""
            }

        },
        components: {
            Datepicker
        }
    };
</script>
