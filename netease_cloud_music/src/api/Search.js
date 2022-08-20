import request from '@/utils/request'

export const hotMusic = params => request({
    url: '/search/hot',
    params
})

export const hotSearch = params => request({
    url: '/cloudsearch',
    params
})