<template>
  <el-card style="margin-bottom:20px;">
    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>Hello</div>
        </pan-thumb>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <!-- <svg-icon icon-class="education" /><span>毕业学校</span> -->
          <i class="el-icon-school"> 毕业学校</i>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            武汉理工大学华夏学院
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <!-- <svg-icon icon-class="skill" /><span>专业技能</span> -->
          <i class="el-icon-trophy"> 专业技能</i>
        </div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>Java</span>
            <el-progress :percentage="100" status="success" />
          </div>
          <div class="progress-item">
            <span>Vue</span>
            <el-progress :percentage="20" />
          </div>
          <div class="progress-item">
            <span>Linux</span>
            <el-progress :percentage="20" />
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'
// import SvgIcon from '@/components/SvgIcon/'

export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          avatar: '',
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
