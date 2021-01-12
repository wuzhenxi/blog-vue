<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item :timestamp="(blog.isTop+blog.created)" placement="top" v-for="blog in blogs" :key="blog.id">
        <el-card>
          <h4>
            <router-link class="router-link-active" :to="{name: 'BlogDetail', params: {blogId: blog.id}}">
              {{blog.title}}
            </router-link>
          </h4>
          <p>{{blog.description}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>

    <el-pagination class="mpage"
                    background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[5, 10, 20, 50]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
    </el-pagination>

    <el-tooltip placement="top" content="回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop';

export default {
  components: {BackToTop},
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
      blogs: {},
      currentPage: 1,
      total: 0,
      pageSize: 10
    }
  },
  methods: {
    handleCurrentChange(currentPage) {
      const _this = this
      _this.$axios.get("/blogs/my?currentPage=" + currentPage +"&pageSize=" + _this.pageSize).then(res => {
      _this.blogs = res.data.data.records
      _this.currentPage = res.data.data.current
      _this.total = res.data.data.total
      _this.pageSize = res.data.data.size
      })
    },
    handleSizeChange(pageSize) {
      const _this = this
      _this.$axios.get("/blogs/my?currentPage=1&pageSize=" + pageSize).then(res => {
      _this.blogs = res.data.data.records
      _this.currentPage = res.data.data.current
      _this.total = res.data.data.total
      _this.pageSize = res.data.data.size
      })
    }
  },
  created() {
    this.handleCurrentChange(1)
  }
}
</script>

<style scoped>

  .router-link-active {
    text-decoration: none;
  }

</style>
