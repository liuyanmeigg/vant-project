<template>
  <div>
    <!-- load事件：
        + 初始化会触发一次load事件，用于加载第一屏的数据。
        + 如果一次请求数据条数较少，导致列表内容无法铺满当前屏幕，组件会继续触发load事件，直到内容铺满屏幕或数据全部加载完成。
        + 当组件初始化或滚动到底部时，会触发load事件并将loading自动设置为true；当数据更新完毕之后，将loading设置为false即可
        loading属性： 控制加载中的loading状态
        + 非加载中，loading为false，此时会根据列表滚动位置判断是否触发loading事件（列表内容不满一屏时会直接触发）
        + 加载中 loading为true ，表示正在发送异步请求，此时不会触发load事件
     -->

    <!-- 谁需要下拉刷新，就把谁包裹着 -->
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="successText"
      success-duration="500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem
          v-for="(art, index) in articalList"
          :key="index"
          :art="art"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticalsAPI } from '@/api';
import ArticleItem from '@/components/ArticleItem.vue';
export default {
  name: 'article-list',
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      articalList: [],
      loading: false,
      finished: false,
      timestamp: null, //下一次更新的时间戳
      error: false, //控制列表失败的显示状态
      isRefreshLoading: false, //控制下拉刷新
      successText: ''
    };
  },
  created() {},
  methods: {
    // 上拉加载
    async onLoad() {
      // 1. 异步请求更新数据
      try {
        const { data } = await getArticalsAPI({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now() //请求数据页码
          // 请求第一页的数据：当前最新的时间戳
          // 请求之后的数据：使用本次接口返回的数据中的timestamp
        });
        const { results } = data.data;
        // 2. 把请求的数据放到数组中
        // this.articalList = { ...results, ...this.articalList };这里是合并对象，不是数组
        this.articalList.push(...results);
        // console.log(this.articalList, 'list');
        // 3. 本次数据加载结束后要把加载状态设置为结束
        // loading关闭以后才能触发下一次的加载更多
        // 加载状态结束
        this.loading = false;
        // 4. 判断数据是否全部加载完成
        if (results.length) {
          // console.log(results.length, 'results.length');
          // 更新获取下一页数据的事件戳
          this.timestamp = data.data.pre_timestamp;
        } else {
          // 如果没有数据了就把finished设置为true，之后不再触发加载更多
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        this.loading = false;
      }
    },
    // 下拉刷新
    async onRefresh() {
      try {
        const { data } = await getArticalsAPI({
          channel_id: this.channel.id,
          timestamp: Date.now() //注意这里只有当前的时间戳
        });
        const { results } = data.data;
        this.articalList.unshift(...results);
        this.successText = `刷新成功,更新了${results.length}条数据`;
        this.isRefreshLoading = false;
      } catch (err) {
        this.isRefreshLoading = false;
        this.successText = '刷新失败';
      }
    }
  }
};
</script>

<style>
</style>