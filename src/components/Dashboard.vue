<template>
    <div class="dashboard">
        {{ isAuthenticated }}
        <br/>
        <button class="btn btn-primary" @click="test">認證</button>
    </div>
</template>
<style>
    .dashboard {
        background-color:#ffff00;
    }

</style>
<script>
    import {mapActions, mapGetters} from 'vuex';

    export default{
        data(){
            return {
                msg: '儀錶板...TBD'
            }
        },
        computed: {
            ...mapGetters(['isAuthenticated']),
        },
        methods: {
                ...mapActions(['authenticate']),
            test(evt){
                    this.$store.dispatch('testAuthenticated');
            }
        },
        components: {}
    }
</script>
