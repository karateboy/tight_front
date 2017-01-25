<template>
    <div>
        <button class='btn btn-primary' @click="newOrder">重設</button>
        <order-detail></order-detail>
    </div>
</template>
<style scoped>
</style>
<script>
    import OrderDetail from './OrderDetail.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default{
        data(){
            return {}
        },
        computed: {
            ...mapGetters(['order'])
        },
        methods: {
            ...mapActions(['newOrder'])
        },
        components: {
            OrderDetail
        }
    };
</script>
