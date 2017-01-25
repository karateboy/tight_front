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
            tidyCard: {
                type: Object,
                required: true
            }
        },
        data(){
            return {
                myCard: {
                    good: toFloatStr(this.tidyCard.good),
                    sub: toFloatStr(this.tidyCard.sub),
                    stain: toFloatStr(this.tidyCard.stain),
                    broken: toFloatStr(this.tidyCard.broken),
                    notEven: toFloatStr(this.tidyCard.notEven),
                    operator: this.tidyCard.operator
                }
            }
        },
        methods: {
            prepareTidyCard(){
                this.tidyCard.good = fromFloat(this.myCard.good)
                this.tidyCard.sub = fromFloat(this.myCard.sub)
                this.tidyCard.stain = fromFloat(this.myCard.stain)
                this.tidyCard.broken = fromFloat(this.myCard.broken)
                this.tidyCard.notEven = fromFloat(this.myCard.notEven)
                this.tidyCard.operator = this.myCard.operator
            },
            update(){
                this.prepareTidyCard()
                axios.post("/tidyCard", this.tidyCard).then((resp) => {
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
