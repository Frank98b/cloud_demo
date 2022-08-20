import request from '@/utils/request'

//首页推荐歌单数据
export const recommendMusic = params => request({
    url: '/personalized',
    params//可能传入的值
})

//推荐最新音乐
export const newMusic = params => request({
    url: '/personalized/newsong',
    params
})