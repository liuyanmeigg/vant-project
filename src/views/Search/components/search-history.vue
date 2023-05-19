<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span v-show="isShow" class="allDel">全部删除</span>
      <span v-show="isShow" @click="isShow = !isShow">完成</span>
      <van-icon
        name="delete"
        @click="isShow = !isShow"
        v-show="!isShow"
      ></van-icon>
    </van-cell>
    <van-cell title="搜索历史">
      <van-icon name="close" v-show="isShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'search-history',
  props: {
    searchHistory: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  watch: {
    searchHistory: {
      immediate: true,
      handler(val) {
        console.log(val, '搜索历史组件接受的');
      }
    }
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.allDel {
  margin-right: 10px;
}
</style>