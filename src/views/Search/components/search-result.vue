<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :error.sync="error"
      error-text="加载失败，请稍后再试"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultAPI } from '@/api';
export default {
  name: 'search-result',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      error: false,
      loading: false,
      finished: false,
      refreshing: false,
      page: 1
    };
  },
  methods: {
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data: res } = await getSearchResultAPI({
          q: this.searchText,
          page: this.page
        });
        // 2.  将数据添加到数组列表中
        const result = res.data.results;
        this.list.push(...result);
        // 3. 将本次加载中的loading关闭
        this.loading = false;
        // 4. 判断是否还有数据
        if (result.length) {
          // 如果有，则请求更新下一页数据
          this.page++;
        } else {
          // 如果没有，则将加载状态finished设值true
          this.finished = true;
        }
      } catch (err) {
        this.loading = false;
        // 展示加载失败提示语
        this.error = true;
      }
    }
  }
};
</script>

<style>
</style>