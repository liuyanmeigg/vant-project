<template>
  <div>
    <!-- 登录样式排版 -->
    <div class="header user-login" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image fit="cover" class="avatar" round :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round @click="$router.push('/userprofile')"
            >编辑资料</van-button
          >
        </div>
      </div>
      <div class="data-info">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div
          class="data-item"
          @click="$router.push({ path: '/fans', query: { type: 0 } })"
        >
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div
          class="data-item"
          @click="$router.push({ path: '/fans', query: { type: 1 } })"
        >
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录样式排版 -->
    <div class="header no-login" v-else>
      <div class="login-wrap" @click="$router.push('/login')">
        <img class="login-logo" src="@/assets/手机.svg" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 宫格导航 1-->
    <!-- 基础写法：但是这种闭合的没有办法直接随图标和文字的样式进行调节 -->
    <!-- <van-grid-item icon="photo-o" text="文字"></van-grid-item> -->
    <van-grid clickable :column-num="2" class="grid-wrap">
      <van-grid-item class="grid-item">
        <van-icon name="star-o" slot="icon" class="grid-icon" color="#EB5254" />
        <span slot="text" class="grid-item-text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <van-icon
          name="underway-o"
          slot="icon"
          class="grid-icon"
          color="#FF9D1F"
        />
        <span
          slot="text"
          class="grid-item-text"
          @click="$router.push('/history')"
          >历史</span
        >
      </van-grid-item>
    </van-grid>
    <!-- 宫格导航2 -->
    <!-- clickable 添加点击的动画，is-link因为是链接自带点击时的反应 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell
      v-if="user"
      title="退出登录"
      clickable
      class="outLogin"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getUserInfoAPI } from '@/api';
// import { Base64 } from 'js-base64';
export default {
  name: 'My',
  data() {
    return {
      userInfo: {}
    };
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    // 如果用户登录了，才请求加载用户数据
    if (this.user) {
      this.loadUserInfo();
    }
  },
  methods: {
    async loadUserInfo() {
      // 方法一：
      // const res = await getUserInfoAPI();
      // if (res.status !== 200) {
      //   return this.$toast.fail('获取数据失败，请稍后重试');
      // }
      // this.userInfo = res.data.data;
      // console.log(this.userInfo);

      // 方法二：
      try {
        const { data } = await getUserInfoAPI();
        this.userInfo = data.data;
      } catch (err) {
        this.$toast.fail('获取数据失败，请稍后重试');
      }
    },
    onLogout() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认退出吗？'
        })
        .then(() => {
          // 确认删除：清除登录状态(容器中的user和本地存储中的user)
          // 注意：这里把传参数 null，就已经把本地存储的user页一块清除了，所以不需要用removeItem方法了
          this.$store.commit('setUser', null);
        })
        .catch((err) => {
          // 这里的err的值就是'cancel'
          console.log(err); //cancel
        });
    }
    // 编辑按钮
    // onEdit() {
    //   let Obj = Base64.encode(JSON.stringify(this.userInfo));
    //   this.$router.push({
    //     path: '/userprofile',
    //     query: {
    //       userInfo: Obj
    //     }
    //   });
    // }
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 361px;
  background-color: #479ffa;
}
.no-login {
  display: flex;
  justify-content: center;
  align-items: center;
  .login-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .login-logo {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
}
.user-login {
  .base-info {
    height: 231px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 76px 32px 23px;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
        margin-right: 23px;
      }
      .name {
        font-size: 30px;
        color: #fff;
      }
    }
  }
  .data-info {
    display: flex;
    .data-item {
      height: 130px;
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
}
.grid-wrap {
  margin-bottom: 10px;
  .grid-item {
    height: 141px;
    .grid-icon {
      font-size: 45px;
    }
    .grid-item-text {
      font-size: 28px;
    }
  }
}

.outLogin {
  margin-top: 10px;
  text-align: center;
  color: #d16980;
}
</style>