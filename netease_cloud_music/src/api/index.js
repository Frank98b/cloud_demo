import { recommendMusic,newMusic } from './Home'
import { hotMusic,hotSearch } from './Search'
import { getLyById,getSongById } from '@/api/Play'
export const recommendMusicAPI = recommendMusic//请求推荐歌单导出
export const newMusicAPI = newMusic//最新音乐导出

export const hotMusicAPI = hotMusic//热搜推荐
export const hotSearchAPI = hotSearch//搜索热门推荐

export const getSongByIdAPI = getSongById
export const getLyByIdAPI = getLyById