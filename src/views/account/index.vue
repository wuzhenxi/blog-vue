<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="博客" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="账号" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex' // 暂且用不到
import UserCard from './components/UserCard'
import Timeline from './components/Timeline'
import Account from './components/Account'
import Footer from "../../components/Footer";

export default {
  name: 'Profile.vue',
  components: { UserCard, Timeline, Account, Footer },
  data() {
    return {
      user: {
        id: "",
        username: "",
        password: "",
        email: ""
      },
      activeTab: 'timeline'
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'name',
  //     'avatar'
  //   ])
  // },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      if(this.$store.getters.getUser) {
        this.user.id = this.$store.getters.getUser.id
        this.user.username = this.$store.getters.getUser.username
        this.user.email = this.$store.getters.getUser.email
        this.user.lastLogin = this.$store.getters.getUser.lastLogin
        this.hasLogin = true
        if(this.$store.getters.getUser.avatar) {
          this.user.avatar = this.$store.getters.getUser.avatar
        } else {
          this.user.avatar = require('@/assets/person-login.gif');
        }
      }
    }
  }
}
</script>
