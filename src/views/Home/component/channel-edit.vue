<template>
  <div class="channel-edit">
    <van-cell :border="false" class="cell">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        slot="right-icon"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <div class="my-grid">
      <van-grid :gutter="10">
        <van-grid-item
          class="grid-item"
          v-for="(channel, index) in myChannels"
          :key="index"
          @click="onMyChannelClick(channel.id, index)"
        >
          <!-- includes 可以判断一个数组中是否包含某一个元素，并返回true 或者false -->
          <van-icon
            v-show="isEdit && !fixedChannel.includes(channel.id)"
            slot="icon"
            name="clear"
          >
          </van-icon>
          <!-- :class的用法：
        一个对象，对象中的key表示要作用的CSS类名，对象中的value要计算出布尔值，为true则作用该类名，为false则不作用该类名
        -->
          <span
            slot="text"
            class="text"
            :class="{ active: index === active }"
            >{{ channel.name }}</span
          >
        </van-grid-item>
      </van-grid>
    </div>
    <van-cell :border="false" class="cell">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <div>
      <van-grid :gutter="10" direction="horizontal">
        <van-grid-item
          class="grid-item"
          v-for="(channel, index) in recommendChannels"
          :key="index"
          icon="plus"
          :text="channel.name"
          @click="onAddChannel(channel)"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import {
  addUserChannelsAPI,
  getAllChannelsAPI,
  getUserChannelsAPI,
  deleteUserChannelsAPI
} from '@/api';
import { mapState } from 'vuex';
import { setItem } from '@/utils/strorage';
export default {
  name: 'channel-edit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [], //所有频道
      isEdit: false, //控制编辑状态的显示
      fixedChannel: [0] //固定频道，不允许删除
    };
  },
  created() {
    this.getAllChannels();
  },
  // 计算属性会观测内部数据依赖数据的变化
  // 如果依赖的数据发生变化，则计算属性会重新执行
  computed: {
    // 计算推荐频道
    recommendChannels() {
      // 方法二：
      return this.allChannels.filter((channel) => {
        return !this.myChannels.find((myChannel) => {
          return myChannel.id === channel.id;
        });
      });
      // 方法一：
      //   console.log(res);
      //   const Channels = [];
      //   this.allChannels.forEach((channel) => {
      //     // find遍历数组，找到满足条件的元素项
      //     const result = this.myChannels.find((myChannel) => {
      //       return myChannel.id === channel.id;
      //     });
      //     // 如果我的频道不包括该频道项，则收集到推荐频道中
      //     if (!result) {
      //       Channels.push(channel);
      //     }
      //     console.log(Channels);
      //   });
      //   return Channels;
    },
    // 用来判断是否登录
    ...mapState(['user'])
  },
  methods: {
    // 获取所有频道
    async getAllChannels() {
      try {
        const { data: res } = await getAllChannelsAPI();
        this.allChannels = res.data.channels;
      } catch (err) {
        console.log(err);
      }
    },
    // 点击推荐子频道
    async onAddChannel(channel) {
      this.myChannels.push(channel); //计算属性会重新执行，把数据重新计算，所以这里不用移除，计算属性会帮助自动移除
      // 数据持久化处理
      if (this.user) {
        try {
          const res = await addUserChannelsAPI({
            channels: this.myChannels,
            id: channel.id, //频道ID
            seq: this.myChannels.length //序号
          });
          console.log('res', res);
        } catch (err) {
          this.$toast('保存失败，稍后再试');
        }
      } else {
        // 未登录存储本地
        setItem('TOUTIAO_CHANNELS', this.myChannels);
      }
    },
    // 点击我的子频道
    onMyChannelClick(id, index) {
      // 编辑状态，执行删除频道
      if (this.isEdit) {
        // 如果是固定频道，则不删除
        if (this.fixedChannel.includes(id)) {
          return;
        }
        // ????????????????
        this.myChannels.splice(index, 1);
        if (this.active >= index) {
          this.$emit('update-active', this.active - 1, true);
        }
        // 处理数据持久化
        this.deleteChannel(id);
      } else {
        // 非编辑状态，执行切换频道，因为频道的切换时根据索引设置的
        // 因为prop传过来的数据，不能修改，所以可以再传给父组件进行修改
        this.$emit('update-active', index, false);
      }
    },
    // 封装删除频道方法
    async deleteChannel(id) {
      try {
        if (this.user) {
          const res = await deleteUserChannelsAPI(id);
          console.log(res);
        } else {
          setItem('TOUTIAO_CHANNELS', this.myChannels);
        }
      } catch (err) {
        this.$toast('删除失败，稍后再试');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .cell {
    margin: 20px 0;
  }
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      white-space: nowrap;
      .van-grid-item__text {
        margin-left: 3px;
        margin-top: 0;
      }
      .van-grid-item__text,
      .text,
      .van-icon-plus {
        font-size: 28px;
        color: #222;
      }
      .active {
        color: red;
      }
    }
  }
}
// 设置“我的频道”的关闭图标
/deep/ .my-grid {
  .grid-item {
    .van-icon-clear {
      position: absolute;
      top: -36px;
      right: -90px;
      font-size: 30px;
      z-index: 2;
    }
  }
}
</style>