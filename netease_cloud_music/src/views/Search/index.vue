<template>
  <div>
    <van-search v-model="value" @input="search" placeholder="请输入搜索关键词" />
    <div class="search_wrap" v-if="resultList.length === 0">
      <p class="hot_title">热门搜索</p>
      <div class="hot_name_wrap">
            <span class="hot_item" v-for="(obj,index) in hotArr" :key="index" @click="fn(obj.first)">{{obj.first}}</span>
      </div>
    </div>
     <!-- 搜索结果 -->  
    <div class="search_wrap" v-else>
      <p class="hot_title">最佳匹配</p>
      <div class="hot_name_wrap">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
        <!-- <van-cell v-for="obj in resultList" :key="obj.id"
         center 
         :title="obj.name" 
         :label="obj.ar[0].name + ' - ' + obj.name">
          使用 right-icon 插槽来自定义右侧图标 
          <template #right-icon>
            <van-icon size="0.6rem" name="play-circle" />
          </template>
        </van-cell> -->
        <SongItem v-for="obj in resultList" :key="obj.id"
        :name="obj.name"
        :author="obj.ar[0].name"
        :id="obj.id"></SongItem>
        </van-list>
      </div>
    </div> 
  </div>
</template>

<script>
import {hotMusicAPI, hotSearchAPI} from '@/api'//引入热门搜索接口数据
import SongItem from '@/components/Songitem'
export default {
  data(){
    return{
      value: "",
      hotArr: [],
      resultList: [],
      loading: false,
      finished: false,
      page: '1',
      timer: 'null',
    }
  },
  async created() {//钩子函数拿到数据并赋给数组
      const res = await hotMusicAPI()
      this.hotArr = res.data.result.hots
  },  
  methods: {
    async getListFn(){
      return await hotSearchAPI({
        keywords: this.value,
        limit:20
        //async修饰函数默认返回一个新的promise对象，promise对象的结果是async函数内return的值
      })
    },
    async fn(val) {
      this.page = '1'//每次点击时都拉取第一页数据
      this.finished = false//点击新关键词可能有新数据
      this.value = val//将选中关键词显示到搜索框内
      const res = await this.getListFn()
      this.resultList = res.data.result.songs
      this.loading = false
    },
    async search(){
    this.page = '1'//每次点击时都拉取第一页数据
    if(this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(async() => {
      this.finished = false//输入框改变可能有新数据
      if(this.value.length === 0){
        this.resultList = []
        return
      }
      const res = await this.getListFn()
      if(res.data.result.songs === undefined){//如果服务器没有数据则返回一个空数组
        this.resultList = []
        return
      }
      this.resultList = res.data.result.songs
      this.loading = false      
    }, 900);
    },
    async onLoad(){//加载更多数据，加载完会将loading改为true
    this.page++
    const res = await this.getListFn()
    if(res.data.result.songs === undefined){//如果服务器没有数据了则将finished值改为true
        this.finished = true
        return
      }
    this.resultList = [...this.resultList, ...res.data.result.songs]
    this.loading = false//确保下一次还能继续加载
    },
  },
  components: {
    SongItem,
}
}
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}

.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>