<template>
  <div>

    <el-container>
      <el-header>
        <h1 class="mlogo">
          系统登录
        </h1>
        <!-- <img class="mlogo" src="https://www.markerhub.com/dist/images/logo/markerhub-logo.png" alt=""> -->
      </el-header>
      <el-main>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item v-if="visible" label="密码" prop="password">
            <el-input type="password" v-model.trim="ruleForm.password" placeholder="请输入密码">
              <i slot="suffix" title="显示密码" class="el-icon-sunny" @click="changePass('show')" style="cursor:pointer;" />
            </el-input>
          </el-form-item>
          <el-form-item v-else label="密码" prop="password">
            <el-input type="text" v-model.trim="ruleForm.password" placeholder="请输入密码">
              <i slot="suffix" title="隐藏密码" class="el-icon-moon" @click="changePass('hide')" style="cursor:pointer;" />
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>

      </el-main>
      <Footer></Footer>
    </el-container>

  </div>
</template>

<script>
  import Footer from "../components/Footer";

  export default {
    name: "Login",
    components: {Footer},
    data() {
      return {
        visible: true,
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请选择密码', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      changePass(value) {
        this.visible = !(value === 'show');
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const _this = this
            _this.ruleForm.password = _this.$getRsaEncrypt(_this.ruleForm.password)
            _this.$axios.post('/login', _this.ruleForm).then(res => {
              if(res) {
                const jwt = res.headers['authorization']
                const userInfo = res.data.data

                // 把数据共享出去
                _this.$store.commit("SET_TOKEN", jwt)
                _this.$store.commit("SET_USERINFO", userInfo)


                _this.$notify({
                  title: '登录成功',
                  message: '欢迎' + userInfo.username + '回家',
                  type: 'success'
                });

                _this.$router.push("/blogs")
              } 
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .mlogo {
    height: 60%;
    margin-top: 10px;
  }

  .demo-ruleForm {
    max-width: 500px;
    margin: 0 auto;
  }

</style>