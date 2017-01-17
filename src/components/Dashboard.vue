<template>
    <div class="dashboard">
        <h1>{{ user.groupId + "的儀錶板"}}</h1>
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
            ...mapGetters(['isAuthenticated', 'user']),
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
