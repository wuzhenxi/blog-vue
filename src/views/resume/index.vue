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
              <el-tab-pane label="技能优势" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="工作经验" name="worker">
                <worker />
              </el-tab-pane>
              <el-tab-pane label="项目经验" name="timeline">
                <timeline />
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
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Worker from './components/Worker'
import Footer from "../../components/Footer";

export default {
  name: 'Resume.vue',
  components: { UserCard, Activity, Timeline, Footer, Worker },
  data() {
    return {
      user: {
        avatar: require('@/assets/person-login.gif')
      },
      activeTab: 'activity'
    }
  },
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
