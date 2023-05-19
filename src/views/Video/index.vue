<template>
  <div>
    <van-loading />

    <van-badge :content="5">
      <div class="child" />
    </van-badge>
    <van-search v-model="value" placeholder="请输入搜索关键词" />
  </div>
</template>

<script>
import Vue from 'vue';
import { Loading } from 'vant';

Vue.use(Loading);
export default {
  name: 'Video',
  data() {
    return {
      value: ''
    };
  }
};
</script>

<style>
</style>