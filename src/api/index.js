import { login, sendSms, getUserInfo, getUserChannels, addFollow, deleteFollow, getUserProfile, updateUserProfile, updateUserAvatar } from '@/api/user'
import { getArticals, articleDislike, getArticleById, likeArticle, delLikeArticle, collectedArt, delCollectedArt, getArticleHistory } from '@/api/article'
import { getAllChannels, addUserChannels, deleteUserChannels } from '@/api/channel'
import { getSearchSuggestions, getSearchResult } from '@/api/search'
import { getCommentList, commentLiked, delCommentLiked, addComment } from '@/api/comment'
// 用户登录
export const loginAPI = login
// 发送验证码
export const sendSmsAPI = sendSms
// 获取用户信息
export const getUserInfoAPI = getUserInfo
// 获取用户频道列表
export const getUserChannelsAPI = getUserChannels
// 获取文章列表
export const getArticalsAPI = getArticals
// 获取所有频道列表
export const getAllChannelsAPI = getAllChannels
// 添加用户频道
export const addUserChannelsAPI = addUserChannels
// 删除用户频道
export const deleteUserChannelsAPI = deleteUserChannels
// 获取搜索建议-联想菜单
export const getSearchSuggestionsAPI = getSearchSuggestions
// 搜索_结果列表
export const getSearchResultAPI = getSearchResult
// 文章_不感兴趣
export const articleDislikeAPI = articleDislike
//获取新闻文章详情
export const getArticleByIdAPI = getArticleById
//关注用户
export const addFollowAPI = addFollow
// 文章 - 取消关注作者
export const deleteFollowAPI = deleteFollow
// 文章 - 喜欢
export const likeArticleAPI = likeArticle
// 文章 - 取消喜欢
export const delLikeArticleAPI = delLikeArticle
// 文章-收藏
export const collectedArtAPI = collectedArt
// 文章 - 取消收藏
export const delCollectedArtAPI = delCollectedArt
//  评论 - 获取列表
export const getCommentListAPI = getCommentList
// 评论点赞
export const commentLikedAPI = commentLiked
// 评论-取消点赞
export const delCommentLikedAPI = delCommentLiked
// 评论 - 发布/回复
export const addCommentAPI = addComment
// 获取-用户个人简介
export const getUserProfileAPI = getUserProfile
// 更新-用户个人简介
export const updateUserProfileAPI = updateUserProfile
// 更新-用户头像
export const updateUserAvatarAPI = updateUserAvatar
// 获取-用户阅读历史
export const getArticleHistoryAPI = getArticleHistory
