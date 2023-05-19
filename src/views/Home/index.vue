<template>
  <div class="home-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar fixed>
      <img slot="left" src="@/assets/toutiao_logo.png" class="logo" />
      <van-button
        class="search-btn"
        slot="right"
        type="info"
        icon="search"
        size="small"
        round
        @click="$router.push('/search')"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 标签页导航 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
        :title="channel.name"
        v-for="channel in channelsList"
        :key="channel.id"
      >
        <articalList :channel="channel"></articalList>
      </van-tab>
      <!-- 面包图标 -->
      <!-- 插槽可以有多个 -->
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="show = true">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="show"
      round
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channelEdit
        :myChannels="channelsList"
        :active="active"
        @update-active="updateActive"
      ></channelEdit>
    </van-popup>
  </div>
</template>

<script>
import channelEdit from './component/channel-edit.vue';
import articalList from './component/article-list.vue';
import { getUserChannelsAPI } from '@/api';
import { mapState } from 'vuex';
import { getItem } from '@/utils/strorage';
export default {
  name: 'Home',
  components: { articalList, channelEdit },
  data() {
    return {
      active: 0,
      channelsList: [], //频道列表
      show: false //控制频道的打开与关闭
    };
  },
  created() {
    // 获取频道列表
    this.getChannelsList();
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    window.home = this;
  },
  methods: {
    // 获取频道列表
    async getChannelsList() {
      try {
        let channels = [];
        if (this.user) {
          // 已登录，请求获取用户频道列表
          const { data: res } = await getUserChannelsAPI();
          channels = res.data.channels;
        } else {
          // 未登录，判断是否有本地的频道列表数据
          const localChannels = getItem('TOUTIAO_CHANNELS');
          // 有，就直接使用
          if (localChannels) {
            channels = localChannels;
          } else {
            // 没有，就请求默认用户频道列表
            const { data: res } = await getUserChannelsAPI();
            channels = res.data.channels;
          }
        }
        this.channelsList = channels;
      } catch (err) {
        this.$toast('获取频道数据列表失败');
      }
    },

    // 更新活动频道索引
    updateActive(index, isShow) {
      this.active = index;
      this.show = isShow;
    }
  }
};
</script>

<style lang="less" scoped>
.home-container {
  margin-bottom: 100px;
  padding-top: 174px;
}

.logo {
  width: 200px;
  height: 60px;
}
.van-icon {
  color: #fff;
  font-size: 32px;
}
::v-deep .van-nav-bar__title {
  max-width: unset; //不设置最大宽度
}
.search-btn {
  width: 350px;
  height: 64px;
  background-color: #5caafd;
  border: none; // none  不加边框
  font-size: 28px;
}
// 标签页导航
/deep/ .channel-tabs {
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px; //这里设置高才能控制标签高度
    .van-tabs__nav--line {
      padding-bottom: 0; //默认有高度 取消可以让van-tabs__line 设置 bottom: 8px;生效
    }
  }
  // 标签
  .van-tab {
    min-width: 200px;
    // height: 82px;  //这里设置不起作用，因为外面还有父元素van-tabs__wrap
    border-right: 1px solid #edeff3;
    font-size: 30px;
    color: #777777;
  }
  // 标签激活底部条
  .van-tabs__line {
    width: 31px;
    height: 6px;
    background-color: #3296fb;
    bottom: 8px;
  }
  .van-tab--active {
    color: #333;
  }
  // 设置最后一个标签能够显示完整(放占位元素)，因为旁边的设置了固定定位所以不会占用位置
  .placeholder {
    flex-shrink: 0; //默认是1 参与剩余空间计算 0是不参与空间计算
    width: 66px; //因为父元素是flex布局，设置了子元素平分所有空间，所以如果不写flex-shrink属性没有空间参与计算就不会显示
    height: 82px;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.9;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 7px;
      width: 5px;
      height: 80%;
      background: linear-gradient(#e7e7e7, #d6d6d6);
    }
    .van-icon {
      color: #333333;
      font-size: 33px;
    }
  }
}
</style>