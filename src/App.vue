<template>
  <div id="app">
    <nav class="navbar-default navbar-static-side" role="navigation">
      <menu-view></menu-view>
    </nav>

    <div id="page-wrapper" class="gray-bg">
      <div class="row border-bottom">
        <nav class="navbar navbar-static-top white-bg" role="navigation" style="margin-bottom: 0">
          <div class="navbar-header">
            <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
            <form role="search" class="navbar-form-custom" method="post" action="#">
              <div class="form-group">
                <input type="text" placeholder="佩登斯生產履歷系統" class="form-control" name="top-search" id="top-search">
              </div>
            </form>
          </div>
          <ul class="nav navbar-top-links navbar-right">
            <li>
              <a @click="logout">
                <i class="fa fa-sign-out"></i> 登出
              </a>
            </li>
          </ul>

        </nav>
      </div>
      <div class="wrapper wrapper-content animated fadeInRight">
        <div class="row">
          <div class="col-lg-12">
            <router-view></router-view>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="pull-right">
          10GB of <strong>250GB</strong> Free.
        </div>
        <div>
          <strong>Copyright</strong> Example Company &copy; 2014-2015
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import menu from "./components/menu.vue"

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    logout(){
      alert("登出");
    }
  },
  components: {
    menuView: menu
  }
}

const env = require('get-env')();
console.log(env);
</script>

<style>

</style>
