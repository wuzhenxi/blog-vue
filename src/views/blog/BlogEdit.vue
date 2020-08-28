<template>
  <div>
    <Header></Header>

    <div class="m-content">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item v-show="false" label="博客id" prop="id">
          <el-input v-model="ruleForm.id"></el-input>
        </el-form-item>
        <el-form-item v-show="false" label="所属者" prop="userId">
          <el-input v-model="ruleForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="仅自己可见" prop="status">
          <div style="text-align: left;">
            <el-switch
              v-model="ruleForm.status"
              active-value=1
              inactive-value=0
              active-text="是"
              inactive-text="否">
            </el-switch>
          </div>
        </el-form-item>

        <el-form-item label="个人置顶" prop="isTop">
          <div style="text-align: left;">
            <el-switch
              v-model="ruleForm.isTop"
              active-value=1
              inactive-value=0
              active-text="是"
              inactive-text="否">
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

        <el-form-item label="附件" prop="attachment" class="upload-demo">
          <el-upload
            :v-model="ruleForm.attachment"
            :headers="headers"
            :action="upload_url"
            :on-preview="handlePreview"
            :on-remove="removeFile"
            :before-remove="beforeRemove"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            multiple
            :limit="10"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能选10个文件，且不超过500MB</div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </div>

    <el-tooltip placement="top" content="回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>

    <Footer></Footer>
  </div>
</template>

<script>
  import Header from "../../components/Header";
  import Footer from "../../components/Footer";
  import BackToTop from '@/components/BackToTop';
  import {mavonEditor} from 'mavon-editor';
  export default {
    name: "BlogEdit.vue",
    components: {Header, Footer, mavonEditor, BackToTop},
    data() {
      let uploadReq;
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
          userId: this.$store.getters.getUser.id,
          isTop: 0,
          status: 1,
          attachment: ''
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
        },
        headers: {
          Authorization: this.$store.getters.getToken  //从cookie里获取token，并赋值  Authorization ，而不是token
        },
        upload_url: this.$axios.defaults.baseURL + '/blog/upload',
        fileList: [],
        showProcess: false,
        processLength: 0
      };
    },
    methods: {
      handleEditorImgAdd (pos, $file) {
        let formdata = new FormData()
        formdata.append('file', $file)
        this.$axios.post('/blog/upload', formdata).then(res => {
          if (res.data.code === 200) {
              this.$notify({
                title: 'success',
                message: '上传成功',
                type: 'success'
              });
              let imgFile = res.data.data.fileUrl;
              let name = $file.name
              this.$refs.md.$img2Url(pos, imgFile);
          } else {
              this.$notify({
                title: '警告',
                message: res.data.msg,
                type: 'warning'
              });
          }
        });
      },
      handleEditorImgDel (pos) {
          delete this.imgFile[pos]
      },
      handleExceed(files, fileList) {
        this.$notify.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handlePreview(file) {
        console.log(file);
      },
      beforeRemove(file, fileList) {
        if(this.ruleForm.userId === this.$store.getters.getUser.id) {
          return this.$confirm(`确定移除 ${ file.name }？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
        } else {
          this.$notify({
            title: '警告',
            message: '该博文不属于您，无权删除博文相关内容',
            type: 'warning'
          });
        }
      },
      removeFile(file,fileList) {
        const _this = this
        if(file.status === 'success') {
          // 删除已上传的文件 或 编辑删除文件(无response)
          let userFileDTO = {
            userId: _this.ruleForm.userId,
            fileUrl: file.response?file.response.data.fileUrl:file.url,
            fileName: file.name
          }
          _this.$axios.post('/file/delete/', userFileDTO).then(res => {
            if (res.data.code === 200) {
              _this.$notify({
                title: 'success',
                message: `成功删除 ${ file.name }`,
                type: 'success'
              });
            } else {
              _this.$notify({
                title: '警告',
                message: '文件不存在或已被删除',
                type: 'warning'
              });
            }
            _this.fileList.splice(file,1);
            var attachmentData = {};
            attachmentData.name = file.name;
            attachmentData.url = file.url;
            debugger
            var attachmentTmp = JSON.parse(_this.ruleForm.attachment)
            attachmentTmp.splice(attachmentData,1)
            _this.ruleForm.attachment = JSON.stringify(attachmentTmp);
          })
        } else if(file.status === 'uploading') {
          // 取消正在上传中的文件
          _this.$notify({
            title: 'info',
            message: `已取消上传文件 ${ file.name }`,
            type: 'info'
          });
        }
      },
      uploadSuccess(response,file,fileList) {
        if(response.code === 200) {
          this.$notify({
            title: 'success',
            message: `成功上传 ${ file.name }`,
            type: 'success'
          });
          
          let fileInfo = {
            name: file.name,
            url: response.data.fileUrl
          };
          let atts = []
          atts.push(fileInfo)
          this.ruleForm.attachment = JSON.stringify(atts);
        } else {
            this.$notify({
              title: '警告',
              message: response.data.msg,
              type: 'warning'
            });
        }
      },

      uploadError(err,file,fileList) {
        this.$notify({
          title: 'error',
          message: '上传失败',
          type: 'error'
        });
      },

      submitForm(formName) {
        const _this = this
        _this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.$axios.post('/blog/edit', _this.ruleForm).then(res => {
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
      const _this = this
      if(blogId) {
        this.$axios.get('/blog/' + blogId).then(res => {
          const blog = res.data.data
          // _this.ruleForm.id = blog.id
          // _this.ruleForm.userId = blog.userId
          // _this.ruleForm.title = blog.title
          // _this.ruleForm.description = blog.description
          // _this.ruleForm.isTop = blog.isTop
          // _this.ruleForm.status = blog.status
          // _this.ruleForm.content = blog.content
          _this.ruleForm = blog
          if(blog.attachment) {
            _this.ruleForm.attachment = blog.attachment
            let attachments = JSON.parse(blog.attachment);
            attachments.forEach(function(value,key,arr){
              var attachmentData = {};
              attachmentData.name = value.name;
              attachmentData.url = value.url;
              _this.fileList.push(attachmentData)
            })
          }
        })
      }

    }
  }
</script>

<style scoped>
  .m-content {
    text-align: center;
  }

  .upload-demo {
    text-align: left;
    width: 45%;
  }
</style>