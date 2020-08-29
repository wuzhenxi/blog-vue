<template>
  <el-form :model="user" :rules="rules" ref="user">
    <el-form-item v-show="false" label="用户id" prop="id">
      <el-input v-model.trim="user.id" />
    </el-form-item>
    <el-form-item label="用户名" prop="username">
      <el-input v-model.trim="user.username" :readonly="true" :disabled="true" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model.trim="user.email" />
    </el-form-item>

    <el-form-item v-if="visible" label="新密码" prop="password">
      <el-input type="password" v-model.trim="user.password" placeholder="请输入新密码">
        <i slot="suffix" title="显示密码" class="el-icon-sunny" @click="changePass('show')" style="cursor:pointer;" />
      </el-input>
    </el-form-item>
    <el-form-item v-else label="新密码" prop="password">
      <el-input type="text" v-model.trim="user.password" placeholder="请输入新密码">
        <i slot="suffix" title="隐藏密码" class="el-icon-moon" @click="changePass('hide')" style="cursor:pointer;" />
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('user')">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import svgIcons from '../../../components/SvgIcon'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          id: this.user.id,
          username: this.user.username,
          email: this.user.email,
        }
      }
    }
  },

  data() {

    const checkEmail = (rule, value, cb) => {
      const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入正确的邮箱'))
    }

    const checkPassword = (rule, value, cb) => {
      const regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
      if (regPassword.test(value)) {
        return cb()
      }
      cb(new Error('新密码至少包含 数字和英文，长度6-20'))
    }

    return {
      visible: true,

      rules: {
        username: [
          { required: true }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur'}
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    changePass(value) {
      this.visible = !(value === 'show');
    },    //判断渲染，true:暗文显示，false:明文显示

    submitForm(user) {
      this.$refs[user].validate((valid) => {
        if (valid) {
          const _this = this
          debugger
          _this.user.password = _this.$getRsaEncrypt(_this.user.password)
          this.$axios.post('/user/update', _this.user).then(res => {
            if (res.data.data) {
              _this.$notify({
                title: '修改成功',
                message: '账号已修改请重新登录',
                type: 'success'
              });
              _this.$store.commit("REMOVE_INFO")
              _this.$router.push("/login")
              sessionStorage.removeItem("blog_token")
            }
          })
        }
      })
    }
  }
}
</script>
