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
          title: '华为研发-产品与软件工程装备服务域-PDM2.0',
          content: 'PDM2.0是基于PDM1.0平台，华为为了剥离国外PTC公司的应用软件windchill的依赖，与武汉天喻软件股份有限公司合作共赢，从后台框架、后台数据模型重新选型，共同研发的产品数据管理系统。'
        },
        {
          timestamp: '2019/10',
          title: '华为CBG IT-IPD-DevopsToolService',
          content: '该项目是华为消费者BG业务应用与IT装备部辅助华为云龙平台的工具链。后台选型采用Spring-boot、Spring-cloud微服务。后端微服务分为资产管理、项目管理、权限日志、zuul网关、管理者看板、CICD、SDKCommon等，资产管理主要是对CBG部门基本资产的管理，如人员、组织、产品、应用、微服务。项目管理是对整个项目上线排迭代计划、开发测试人员实时任务进度、工作量跟踪。权限日志主要分配权限和记录整个系统的操作日志记录。zuul网关主要是对于不同微服务之间的调用设置鉴权。管理者看板主要是给领导展示整个团队中开发的工作任务指标。CICD主要是提供测试经理和项目经理在测试环境和生产环境上发版本。SDKCommon主要放置的是系统公共的SDK。'
        },
        {
          timestamp: '2018/12',
          title: '华为CBG IT-公共技术-HCOP',
          content: 'HCOP是华为CBG公共开放平台下的子产品，作为开放平台承接上下游系统的中间通道集成平台，主要功能是上下游系统数据记录、转换、对接，集成点报错邮件告警等等，其项目分三大模块，HCIM、HCOS、HCDS。HCIM为平台集成配置前台页面，HCOS是对外暴露API接口，HCDS为定时任务调度功能。主要负责HCDS模块集成点模版java后台代码开发，HCIM模块jalor5前台页面开发，需求优化等。'
        }
      ]
    }
  }
}
</script>
