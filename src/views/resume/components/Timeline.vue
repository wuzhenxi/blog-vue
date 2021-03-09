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
          title: 'IntePDM',
          content: 'Intepdm以取代国外PTC公司的应用软件windchill为目标，其武汉天喻软件股份有限公司作为软件供应商，为国内制造型企业构建的基于统一平台的面向产品数据管理的总体解决方案。从业务、需求设计，到后台数据模型、技术架构，完全自主研发的产品数据管理系统。数据库选用是PostgreSQL，前期用过Oracle、GaussDB 100，后台选用是Spring Boot单体应用，后台容器目前正在切Docker，前台选用是VUE.js，整个项目的后台、前台工程及测试运作方式是现在主流的devops敏捷协同。'
        },
        {
          timestamp: '2019/10',
          title: 'DevopsToolService',
          content: '该项目后台选用Spring-boot、Spring-cloud微服务。其整个项目微服务有资产管理、项目管理、权限日志、zuul网关、管理者看板、CICD等，资产管理微服务是对公司部门基本资产的管理，如人员、组织、产品、应用、微服务基本信息。项目管理微服务针对公司部门所有项目每个版本运作过程中需求、缺陷实时跟踪，最小颗粒单元是每个产品下的项目组。权限日志微服务主要功能每个项目组的CMO分配权限和记录每个项目组的资产的操作日志记录。管理者看板微服务主要是通过公司的计算指标，统计部门每个产品下的项目组综合得分。CICD微服务集成公司另一个Jenkins部署系统接口，协同项目管理系统在版本运作过程中，对测试环境和生产环境的微服务应用部署。zuul网关主要是对于不同微服务之间的调用设置鉴权。'
        },
        {
          timestamp: '2018/12',
          title: 'HCOP',
          content: 'HCOP是华为CBG公共开放平台下的子产品，作为开放平台承接上下游系统的中间通道集成平台，主要功能是上下游系统数据记录、转换、对接，集成点报错邮件告警等等，其项目分三大模块，HCIM、HCOS、HCDS。HCIM为平台集成配置前台页面，HCOS是对外暴露API接口，HCDS为定时任务调度功能。主要负责HCDS模块集成点模版java后台代码开发，HCIM模块jalor5前台页面开发，需求优化等。'
        }
      ]
    }
  }
}
</script>
