<template>
  <div>
    <van-nav-bar
      :title="activeTitle"
      fixed
      right-text="退出"
      @click-right="$router.push('/login')"
    />
    <div class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <van-tabbar route @change="onChange">
      <van-tabbar-item replace to="/layout/home" name="首页" icon="home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/layout/search" name="搜索" icon="search"
        >搜索</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      activeTitle: this.$route.meta.title //导航标题，拿到当前路由所在信息对象里meta里的title使用
    };
  },
  //   获取名字的方法二(就不用定义name属性和监听事件了)
  //   监听路由的改变
  //   watch: {
  //     $route() {
  //       this.activeTitle = this.$route.meta.title;
  //     }
  //   },
  methods: {
    // 这里的形参，如果上面没有定义标签名（name属性），就会是选中的索引值
    // 当前选中标签的名称或索引值； 因为上面定义了name属性所以这里是标签名
    onChange(name) {
      this.activeTitle = name;
    }
  }
};
</script>

<style scoped>
.main {
  padding: 46px 0 50px 0;
}
</style>