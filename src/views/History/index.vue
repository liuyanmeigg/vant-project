<template>
  <div class="history">
    <!-- 导航栏 -->
    <van-nav-bar
      title="历史记录"
      fixed
      left-arrow
      @click-left="$router.back()"
    />
    <div class="history-list">
      <van-loading v-if="!list.length" class="loading" vertical
        >加载中...</van-loading
      >
      <van-cell
        v-else
        v-for="(art, index) in list"
        :key="index"
        :title="art.title"
        value="详情"
        is-link
        :to="{
          name: 'article',
          params: {
            articleId: art.art_id
          }
        }"
      >
        <div slot="label">
          <span class="name">{{ art.aut_name }}</span>
          <span class="time"> {{ art.pubdate | relativeTime }}</span>
        </div>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { getArticleHistoryAPI } from '@/api';
export default {
  name: 'history',
  data() {
    return {
      list: [],
      queryInfo: {
        page: 1,
        per_page: 10
      }
    };
  },
  created() {
    this.loadHistory();
  },
  methods: {
    async loadHistory() {
      try {
        const { data } = await getArticleHistoryAPI(this.queryInfo);
        this.list = data.data.results;
        console.log(this.list);
      } catch (err) {
        this.$toast.fail('获取历史记录失败');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.history {
  background-color: #fff;
  height: calc(100vh);
  padding-top: 92px;
  .history-list {
    .loading {
      top: 40%;
    }
    .name {
      white-space: nowrap;
    }
  }
}
</style>