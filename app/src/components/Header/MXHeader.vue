<template>
  <div id="header-container">
    <div class="top">
      <div class="user">
        <span class="welcome">尚品汇欢迎您！</span>&nbsp;&nbsp;
        <div class="showLogin"
             v-if="show">
          <router-link to="/login">请登录</router-link>&nbsp;
          <span>|</span>&nbsp;
          <router-link to="/register">免费注册</router-link>
        </div>
        <div class="showUser"
             v-else>
          <a>{{ $store.state.user.userInfo.name }} </a>&nbsp;
          <span>|</span>&nbsp;
          <a @click="logout">退出登录</a>
        </div>
      </div>
      <ul class="tab">
        <li><a href="javascript:;">我的订单</a></li>&nbsp;&nbsp;<span>|</span>&nbsp;&nbsp;
        <li>
          <router-link to="/shopcart">我的购物车</router-link>
        </li>&nbsp;&nbsp;<span>|</span>&nbsp;&nbsp;
        <li><a href="javascript:;">我的尚品汇</a></li>&nbsp;&nbsp;<span>|</span>&nbsp;&nbsp;
        <li><a href="javascript:;">尚品汇会员</a></li>&nbsp;&nbsp;<span>|</span>&nbsp;&nbsp;
        <li><a href="javascript:;">企业采购</a></li>&nbsp;&nbsp;<span>|</span>&nbsp;&nbsp;
        <li><a href="javascript:;">关注尚品汇</a></li>&nbsp;&nbsp;<span>|</span>&nbsp;&nbsp;
        <li><a href="javascript:;">合作招商</a></li>&nbsp;&nbsp;<span>|</span>&nbsp;&nbsp;
        <li><a href="javascript:;">商家后台</a></li>
      </ul>
    </div>
    <div class="down">
      <div class="logo">
        <router-link to="/home">
          <img src="./image/logo.png">
        </router-link>
      </div>
      <div class="search">
        <el-input v-model.trim="input"></el-input>
        <el-button type="warning"
                   @click="goSearch">搜索</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MXHeader',

  data() {
    return {
      input: ''
    }
  },
  computed: {
    show() {
      return JSON.stringify(this.$store.state.user.userInfo) === '{}'
    }
  },
  methods: {
    goSearch() {
      const location = {
        name: 'search',
        params: { keyword: this.input || undefined }
      }
      // 合并query参数
      if (this.$route.query) {
        location.query = this.$route.query
      }
      this.$router.push(location)
    },
    logout() {
      this.$store
        .dispatch('logout')
        .then(() => {
          this.$router.push('/')
        })
        .catch(e => this.$message.error(e))
    }
  },
  mounted() {
    this.$bus.$on('clearKeyword', () => {
      this.input = ''
    })
  }
}
</script>

<style scoped lang="less">
#header-container {
  letter-spacing: 1px;
  line-height: 50px;
  .top {
    background-color: rgb(230, 224, 224);
    padding: 0px 15%;
    height: 50px;
    overflow: auto;
    .user {
      float: left;
      .welcome {
        font-weight: bold;
      }
      .showUser,
      .showLogin {
        float: right;
      }
    }
    .tab {
      float: right;
      display: flex;
    }
  }
  .down {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    .logo {
      margin-left: 300px;
    }
    .search {
      margin-right: 250px;
      display: flex;
      /deep/ .el-input {
        .el-input__inner {
          width: 350px;
          height: 30px;
          border: 2px orange solid;
          position: relative;
          left: 1px;
          z-index: 1;
        }
      }
      /deep/ .el-button {
        height: 30px;
        // background-color: rgb(236, 102, 30);
        // border: 1px solid rgb(236, 102, 30);
        margin-top: 10px;
        line-height: 30px;
        padding: 0px 20px;
        border-radius: 0%;
      }
    }
  }
}
</style>
