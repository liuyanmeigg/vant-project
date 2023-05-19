<template>
  <van-cell
    :title="title"
    center
    :label="label"
    @click="$router.push({ path: '/comment', query: { id: id } })"
  >
    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
    <template #right-icon>
      <van-icon name="play-circle-o" class="play-icon" @touchstart="playFn" />
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'SongItem',
  props: ['title', 'id', 'label'],
  data() {
    return {};
  },
  methods: {
    playFn() {
      this.$router.push({
        path: '/play',
        query: {
          id: this.id
        }
      });
    }
  }
};
</script>

<style>
</style>