<template>
  <div>
    <Header></Header>

    <div class="mblog">
      <h2> {{ blog.title }}</h2>
      <el-button icon="el-icon-edit" type="text" v-if="ownBlog">
        <router-link class="link-text" :to="{name: 'BlogEdit', params: {blogId: blog.id}}" >
        编辑
        </router-link>
      </el-button>
      <el-popover class="delete-popover" v-if="ownBlog"
        placement="top"
        width="160"
        v-model="visible">
        <p>确定删除这条博客吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="deleteBlog(blog.id)">确定</el-button>
        </div>
        
        <el-button icon="el-icon-delete" type="text" slot="reference">删除</el-button>
      </el-popover>

      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>

      <div class="mattachment" v-if="blog.attachment">
        <i class="el-icon-connection">附件</i>
        <li v-for="blogAttachment in blog.attachment" :key="blogAttachment.uid">
            <a :href="blogAttachment.url" target="_blank">{{blogAttachment.name}}</a>
        </li>
      </div>

    </div>

    <el-tooltip placement="top" content="top">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>

    <Footer></Footer>

  </div>
</template>

<script>
  import 'github-markdown-css'
  import Header from "../components/Header";
  import Footer from "../components/Footer";
  import BackToTop from '@/components/BackToTop';

  export default {
    name: "BlogDetail.vue",
    components: {Header, Footer, BackToTop},
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
        blog: {
          id: "",
          title: "",
          content: "",
          userId: "",
          attachment: ""
        },
        ownBlog: false,
        visible: false
      }
    },
    created() {
      const blogId = this.$route.params.blogId
      console.log(blogId)
      const _this = this
      this.$axios.get('/blog/' + blogId).then(res => {
        const blog = res.data.data
        _this.blog.id = blog.id
        _this.blog.title = blog.title
        _this.blog.attachment = JSON.parse(blog.attachment)
        _this.blog.userId = blog.userId

        var MardownIt = require("markdown-it")
        var md = new MardownIt()
        
        var result = md.render(blog.content)

        _this.blog.content = result
        _this.ownBlog = (blog.userId === _this.$store.getters.getUser.id)

      })
    },
    methods: {
      deleteBlog(blogId) {
        const _this = this;
        this.$axios.get('/blog/delete/' + blogId).then(res => {
          if(res.data.data) {
            this.$notify({
              title: 'success',
              message: '成功删除',
              type: 'success'
            });
          }
          _this.$router.push("/blogs");
        })
      }
    }
  }
</script>

<style scoped>
  .mblog {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    min-height: 700px;
    padding: 20px 15px;
  }

  .link-text {
    color: #409EFF;
    text-decoration: none
  }

  .delete-popover {
    margin-left: 10px;
  }

  .mattachment {
    margin-top: 25px;
  }

</style>