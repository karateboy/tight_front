<template>
    <div>
        <table class="table table-bordered">
            <thead>
            <tr>
                <th rowspan="2">編號</th>
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
                <td class='text-right'><i class="fa fa-ban" aria-hidden="true" v-if='dyeCard.active'></i>
                    <i class="fa fa-check" aria-hidden="true" v-else></i>
                </td>
                <td class='text-right'><i class="fa fa-check" aria-hidden="true" v-if='stylingReady(workCard.stylingCard)'></i>
                    <i class="fa fa-ban" aria-hidden="true" v-else></i>
                </td>
                <td class='text-right'>
                    <i class="fa fa-check" aria-hidden="true" v-if='tidyMap["檢襪"]'></i>
                    <i class="fa fa-ban" aria-hidden="true" v-else></i>
                </td>
                <td class='text-right'>
                    <i class="fa fa-check" aria-hidden="true" v-if='tidyMap["車洗標"]'></i>
                    <i class="fa fa-ban" aria-hidden="true" v-else></i>
                </td>
                <td class='text-right'>
                    <i class="fa fa-check" aria-hidden="true" v-if='tidyMap["剪線頭"]'></i>
                    <i class="fa fa-ban" aria-hidden="true" v-else></i>
                </td>
                <td class='text-right'>
                    <i class="fa fa-check" aria-hidden="true" v-if='tidyMap["整理包裝"]'></i>
                    <i class="fa fa-ban" aria-hidden="true" v-else></i>
                </td>
                <td class='text-right'>
                    <i class="fa fa-check" aria-hidden="true" v-if='tidyMap["成品倉庫"]'></i>
                    <i class="fa fa-ban" aria-hidden="true" v-else></i>
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
