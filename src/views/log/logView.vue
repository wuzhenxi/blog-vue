<template>
  <div class="mcontaner">
    <Header></Header>

    <div class="block">

      

      <el-pagination class="mpage"
                     background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="log.currentPage"
                    :page-sizes="[5, 10, 20, 50]"
                    :page-size="log.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="log.total">
      </el-pagination>

    </div>

    <el-tooltip placement="top" content="top">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>

    <Footer></Footer>
  </div>
</template>

<script>
  import Header from "../../components/Header";
  import Footer from "../../components/Footer";
  import BackToTop from '@/components/BackToTop';

  export default {
    name: "LogView",
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
        logInfo: {},
        log: {
          city: "",
          startDateTime: "",
          endDateTime: "",
          method: "",
          operater: "",
          currentPage : 1,
          total: 0,
          pageSize: 10
        }
      }
    },
    methods: {
      handleCurrentChange(currentPage) {
        const _this = this
        log.currentPage = currentPage
        log.pageSize = _this.pageSize
        _this.$axios.post("/log/query", this.log).then(res => {
        _this.logInfo = res.data.data.records
        _this.log.currentPage = res.data.data.current
        _this.log.total = res.data.data.total
        _this.log.pageSize = res.data.data.size
        })
      },
      handleSizeChange(pageSize) {
        const _this = this
        log.currentPage = 1
        log.pageSize = pageSize
        _this.$axios.post("/log/query", this.log).then(res => {
        _this.logInfo = res.data.data.records
        _this.log.currentPage = res.data.data.current
        _this.log.total = res.data.data.total
        _this.log.pageSize = res.data.data.size
        })
      }
    },
    created() {
      this.handleCurrentChange(1)
    }
  }
</script>

<style scoped>

  .mpage {
    margin: 0 auto;
    text-align: center;
  }

</style>