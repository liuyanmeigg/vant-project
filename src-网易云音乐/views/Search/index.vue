<template>
  <div>
    <van-search
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      :autofocus="true"
      shape="round"
    />
    <div class="search-wrap" v-if="searchSongsList.length === 0">
      <p class="hot-title">热门搜索</p>
      <div>
        <van-tag
          round
          plain
          type="primary"
          color="#666"
          v-for="(item, index) in topSearchList"
          :key="index"
          @click="clickTag(item.first)"
          >{{ item.first }}</van-tag
        >
      </div>
    </div>

    <div class="search-result" v-if="searchSongsList.length !== 0">
      <p>最佳匹配</p>
      <SongItem
        :title="item.name"
        :label="item.ar[0].name + '' + item.name"
        v-for="item in searchSongsList"
        :key="item.id"
        :id="item.id"
      ></SongItem>
    </div>
  </div>
</template>

<script>
import { topSearchAPI, searchSongsAPI } from '@/api/index';
import SongItem from '@/components/SongItem.vue';
export default {
  name: 'Search',
  components: { SongItem },
  data() {
    return {
      searchValue: '',
      topSearchList: [], //热搜关键词
      searchSongsList: [], //搜索结果列表
      timer: null //用来保存定时器
    };
  },
  watch: {
    searchValue(val) {
      // 在这里清除定时器，防止输入框空值，还显示请求回来的数据，保证最后那次请求的定时器关闭
      clearTimeout(this.timer);
      // 输入框为空，就不需要进入定时器
      if (val.length === 0) this.searchSongsList = [];
      // 只要输入框有数据在改变，就开始启动防抖
      this.timer = setTimeout(async () => {
        const searchSong = await searchSongsAPI({
          type: 1,
          keywords: val
        });
        this.searchSongsList = searchSong.data.result.songs;
      }, 300);
    }
    // 防抖：在n秒内，最后执行一次。（函数在n秒内，再次执行，重新计时）
    // 节流：间隔n秒，执行一次
  },
  async created() {
    const topSearch = await topSearchAPI();
    this.topSearchList = topSearch.data.result.hots;
  },
  methods: {
    async clickTag(str) {
      this.searchValue = str;
      const searchSong = await searchSongsAPI({
        type: 1,
        keywords: this.searchValue
      });
      setTimeout(() => {
        clearTimeout(this.timer);
      }); //防止上面的请求再次执行
    }
  }
};
</script>

<style lang="less" scoped>
::v-deep .van-field__control {
  font-size: 14px;
}
.hot-title {
  font-size: 12px;
  color: #666;
}
.search-wrap {
  padding: 10px;
}
::v-deep .van-tag {
  margin-top: 7px;
  margin-right: 8px;
}
.search-result {
  margin-top: 15px;
  padding: 0 10px;
  > p {
    font-size: 15px;
    color: #666;
  }
}
.play-icon {
  font-size: 21px;
}
</style>