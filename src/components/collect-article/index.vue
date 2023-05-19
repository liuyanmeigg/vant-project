<template>
  <!-- :class="{ collected: value }" 如果value为true就作用collected这个类名，如果没false就不作用collected类名 -->
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{ collected: value }"
    :loading="loading"
    @click="onCollected"
  />
</template>

<script>
import { delCollectedArtAPI, collectedArtAPI } from '@/api';
export default {
  name: 'collect-article',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    art_id: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    };
  },

  methods: {
    async onCollected() {
      this.loading = true;
      try {
        if (this.value) {
          // 如果喜欢，取消喜欢
          await delCollectedArtAPI(this.art_id);
          this.$toast('取消收藏');
        } else {
          // 如果是不喜欢，添加喜欢
          await collectedArtAPI(this.art_id);
          this.$toast.success('收藏成功');
        }
        this.$emit('input', !this.value);
      } catch (err) {
        this.$toast.fail('收藏失败，请稍后重试');
      }
      this.loading = false;
    }
  }
};
</script>

<style lang="less" scoped>
.collected {
  color: #ffa500;
}
</style>