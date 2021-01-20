<template>
  <div class="user-activity">
    <div class="post">
      <h3><i class="el-icon-medal"/> 熟悉<a href="https://spring.io/projects/spring-boot" target="_blank">Spring Boot</a>、<a href="https://spring.io/projects/spring-cloud" target="_blank">Spring Cloud</a>、<a href="https://baike.baidu.com/item/RESTful/4406165?fr=aladdin" target="_blank">RESTful</a>接口开发</h3>
      <h3><i class="el-icon-medal"/> 熟悉<a href="https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#reference" target="_blank">Spring Data JPA</a>、<a href="https://mybatis.org/mybatis-3/zh/index.html" target="_blank">MyBatis</a>框架</h3>
      <h3><i class="el-icon-medal"/> 熟悉<a href="https://www.mysql.com/" target="_blank">MySQL</a>、<a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a>、<a href="https://e.huawei.com/cn/products/cloud-computing-dc/gaussdb/gaussdb-oltp/gaussdb-100" target="_blank">GaussDB</a>、<a href="https://redis.io/" target="_blank">Redis</a></h3>
      <h3><i class="el-icon-medal"/> 熟悉<a href="http://maven.apache.org/" target="_blank">Maven</a>、<a href="https://git-scm.com/" target="_blank">Git</a>、<a href="https://www.jenkins.io/" target="_blank">Jenkins</a>集成</h3>
      <h3><i class="el-icon-medal"/> 了解<a href="https://cn.vuejs.org/" target="_blank">VUE</a>、<a href="https://www.docker.com/" target="_blank">Docker</a></h3>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.user-activity {
  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username{
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
