<template>
    <div class="ibox flot-e-margins">
        <div class="ibox-content">
            <ul class="nav nav-tabs">
                <router-link to='/Schedule/New' tag='li' role="presentation" active-class='active'><a>排定工作</a>
                </router-link>
                <router-link to='/Schedule/ActiveDyeCardList' tag='li' role="presentation" active-class='active'><a>漂染單</a>
                </router-link>
                <router-link to='/Schedule/WorkCard' tag='li' role="presentation" active-class='active'><a>流動工作卡</a>
                </router-link>
            </ul>
            <router-view></router-view>
        </div>
    </div>
</template>
<style scoped>
    .order {
        background-color:#0000ff;
    }
</style>
<script>
    export default{
        data(){
            return {
                msg: '生產排程'
            }
        },
        components: {}
    }
</script>
