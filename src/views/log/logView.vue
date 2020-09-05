<template>
  <div class="mcontaner">
    <Header></Header>

    <div class="block">
      <el-date-picker
        v-model="pickDateTime"
        type="datetimerange"
        :picker-options="pickerOptions2"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="queryLog"
        align="right">
      </el-date-picker>
      <el-table
        :data="logInfo"
        stripe
        style="width: 100%"
        height="530">
        <el-table-column
          fixed
          prop="operationTime"
          label="时间"
          width="230">
        </el-table-column>
        <el-table-column
          sortable
          prop="operater"
          label="用户"
          width="150">
        </el-table-column>
        <el-table-column
          sortable
          prop="method"
          label="行为"
          width="120">
        </el-table-column>
        <el-table-column
          sortable
          prop="country"
          label="国家"
          width="120">
        </el-table-column>
        <el-table-column
          prop="region"
          label="省份/地区"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="城市"
          width="120">
        </el-table-column>
        <el-table-column
          prop="isp"
          label="网络运营商"
          width="120">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="ip"
          width="200">
        </el-table-column>
        <el-table-column
          prop="cityId"
          label="城市编号"
          width="120">
        </el-table-column>
      </el-table>

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
        logInfo: [],
        log: {
          city: "",
          startDateTime: "",
          endDateTime: "",
          method: "",
          operater: "",
          currentPage : 1,
          total: 0,
          pageSize: 10
        },
        pickDateTime: [],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    methods: {
      handleCurrentChange(currentPage) {
        const _this = this
        if(_this.pickDateTime.size == 2) {
          _this.log.startDateTime = this.timeFormate(_this.pickDateTime[0])
          _this.log.endDateTime = this.timeFormate(_this.pickDateTime[1])
        } else {
          var now = new Date()
          _this.log.startDateTime = this.timeFormate(new Date(now - 60*24*60*60*1000))
          _this.log.endDateTime = this.timeFormate(now)
        }
        _this.log.currentPage = currentPage
        _this.$axios.post("/log/query", _this.log).then(res => {
          _this.logInfo = res.data.data.records
          _this.log.currentPage = res.data.data.current
          _this.log.total = res.data.data.total
          _this.log.pageSize = res.data.data.size
        })
      },
      handleSizeChange(pageSize) {
        const _this = this
        if(_this.pickDateTime.size == 2) {
          _this.log.startDateTime = this.timeFormate(_this.pickDateTime[0])
          _this.log.endDateTime = this.timeFormate(_this.pickDateTime[1])
        } else {
          var now = new Date()
          _this.log.startDateTime = this.timeFormate(new Date(now - 60*24*60*60*1000))
          _this.log.endDateTime = this.timeFormate(now)
        }
        _this.log.pageSize = pageSize
        _this.$axios.post("/log/query", _this.log).then(res => {
          _this.logInfo = res.data.data.records
          _this.log.currentPage = res.data.data.current
          _this.log.total = res.data.data.total
          _this.log.pageSize = res.data.data.size
        })
      },
      timeFormate(timeStamp) {
        let year = new Date(timeStamp).getFullYear();
        let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
        let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
        let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
        let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
        let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
        return year + "-" + month + "-" + date +" "+hh+":"+mm+':'+ss ;
      },
      queryLog() {
        const _this = this
        _this.log.startDateTime = this.timeFormate(_this.pickDateTime[0])
        _this.log.endDateTime = this.timeFormate(_this.pickDateTime[1])
        _this.log.currentPage = 1
        _this.log.pageSize = 10
        _this.$axios.post("/log/query", _this.log).then(res => {
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