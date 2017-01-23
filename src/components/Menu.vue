<template>
    <div class="sidebar-collapse">
        <ul class="nav metismenu" id="side-menu">
            <li class="nav-header">
                <div class="dropdown profile-element">
                    <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <span class="clear"> <span class="block m-t-xs"> <strong
                                    class="font-bold">{{ user.name }}</strong>
                             </span> <span class="text-muted text-xs block">{{ user.groupId}} <b
                                    class="caret"></b></span> </span> </a>
                    <ul class="dropdown-menu animated fadeInRight m-t-xs">
                        <li><a href="#">Logout</a></li>
                    </ul>
                </div>
                <div class="logo-element">
                    IN+
                </div>
            </li>
            <router-link tag="li" to="/" active-class="active" exact><a><i class="fa fa-th-large"></i> <span
                    class="nav-label">儀錶板</span></a></router-link>
            <li>
                <a><i class="fa fa-th-large"></i> <span class="nav-label">訂單管理</span> <span
                        class="fa arrow"></span></a>
                <ul class="nav nav-second-level collapse">
                    <router-link tag="li" to="/Order/New" active-class="active"><a><i class="fa fa-th-large"></i> <span
                            class="nav-label">新增訂單</span> </a></router-link>
                    <router-link tag="li" to="/Order/Mine" active-class="active"><a><i class="fa fa-th-large"></i> <span
                            class="nav-label">我的訂單</span> </a></router-link>
                    <router-link tag="li" to="/Order/Query" active-class="active"><a><i class="fa fa-th-large"></i>
                        <span
                                class="nav-label">查詢訂單</span> </a></router-link>
                </ul>
            </li>
            <li>
                <a><i class="fa fa-th-large"></i> <span class="nav-label">生產排程</span> <span
                        class="fa arrow"></span></a>
                <ul class="nav nav-second-level collapse">
                    <router-link to='/Schedule/New' tag='li' role="presentation" active-class='active'><a>排定工作</a>
                    </router-link>
                    <router-link to='/Schedule/ActiveDyeCardList' tag='li' role="presentation" active-class='active'><a>漂染單</a>
                    </router-link>
                    <router-link to='/Schedule/WorkCard' tag='li' role="presentation" active-class='active'><a>流動工作卡</a>
                    </router-link>
                </ul>
            </li>
            <router-link tag="li" :to="{name:'UpdateDyeCard'}" active-class="active"><a><i class="fa fa-th-large"></i> <span
                    class="nav-label">漂染包襪明細表</span> </a></router-link>
        </ul>
    </div>
</template>
<style scoped>

</style>
<script>
    import {mapGetters} from 'vuex'
    //$("#side-menu").metisMenu();
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        computed: {
            ...mapGetters(['user'])
        }
    }


</script>
