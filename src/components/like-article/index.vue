<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{ liked: value === 1 }"
    :loading="loading"
    @click="onLike"
  />
</template>

<script>
import { likeArticleAPI, delLikeArticleAPI } from '@/api';
export default {
  name: 'like-article',
  props: {
    art_id: {
      type: [Number, Object, String],
      required: true
    },
    value: {
      type: Number
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async onLike() {
      this.loading = true;
      try {
        // 设置一个变量
        let status = -1;
        if (this.value === 1) {
          await delLikeArticleAPI(this.art_id);
          this.$toast.success('取消点赞');
        } else {
          await likeArticleAPI(this.art_id);
          status = 1;
          this.$toast.success('点赞成功');
        }
        this.$emit('input', status);
        // this.$toast.success(status === 1 ? '点赞成功' : '取消点赞');
      } catch (err) {
        this.$toast.fail('操作失败，请稍后再试');
      }
      this.loading = false;
    }
  }
};
</script>

<style lang="less" scoped>
.liked {
  color: #e8656b;
}
</style>