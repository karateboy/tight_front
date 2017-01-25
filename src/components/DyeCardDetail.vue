<template>
    <div class="form-horizontal">
        <table class="table table-bordered">
            <tbody>
            <tr>
                <td>
                    <label class="control-label">染色人員:</label>
                    <input type="text" class="form-control" v-model="dyeCard.operator" :readonly="!edit"/>
                </td>
                <td>染色日期:
                    <datepicker v-model="dyeCardDate" language="zh"
                                format="yyyy-MM-dd"></datepicker>
                </td>
                <td>染鍋:<input type="text" class="form-control" v-model="dyeCard.pot" :readonly="!edit"/></td>
                <td>襪重:<input type="number" class="form-control" v-model="dyeCard.weight" :readonly="!edit"/></td>
            </tr>
            <tr>
                <td rowspan="2">精煉程序(kg)</td>
                <td rowspan="2">精煉劑(環保,特用,LYS,其他):<input type="text" class="form-control"
                                                         v-model="dyeCard.refineProcess.refinePotion"
                                                         :readonly="!edit"/>
                    kg:
                    <input type="number" class="form-control" v-model="dyeCard.refineProcess.refine" :readonly="!edit"/>
                </td>
                <td rowspan="2">乳化劑(kg):<input type="number" class="form-control" v-model="dyeCard.refineProcess.milk"
                                               :readonly="!edit"/></td>
                <td>溫度(C):<input type="number" class="form-control" v-model="dyeCard.refineProcess.refineTime"
                                 :readonly="!edit"/></td>
            </tr>
            <tr>
                <td>時間(分):<input type="number" class="form-control" v-model="dyeCard.refineProcess.refineTemp"
                                 :readonly="!edit"/></td>
            </tr>

            <tr>
                <td rowspan="3">染色藥劑(g)</td>
                <td>Y:<input type="number" class="form-control" v-model="dyeCard.dyePotion.y" :readonly="!edit"/></td>
                <td>螢光劑:<input type="number" class="form-control" v-model="dyeCard.dyePotion.Fluorescent"
                               :readonly="!edit"/></td>
                <td rowspan="3"></td>
            </tr>
            <tr>
                <td>R:<input type="number" class="form-control" v-model="dyeCard.dyePotion.r" :readonly="!edit"/></td>
                <td>增白劑:<input type="number" class="form-control" v-model="dyeCard.dyePotion.Brightener"
                               :readonly="!edit"/></td>
            </tr>
            <tr>
                <td>B:<input type="number" class="form-control" v-model="dyeCard.dyePotion.b" :readonly="!edit"/></td>
                <td></td>
            </tr>
            <tr>
                <td rowspan="4">染色程序(kg)</td>
                <td>均染劑:<input type="number" class="form-control" v-model="dyeCard.dyeProcess.evenDye"
                               :readonly="!edit"/></td>
                <td>冰醋酸:<input type="number" class="form-control" v-model="dyeCard.dyeProcess.iceV" :readonly="!edit"/>
                </td>
                <td>溫度<input type="number" class="form-control" v-model="dyeCard.dyeProcess.dyeTemp" :readonly="!edit"/>
                </td>
            </tr>
            <tr>
                <td>醋銨:<input type="number" class="form-control" v-model="dyeCard.dyeProcess.vNH3" :readonly="!edit"/>
                </td>
                <td></td>
                <td>時間(分鐘):<input type="number" class="form-control" v-model="dyeCard.dyeProcess.dyeTime"
                                  :readonly="!edit"/></td>
            </tr>
            <tr>
                <td>氨水:<input type="number" class="form-control" v-model="dyeCard.dyeProcess.nh3" :readonly="!edit"/>
                </td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>起染pH:<input type="number" class="form-control" v-model="dyeCard.dyeProcess.phStart"
                                :readonly="!edit"/></td>
                <td></td>
                <td>染終pH:<input type="number" class="form-control" v-model="dyeCard.dyeProcess.phEnd"
                                :readonly="!edit"/></td>
            </tr>
            <tr>
                <td rowspan="3">後處理程序(kg)</td>
                <td>固色劑:<input type="number" class="form-control" v-model="dyeCard.postProcess.fixedPotion"
                               :readonly="!edit"/></td>
                <td>陽離子柔軟劑:<input type="number" class="form-control" v-model="dyeCard.postProcess.postiveSoftener"
                                  :readonly="!edit"/></td>
                <td>時間:<input type="number" class="form-control" v-model="dyeCard.postProcess.softenTime"
                              :readonly="!edit"/></td>
            </tr>
            <tr>
                <td>冰醋酸:<input type="number" class="form-control" v-model="dyeCard.postProcess.iceV" :readonly="!edit"/>
                </td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>矽利康:<input type="number" class="form-control" v-model="dyeCard.postProcess.silicon"
                               :readonly="!edit"/></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td rowspan="2">重洗程序(kg)</td>
                <td rowspan="2">精煉劑:</td>
                <td rowspan="2">乳化劑:</td>
                <td>溫度:</td>
            </tr>
            <tr>
                <td>時間:</td>
            </tr>
            <tr>
                <td>烘乾</td>
                <td>溫度:<input type="number" class="form-control" v-model="dyeCard.dryTemp" :readonly="!edit"/></td>
                <td>時間:<input type="number" class="form-control" v-model="dyeCard.dryTime" :readonly="!edit"/></td>
                <td></td>
            </tr>
            </tbody>
        </table>
        <hr>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th>尺寸</th>
                <th>染前長度(cm)</th>
                <th>染後長度(cm)</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="sizeChart in dyeCard.sizeCharts">
                <td>{{sizeChart.size}}</td>
                <td><input type="number" class="form-control" v-model="sizeChart.before" :readonly="!edit"/></td>
                <td><input type="number" class="form-control" v-model="sizeChart.after" :readonly="!edit"/></td>
            </tr>
            </tbody>
        </table>
        <div class="form-group">
            <div v-if='edit' class="col-lg-offset-1">
                <button class="btn btn-primary" @click.prevent="update">更新
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>
    body{
        background-color:#ff0000;
    }


</style>
<script>
    import Datepicker from 'vuejs-datepicker'
    import axios from 'axios'
    export default{
        props: {
            edit: {
                type: Boolean,
                default: true
            },
            dyeCard: {
                type: Object,
                required: true
            }
        },
        data(){
            return {}
        },
        computed: {
            dyeCardDate: {
                get: function () {
                    if (this.dyeCard.date)
                        return new Date(this.dyeCard.date)
                    else
                        return new Date()
                },
                // setter
                set: function (newValue) {
                    this.dyeCard.date = newValue.getTime()
                }
            }
        },
        methods: {
            update(){
                axios.post("/DyeCard", this.dyeCard).then((resp) => {
                    const ret = resp.data
                    if (ret.ok) {
                        alert("成功")
                        this.$emit('updated')
                    } else
                        alert('失敗')
                }).catch((err) => {
                    alert(err)
                })
            }
        },
        components: {
            Datepicker
        }
    }
</script>
