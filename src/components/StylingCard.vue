<template>
    <div>
        <div class="alert alert-info" role="alert">輸入範例: 12.03, 0.05</div>
        <div class="form-horizontal">
            <div class="form-group"><label class="col-lg-1 control-label">優:</label>
                <div class="col-lg-2"><input type="text" class="form-control" v-model="myCard.good"></div>
            </div>
            <div class="form-group"><label class="col-lg-1 control-label">副:</label>
                <div class="col-lg-2"><input type="text" class="form-control" v-model="myCard.sub"></div>
            </div>
            <div class="form-group"><label class="col-lg-1 control-label">汙:</label>
                <div class="col-lg-2"><input type="text" class="form-control" v-model="myCard.stain"></div>
            </div>
            <div class="form-group"><label class="col-lg-1 control-label">破:</label>
                <div class="col-lg-2"><input type="text" class="form-control" v-model="myCard.broken"></div>
            </div>
            <div class="form-group"><label class="col-lg-1 control-label">不均:</label>
                <div class="col-lg-2"><input type="text" class="form-control" v-model="myCard.notEven"></div>
            </div>
            <div class="form-group"><label class="col-lg-1 control-label">工號:</label>
                <div class="col-lg-2"><input type="text" class="form-control" v-model="myCard.operator"></div>
            </div>
            <div class="form-group">
                <div class="col-lg-offset-1 col-lg-1">
                    <button class='btn btn-primary' @click='update'>更新</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
</style>
<script>
    import axios from 'axios'
    function toFloatStr(v) {
        if (!v)
            return ""
        else {
            let ret = parseInt(v / 12)
            let frac = v % 12
            if (frac != 0) {
                if (v % 12 < 10)
                    ret += '.0' + frac
                else
                    ret += frac
            }


            return ret
        }
    }

    function fromFloat(v) {
        if (v == null || v == '')
            return null

        let vStr = "" + v
        let num = vStr.split('.', 2)

        let ret = parseInt(num[0], 10) * 12
        if (num.length == 2)
            ret += parseInt(num[1]) % 12

        return ret
    }

    export default{
        props: {
            stylingCard: {
                type: Object,
                required: true
            },
            workCardID: {
                type: String,
                required: true
            }
        },
        data(){
            return {
                myCard: {
                    good: toFloatStr(this.stylingCard.good),
                    sub: toFloatStr(this.stylingCard.sub),
                    stain: toFloatStr(this.stylingCard.stain),
                    broken: toFloatStr(this.stylingCard.broken),
                    notEven: toFloatStr(this.stylingCard.notEven),
                    operator: this.stylingCard.operator
                }
            }
        },
        methods: {
            prepareStylingCard(){
                this.stylingCard.good = fromFloat(this.myCard.good)
                this.stylingCard.sub = fromFloat(this.myCard.sub)
                this.stylingCard.stain = fromFloat(this.myCard.stain)
                this.stylingCard.broken = fromFloat(this.myCard.broken)
                this.stylingCard.notEven = fromFloat(this.myCard.notEven)
                this.stylingCard.operator = this.myCard.operator
            },
            update(){
                this.prepareStylingCard()
                axios.post("/StylingCard/" + this.workCardID, this.stylingCard).then((resp) => {
                    const ret = resp.data
                    if (ret.ok) {
                        alert("成功")
                        this.$emit('updated')
                    } else
                        alert("失敗:" + ret.msg)
                }).catch((err) => {
                    alert(err)
                })
            }
        },
        components: {}
    }
</script>
