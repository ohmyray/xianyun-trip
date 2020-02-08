<template>
  <div class="header-wrappe">
    <!-- header -->
    <el-row type="flex" justify="space-between" align="middle" class="header">
      <!-- logo -->
      <div class="logo">
        <img src="/logo.jpg" alt=""/>
      </div>
      <!-- navs -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- login&register -->
      <div v-if="!$store.state.user.userInfo.token">
        <nuxt-link to="/user/login">登录/注册</nuxt-link>
      </div>
      <el-dropdown v-else>
        <span class="el-dropdown-link">
          <img
            :src="
              $axios.defaults.baseURL +
                $store.state.user.userInfo.user.defaultAvatar
            "
          />
          {{ $store.state.user.userInfo.user.nickname }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="less" scoped>
  .header-wrappe {
    height: 60px;
    min-width: 1000px;
    background-color: #fff;
    border-bottom: 1px solid #f6f6f6;
    box-shadow: 0 3px 3px #ededed;

    .header {
      width: 1000px;
      height: 60px;
      margin: 0 auto;

      .logo {
        img {
          width: 156px;
          height: 42px;
          display: block;
        }
      }
    }

    .navs {
      margin-left: 20px;
      flex: 1;

      a {
        display: block;
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
        padding: 0 20px;

        &:hover {
          border-bottom: 4px solid #409eff;
          color: #409eff;
        }
      }

      .nuxt-link-exact-active {
        background-color: #409eff;
        color: #fff;

        &:hover {
          color: #fff;
        }
      }
    }
  }

  .el-dropdown-link {
    img {
      width: 36px;
      height: 36px;
      vertical-align: middle;
    }
  }
</style>
