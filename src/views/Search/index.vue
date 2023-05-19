<template>
  <div class="search-containter">
    <!-- 头部搜索区域 -->
    <!-- form是为了让IOS移动端的输入法中显示搜索的按钮 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        shape="round"
        placeholder="请输入搜索关键词"
        background="#007BFF"
        @search="onSearch"
        @focus="isResultShow = false"
        @cancel="$router.back()"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>
    <!-- 联想建议 -->
    <search-suggestions
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></search-suggestions>
    <!-- 历史记录 -->
    <search-history v-else :searchHistory="searchHistory"></search-history>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue';
import SearchResult from './components/search-result.vue';
import SearchSuggestions from './components/search-suggestions.vue';
export default {
  name: 'Search',
  components: { SearchHistory, SearchResult, SearchSuggestions },
  data() {
    return {
      searchText: '',
      isResultShow: false, //控制搜素结果的显示
      searchHistory: ''
    };
  },
  methods: {
    // 按回车或者手机端的键盘”搜索“
    onSearch(val) {
      this.searchText = val;
      this.searchHistory = val;
      this.isResultShow = true;
    }
  }
};
</script>

<style lang="less" scoped>
.search-containter {
  padding-top: 108px;

  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>