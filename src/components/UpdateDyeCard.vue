<template>
    <div class="ibox-content">
        <form class="form-horizontal" @submit.prevent="query">
            <div class="form-group has-feedback"><label class="col-lg-3 control-label">漂染包襪明細單號:</label>
                <div class="col-lg-5"><input type="text" placeholder="掃描條碼" autofocus
                                             class="form-control"
                                             v-model="id">
                    <span v-if="invalidId" class="glyphicon glyphicon-remove form-control-feedback"></span>
                    <span v-if="invalidId" class="help-block">無效的漂染包襪明細單號</span>
                </div>
            </div>
        </form>
        <br>
        <div v-if='invalidId'>
            <dye-card-detail  :edit="true" :dyeCard=></dye-card-detail>
        </div>
    </div>
</template>
<style scoped>
    body{
        background-color:#ff0000;
    }


</style>
<script>
    import DyeCardDetail from './DyeCardDetail.vue'
    export default{
        data(){
            return {
                id: "",
                invalidId: false
            }
        },
        methods: {
            query(){
                alert("query..." + this.id)
            }
        },
        components: {
            DyeCardDetail
        }
    }
</script>
