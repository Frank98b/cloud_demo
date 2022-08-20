<template>
  <div class="main">
    <!-- 导航 -->
    <van-nav-bar fixed :title="activeTitle"/>
    <router-view></router-view>
    <!-- 页底导航 -->
    <van-tabbar route>
      <van-tabbar-item replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/layout/search" icon="search">搜索</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTitle: this.$route.meta.title,
    }
  },
  watch: {
    $route() {
    this.activeTitle = this.$route.meta.title
    }
  }
}
</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>