<template>
  <div class="m-content">
    <div class="block">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :size="50" :src="user.avatar" class="user-avatar"></el-avatar>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-show="hasLogin">
            <span><el-link type="blue" href="/user/info">个人中心</el-link></span>
          </el-dropdown-item>
          <el-dropdown-item v-show="hasLogin">
            <span><el-link type="success" href="/blog/add">发表博客</el-link></span>
          </el-dropdown-item>
          <el-dropdown-item v-show="logView">
            <span><el-link type="info" href="/log/query">系统日志</el-link></span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span v-show="!hasLogin"><el-link type="primary" href="/login">登录</el-link></span>
            <span v-show="hasLogin"><el-link type="danger" @click="logout">退出</el-link></span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        user: {
          username: 'guest',
          avatar: require('@/assets/person.png')
        },
        hasLogin: false,
        logView: false
      }
    },
    methods: {
      logout() {
        const _this = this
          _this.$axios.get("/logout").then(res => {
          _this.$store.commit("REMOVE_INFO")
          _this.$router.push("/login")
          sessionStorage.removeItem("blog_token")

        })
      }
    },
    created() {
      if(this.$store.getters.getUser) {
        this.user.username = this.$store.getters.getUser.username
        // this.user.avatar = this.$store.getters.getUser.avatar
        this.user.avatar = require('@/assets/person-login.gif');
        this.hasLogin = true
      }
    }
  }
</script>

<style lang="scss" scoped>

  .m-content {
    /* max-width: 960px; */
    margin: 0 auto;
    text-align: center;
  }
  .maction {
    margin: 10px 0;
  }

  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background .3s;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }
  }

  .avatar-wrapper {
    margin-top: 5px;
    position: relative;

    .user-avatar {
      cursor: pointer;
    }
    
    .el-icon-caret-bottom {
      cursor: pointer;
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }

</style>