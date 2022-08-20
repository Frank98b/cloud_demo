<template>
      <van-cell  center :title="name" :label="author + ' - ' + name">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon size="0.6rem" name="play-circle" @click="planFn"/>
      </template>
    </van-cell>
</template>

<script>
export default {
  props: {
    name: String,//歌名
    author: String,//作者
    id:Number//歌曲id
  },
  methods: {
    planFn(){
      this.$router.push({
        path: '/play',
        query: {
          id: this.id//通过路由方式将id传递给play页面
        }
      })
    }
  }
}
</script>

<style scoped>

.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>