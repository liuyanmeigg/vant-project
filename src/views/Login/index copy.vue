<template>
  <div class="login-container">
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 登陆表单 -->
    <!-- 表单验证：
    1. 当表单提交的时候，会自动触发表单验证
    2. 如果验证通过，会触发submit事件；如果验证失败，则不会触发submit事件 -->
    <!-- type="number" maxlength="11"  使表单更加完善-->
    <van-form @submit="onSubmit" ref="userFormRef">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        left-icon="phone"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      />
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        left-icon="lock"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <template #button>
          <van-count-down
            :time="5000"
            format="ss秒"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          >
          </van-count-down>
          <van-button
            size="small"
            native-type="button"
            type="primary"
            @click="onSendSms"
            v-else
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn">
        <van-button class="van-btn" round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI, sendSmsAPI } from '@/api/index';
export default {
  name: 'Login',
  data() {
    return {
      // 登录信息对象
      user: {
        mobile: '',
        code: ''
      },
      // 是否显示倒计时
      isCountDownShow: false,
      // 验证规则
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          {
            pattern: /1[3|5|7|8]\d{9}/,
            message: '手机号格式错误'
          }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          {
            pattern: /\d{6}/,
            message: '验证码格式错误'
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    async onSubmit() {
      //1. 获取表单数据
      // 2. 表单验证
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, //禁用背景点击
        duration: 0 //持续时间  默认为2000，为0 就是持续出现
      });
      // 对可能会出现的情况进行不同的反应结果
      try {
        // 3. 提交表单请求登录
        const res = await loginAPI(this.user);
        this.$store.commit('setUser', res.data.data);
        this.$toast.success('登录成功'); //注意：任何一个新的toast开启，就会把之前的关闭
        this.$router.push('/layout');
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('登录失败');
        } else {
          // 网络有问题可能会出现的提示
          this.$toast.fail('登录失败，请稍后再试');
        }
      }
      // 4.根据请求响应结果处理后续操作
    },
    // 监听“发送验证码” 按钮
    onSendSms() {}
    // async onSendSms() {
    //   // 1.验证手机号
    //   // 这里的validate() 不传参默认验证的是整个表单
    //   try {
    //     await this.$refs.userFormRef.validate('mobile');
    //   } catch (err) {
    //     return console.log('验证失败', err);
    //   }
    //   // 2.验证通过显示倒计时
    //   this.isCountDownShow = true;
    //   // 3.请求发送验证码
    //   try {
    //     const res = await sendSmsAPI(this.user.mobile);
    //     this.$toast('发送成功');
    //     console.log(res);
    //   } catch (err) {
    //     // 发送失败，关闭倒计时
    //     this.isCountDownShow = false;
    //     if (err.response.status === 429) {
    //       this.$toast('发送频繁，请稍后再试');
    //     } else {
    //       return console.log('发送失败', err);
    //     }
    //   }
    // }
  }
};
</script>

<style lang="less" scoped>
.van-button--primary {
  border-radius: 15px;
  background-color: #ededed;
  border: 0;
  color: #666666;
}
.van-cell {
  display: flex;
  align-items: center;
  height: 120px;
}
::v-deep .van-field__control {
  padding-left: 10px;
}
.login-btn {
  margin: 53px 32px;
  .van-btn {
    background-color: #6db3fb;
    border: 0;
  }
}
::v-deep .van-icon-arrow-left:before,
::v-deep .van-nav-bar__text {
  color: #fff;
}
</style>