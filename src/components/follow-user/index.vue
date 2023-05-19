<template>
  <van-button
    v-if="value"
    plain
    :loading="followLoading"
    icon="success"
    type="default"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    plain
    icon="plus"
    :loading="followLoading"
    type="info"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { addFollowAPI, deleteFollowAPI } from '@/api';
export default {
  name: 'follow-user',

  props: {
    value: {
      type: Boolean,
      required: true
    },
    aut_id: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      followLoading: false
    };
  },
  methods: {
    // 关注/取消关注
    async onFollow() {
      this.followLoading = true; //展示关注按钮的加载状态
      try {
        if (this.value) {
          // 已关注,取消关注
          await deleteFollowAPI(this.aut_id);
          // this.articles.is_followed=false
        } else {
          // 没有关注，添加关注
          await addFollowAPI(this.aut_id);
          // this.articles.is_followed=true
        }
        // 更新视图状态
        // this.isFollowed = !this.isFollowed;
        // this.$emit('update-isFollowed', !this.isFollowed);
        this.$emit('input', !this.value);
      } catch (err) {
        let meaasge = '操作失败，请重试';
        if (err.response && err.response.status === 400) {
          meaasge = '你不能关注你自己';
        }
        this.$toast(meaasge);
      }
      this.followLoading = false; //关闭关注按钮的加载状态
    }
  }
};
</script>

<style lang="less" scoped>
</style>