<template>
    <div>
        <work-card-list :workCardList='workCardList'></work-card-list>
    </div>
</template>
<style>
</style>
<script>
    import axios from 'axios'
    import WorkCardList from './WorkCardList.vue'
    import cardHelper from '../cardHelper'
    export default{
        data(){
            this.getActiveWorkCard()
            return {
                workCardList: []
            }
        },
        methods: {
            getActiveWorkCard(){
                axios.get('/ActiveWorkCards').then((resp) => {
                    const ret = resp.data
                    this.workCardList.splice(0, this.workCardList.length)
                    for(let workCard of ret){
                        cardHelper.populateWorkCard(workCard)
                        this.workCardList.push(workCard)
                    }
                }).catch((err) => {
                    alert(err)
                })
            }
        },
        components: {
            WorkCardList
        }
    }
</script>
