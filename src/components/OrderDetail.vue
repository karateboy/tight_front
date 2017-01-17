<template>
    <div>
        <form class="form-horizontal">
            <div class="form-group has-feedback"><label class="col-lg-1 control-label">訂單號碼:</label>
                <div class="col-lg-4"><input type="text" placeholder="訂單號碼" autofocus
                                             class="form-control"
                                             v-model="order._id">
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
                    {{ displayDate(order.expectedDeliverDate) }}
                </div>
            </div>
            <div class="form-group"><label class="col-lg-1 control-label">訂單總數(雙):</label>
                <div class="col-lg-4"><input type="number" class="form-control" v-model="quantity" readonly>
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
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(detail, idx) in order.details">
                            <td>{{detail.color}}</td>
                            <td>{{detail.size}}</td>
                            <td>{{detail.quantity}} / {{detail.quantity/12}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </form>
    </div>
</template>
<style scoped>
    body{
        background-color:#0000ff;
    }

</style>
<script>
    import moment from 'moment'
    export default{
        props: {
            myOrder: {
                type: Object,
                required: true
            }
        },
        data(){
            return {
            }
        },
        computed: {
            order(){
                return this.myOrder;
            },
            quantity(){
                var sum = 0;
                for (var detail of this.order.details) {
                    sum += detail.quantity
                }
                return sum;
            }
        },
        methods: {
            displayDate(millis){
                const mm = moment(millis).locale("zh_tw")
                const dateStr = mm.format('YYYY-MM-DD')
                const afterStr = mm.fromNow()
                return dateStr + " (" + afterStr + ")";
            },
            displayOrder(idx){
                this.order = this.myList[idx]
                this.displayDetail = true;
            }
        },

        components: {}
    }
</script>
