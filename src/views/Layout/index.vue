<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" replace to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" replace to="/question"
        >问答</van-tabbar-item
      >
      <van-tabbar-item icon="video-o" replace to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o" replace to="/my">{{
        user ? '我的' : '未登录'
      }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Layout',
  data() {
    return {
      active: 0
    };
  },
  computed: {
    ...mapState(['user'])
  }
};
</script>

<style>
</style>