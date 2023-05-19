// 统一出口
import { recommendMusic, hotMusic } from "@/api/Home";
import { topSearch, searchSongs } from "@/api/Search";
import { getSongById, getLyricById } from './Play'
import { getComments } from "./Comments";
// 把网络请求方法拿过来导出
// 推荐歌单
export const recommendMusicAPI = recommendMusic
// 最新音乐
export const hotMusicAPI = hotMusic
// 热搜列表
export const topSearchAPI = topSearch
// 搜索多重匹配
export const searchSongsAPI = searchSongs

export const getSongByIdAPI = getSongById // 歌曲 - 播放地址
export const getLyricByIdAPI = getLyricById // 歌曲 - 歌词数据
export const getcommentsAPI = getComments //获取歌曲评论