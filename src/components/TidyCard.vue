<template>
    <div>
        <div class="alert alert-info" role="alert">流動工作卡總量: {{ quantity }}</div>
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

    export default{
        props: {
            tidyCard: {
                type: Object,
                required: true
            },
            quantity: {
                type:Number,
                required: true
            }
        },
        data(){
            return {
                myCard: {
                    good: this.toFloatStr(this.tidyCard.good),
                    sub: this.toFloatStr(this.tidyCard.sub),
                    stain: this.toFloatStr(this.tidyCard.stain),
                    broken: this.toFloatStr(this.tidyCard.broken),
                    notEven: this.toFloatStr(this.tidyCard.notEven),
                    operator: this.tidyCard.operator
                },
                over: false
            }
        },
        methods: {
            fromFloat(v) {
                if (v == null || v == '')
                    return null

                let vStr = "" + v
                let num = vStr.split('.', 2)

                let ret = parseInt(num[0], 10) * 12
                if (num.length == 2)
                    ret += parseInt(num[1]) % 12

                return ret
            },
            toFloatStr(v) {
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
            },
            prepareTidyCard(){
                this.tidyCard.good = this.fromFloat(this.myCard.good)
                this.tidyCard.sub = this.fromFloat(this.myCard.sub)
                this.tidyCard.stain = this.fromFloat(this.myCard.stain)
                this.tidyCard.broken = this.fromFloat(this.myCard.broken)
                this.tidyCard.notEven = this.fromFloat(this.myCard.notEven)
                this.tidyCard.operator = this.myCard.operator
                let total = this.tidyCard.good + this.tidyCard.sub + this.tidyCard.stain + this.tidyCard.broken + this.tidyCard.notEven
                if(total > this.quantity)
                    this.over = true
            },
            update(){
                this.prepareTidyCard()
                if(this.over){
                    alert("數量超過總量!")
                    return
                }


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
