<template>
    <div>
        <br>
        <dye-card-list :cardList='dyeCardList'></dye-card-list>
    </div>
</template>
<style scoped>
    body{
    }
</style>
<script>
    import DyeCardList from './DyeCardList.vue'
    import axios from 'axios'
    import cardHelper from '../cardHelper'

    export default{
        data(){
            const dyeCardList = []
            axios.get("/DyeCard").then((resp)=>{
                const ret = resp.data
                dyeCardList.splice(0, dyeCardList.length)

                for(let dyeCard of ret){
                    cardHelper.populateDyeCard(dyeCard)
                    dyeCardList.push(dyeCard)
                }
            }).catch((err)=>{
                alert(err);
            })

            return{
                dyeCardList
            }
        },
        components:{
            DyeCardList
        }
    }
</script>
