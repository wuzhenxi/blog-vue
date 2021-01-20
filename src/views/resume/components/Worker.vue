<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
const nowDate = new Date();
let date = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    date: nowDate.getDate(),
}
export default {
  data() {
    return {
      timeline: [
        {
          timestamp: date.year+'/'+date.month,
          title: '武汉天喻软件股份有限公司',
          content: '职位:java开发 部门:HW-深圳项目组'
        },
        {
          timestamp: '2019/10',
          title: '深圳软通动力信息技术有限公司',
          content: '职位:java开发 部门:深圳HWBPIT'
        },
        {
          timestamp: '2018/10',
          title: '武汉佰钧成技术有限责任公司',
          content: '职位:java开发 部门:ISBG-BU8'
        }
      ]
    }
  }
}
</script>
