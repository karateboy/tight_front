<template>
    <div>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th rowspan="2">流動卡編號</th>
                <th rowspan="2" class='text-center'>數量<br>(優/預定)</th>
                <th rowspan="2" class='text-center'>漂染</th>
                <th rowspan="2">定型</th>
                <th colspan="5" class='text-center'>整理</th>
            </tr>
            <tr>
                <th>檢襪</th>
                <th>車洗標</th>
                <th>剪線頭</th>
                <th>整理包裝</th>
                <th>成品倉庫</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>{{workCard._id}}</td>
                <td class='text-right'>{{workCard.good + "/" +workCard.quantity}}</td>
                <td class='text-right'>
                    <i class="fa fa-ban" style="color:red" aria-hidden="true"
                       v-if='dyeCard.active'></i>
                    <i class="fa fa-check" style="color:green" aria-hidden="true" v-else></i>
                </td>
                <td class='text-right'>
                    <i class="fa fa-check" style="color:green" aria-hidden="true"
                       v-if='stylingReady(workCard.stylingCard)'>{{workCard.stylingCard.good}}</i>
                    <i class="fa fa-ban" style="color:red" aria-hidden="true" v-else></i>
                </td>
                <td class='text-right'>
                    <i class="fa fa-check" aria-hidden="true" style="color:green" v-if='tidyMap["檢襪"]'>{{tidyMap["檢襪"].good}}</i>
                    <i class="fa fa-ban" style="color:red" aria-hidden="true" v-else></i>
                </td>
                <td class='text-right'>
                    <i class="fa fa-check" aria-hidden="true" style="color:green" v-if='tidyMap["車洗標"]'>{{tidyMap["車洗標"].good}}</i>
                    <i class="fa fa-ban" style="color:red" aria-hidden="true" v-else></i>
                </td>
                <td class='text-right'>
                    <i class="fa fa-check" aria-hidden="true" style="color:green" v-if='tidyMap["剪線頭"]'>{{tidyMap["剪線頭"].good}}</i>
                    <i class="fa fa-ban" style="color:red" aria-hidden="true" v-else></i>
                </td>
                <td class='text-right'>
                    <i class="fa fa-check" aria-hidden="true" style="color:green" v-if='tidyMap["整理包裝"]'>{{tidyMap["整理包裝"].good}}</i>
                    <i class="fa fa-ban" style="color:red" aria-hidden="true" v-else></i>
                </td>
                <td class='text-right'>
                    <i class="fa fa-check" aria-hidden="true" style="color:green" v-if='tidyMap["成品倉庫"]'>{{tidyMap["成品倉庫"].good}}</i>
                    <i class="fa fa-ban" style="color:red" aria-hidden="true" v-else></i>
                </td>
            </tr>
            </tbody>
        </table>

    </div>
</template>
<style>
</style>
<script>
    import axios from 'axios'
    export default{
        props: {
            workCard: {
                type: Object,
                required: true
            }
        },
        data(){
            this.populateWorkCard()
            return {
                tidyMap: [],
                dyeCard: {}
            }
        },
        methods: {
            stylingReady(card){
                if (card) {
                    return true
                } else {
                    return false
                }
            },
            showDyeStatus(){
                if (this.dyeCard.active)
                    return 'X'
                else
                    return 'O'
            },
            populateWorkCard(){
                axios.get("/TidyCardList/" + this.workCard._id).then((resp) => {
                    const ret = resp.data
                    for (let tidy of ret) {
                        this.tidyMap[tidy.phase] = tidy
                    }
                }).catch((err) => {
                    alert(err)
                })
                axios.get("/DyeCard/" + this.workCard.dyeCardID).then((resp) => {
                    this.dyeCard = resp.data
                }).catch((err) => {
                    alert(err)
                })
            }
        },
        components: {}
    }
</script>
