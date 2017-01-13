<template>
    <div>
        <div class="ibox-content">
            <form class="form-horizontal">
                <div class="form-group has-feedback"><label class="col-lg-1 control-label">訂單號碼:</label>
                    <div class="col-lg-4"><input type="text" placeholder="訂單號碼"
                                                 class="form-control"
                                                 v-model="order._id">
                        <span v-if="isOrderIdOkay" class="glyphicon glyphicon-ok form-control-feedback"></span>
                        <span v-else class="glyphicon glyphicon-remove form-control-feedback"></span>
                    </div>
                </div>
                <div class="form-group"><label class="col-lg-1 control-label">負責業務:</label>
                    <div class="col-lg-4"><input type="text" placeholder="負責業務" class="form-control" readonly
                                                 v-model="salesName"></div>
                </div>
                <div class="form-group"><label class="col-lg-1 control-label">訂單日期:</label>
                    <div class="col-lg-4"><input type="date" class="form-control" v-model="order.date" readonly>
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
                <div class="form-group"><label class="col-lg-1 control-label">預定出貨日:</label>
                    <div class="col-lg-4"><input type="date" class="form-control"
                                                 v-model="order.expectedDeliverDate"></div>
                </div>
                <div class="form-group"><label class="col-lg-1 control-label">訂單總數(打):</label>
                    <div class="col-lg-4"><input type="number" class="form-control" v-model="quantity" readonly>
                    </div>
                </div>
                <div class="form-group"><label class="col-lg-1 control-label">實際出貨日:</label>
                    <div class="col-lg-4"><input type="date" class="form-control" v-model="order.finalDeliverDate">
                    </div>
                </div>
                <div class="form-group"><label class="col-lg-1 control-label">客戶編號:</label>
                    <div class="col-lg-4"><input type="text" class="form-control" v-model="order.customerId"></div>
                </div>
                <div class="modal inmodal" id="detailModal" tabindex="-1" role="dialog"  aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content animated fadeIn">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                <h4 class="modal-title">新增細項</h4>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label">顏色:</label>
                                        <div class="col-lg-2"><input type="text" class="form-control" v-model="detail.color"></div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label">尺寸:</label>
                                        <div class="col-lg-2"><input type="text" class="form-control" v-model="detail.size"></div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label">數量(打):</label>
                                        <div class="col-lg-2"><input type="number" class="form-control" v-model.number.lazy="detail.quantity"></div>
                                     </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-white" data-dismiss="modal">取消</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addDetail">確認</button>
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
                                <th>數量</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="detail in order.details">
                                    <td>{{detail.color}}</td>
                                    <td>{{detail.size}}</td>
                                    <td>{{detail.quantity}}</td>
                                    <td><button class="btn btn-warning"><i class="fa fa-pencil" aria-hidden="true"></i>修改</button>
                                    <button class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i>刪除</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#detailModal">新增細項</button>
                </div>
                <div class="form-group">
                    <div class="col-lg-offset-1">
                        <button class="btn btn-primary" type="submit" @click.prevent="newOrder">新增</button>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>
<style scoped>
</style>
<script>
    export default{
        data(){
            return {
                order: {
                    _id: "Test1234567",
                    salesId: "sales@test.com",
                    name: "CAPEZ10大人包腳拷克洞全彈舞襪",
                    expectedDeliverDate: "2017-01-01",
                    finalDeliverDate: "2017-01-01",
                    factoryId: "CZ420B-666CV-KB",
                    customerId: "1916",
                    brand: "CAPEZ10",
                    date: "2017-01-01",
                    details: [],
                    notices: [],
                    active: true
                },
                detail: {
                    color:"咖啡",
                    size:"XL",
                    quantity:1,
                    unit:"dozen"
                }
            }
        },
        computed: {
            isOrderIdOkay(){
              return true;
            },
            salesName(){
                return "Aragorn"
            },
            quantity(){
                var sum = 0;
                for(var detail of this.order.details){
                    sum += detail.quantity
                }
                return sum;
            }
        },
        methods: {
            newOrder(){
                alert("新增訂單");
            },
            addDetail(){
                var copy = Object.assign({}, this.detail);
                this.order.details.push(copy);
            }
        },
        components: {}
    };
</script>
