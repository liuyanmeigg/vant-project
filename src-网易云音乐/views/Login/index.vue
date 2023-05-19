<template>
  <div>
    <van-form @submit="onSubmit" ref="loginFormRef">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[
          { required: true, message: '请填写用户名' },
          { pattern: Userpattern, message: '请输入正确内容' }
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import request from '@/utils/request';
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      Userpattern: /\d{4}/
    };
  },
  methods: {
    async onSubmit(val) {
      console.log(val);
      //   const res = await request('/register/anonimous');
      //   console.log(res);
      this.$router.push('/layout/home');
    }
  }
};
</script>

<style>
</style>