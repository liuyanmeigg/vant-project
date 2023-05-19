<template>
  <div class="fans">
    <van-nav-bar title="关注/粉丝" left-arrow @click-left="$router.back()" />
    <van-tabs v-model="active" @change="changeActive">
      <van-tab title="我的关注">
        <List :list="list" />
      </van-tab>
      <van-tab title="我的粉丝">
        <List :list="list" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import List from './components/list.vue';
import { getUserAttention, getUserFans } from '@/api/user';
export default {
  name: 'fans',
  components: {
    List
  },
  data() {
    return {
      active: this.$route.query.type == 0 ? 0 : 1,
      list: []
    };
  },
  watch: {
    active: {
      handler(newIndex) {
        this.getInfo(newIndex);
      },
      immediate: true
    }
  },
  methods: {
    // 点击切换
    changeActive(index) {
      this.getInfo(index);
    },
    // 更新list数据
    async getInfo(index) {
      this.list = [];
      if (index == 0) {
        let data = await getUserAttention();
        this.list = data.data.data.results;
      } else {
        let data2 = await getUserFans();
        console.log(data2);
        this.list = data2.data.data.results;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.fans {
  background-color: #fff;
  .van-tab__pane {
    height: 89vh;
  }
}
</style>