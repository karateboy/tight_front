<template>
    <div>
        <div class="form-horizontal">
            <div class="form-group"><label class="col-lg-1 control-label">日期從:</label>
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

    export default{
        data(){
            return{
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
                        const end = moment("0", "hh").add(1, 'day').toDate()
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
            query(){
                axios.post('/QueryWorkCard', this.queryParam).then((resp) => {
                }).catch((err) => {
                    alert(err)
                })
            }
        },
        components:{
            Datepicker
        }
    }
</script>