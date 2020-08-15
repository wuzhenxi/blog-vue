<template>
  <div>
    <Header></Header>

    <div class="m-content">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="仅自己可见" prop="status">
          <div style="text-align: left;">
            <el-switch
              v-model="ruleForm.status"
              active-color="#ff4949"
              inactive-color="#13ce66"
              active-value=0
              inactive-value=1
              active-text="否"
              inactive-text="是">
            </el-switch>
          </div>
        </el-form-item>

        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <mavon-editor 
            v-model="ruleForm.content"
            ref="md"
            @imgAdd="handleEditorImgAdd"
            @imgDel="handleEditorImgDel"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </div>

    <el-tooltip placement="top" content="top">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>

    <Footer></Footer>
  </div>
</template>

<script>
  import Header from "../components/Header";
  import Footer from "../components/Footer";
  import BackToTop from '@/components/BackToTop';
  import {mavonEditor} from 'mavon-editor';
  export default {
    name: "BlogEdit.vue",
    components: {Header, Footer, mavonEditor, BackToTop},
    data() {
      return {
        myBackToTopStyle: {
          right: '50px',
          bottom: '50px',
          width: '40px',
          height: '40px',
          'border-radius': '4px',
          'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
          background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
        },
        ruleForm: {
          id: '',
          title: '',
          description: '',
          content: '',
          status: '1'
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入摘要', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleEditorImgAdd (pos, $file) {
        let formdata = new FormData()
        formdata.append('file', $file)
        let instance = this.$axios.post('/blog/upload', formdata).then(res => {
            if (res.data.code === 200) {
                this.$notify({
                  title: 'success',
                  message: '上传成功',
                  type: 'success'
                });
                let imgFile = res.data.data.systemFileName;
                let name = $file.name
                console.log(imgFile)
                this.$refs.md.$img2Url(pos, imgFile);
            } else {
                this.$notify({
                  title: '警告',
                  message: res.data.msg,
                  type: 'warning'
                });
            }
        })
      },
      handleEditorImgDel (pos) {
          delete this.imgFile[pos]
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const _this = this;
            this.$axios.post('/blog/edit', this.ruleForm).then(res => {
              if(res.data.data) {
                _this.$notify({
                  title: 'success',
                  message: '操作成功',
                  type: 'success'
                });
              }
              _this.$router.push("/blogs");
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
    },
    created() {
      const blogId = this.$route.params.blogId
      console.log(blogId)
      const _this = this
      if(blogId) {
        this.$axios.get('/blog/' + blogId).then(res => {
          const blog = res.data.data
          _this.ruleForm.id = blog.id
          _this.ruleForm.title = blog.title
          _this.ruleForm.description = blog.description
          _this.ruleForm.content = blog.content
        })
      }

    }
  }
</script>

<style scoped>
  .m-content {
    text-align: center;
  }
</style>