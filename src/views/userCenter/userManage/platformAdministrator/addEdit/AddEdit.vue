<template>
  <el-container>
    <el-header>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/platformAdministrator' }"
          >平台管理员</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <!-- 卡片区域 -->
    <el-card>
      <el-form
        ref="addFormRef"
        :model="newObj"
        :rules="addFormRules"
        label-width="80px"
        label-position="top"
        inline
      >
        <el-form-item label="管理员姓名" prop="name">
          <el-input v-model="newObj.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="newObj.phone"></el-input>
        </el-form-item>
        <el-row>
          <el-form-item label="登录名称" prop="userName">
            <el-input v-model="newObj.userName"></el-input>
          </el-form-item>
        </el-row>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="newObj.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="checkpassword">
          <el-input v-model="checkpassword" show-password></el-input>
        </el-form-item>
        <el-row>
          <!-- 返回按钮 -->
          <el-button type="info" round @click="$router.back()">返回</el-button>
          <!-- 提交按钮 -->
          <el-button type="primary" round @click="submit">提交</el-button>
        </el-row>
      </el-form>
    </el-card>
  </el-container>
</template>
  
  <script>
//机构接口
//http://localhost:8080/bmda/reception/dic/list/province
import { Base64 } from 'js-base64';
import request from '@/api/request';
export default {
  name: 'Add',
  data() {
    let checkNewPassW2 = (rule, value, callback) => {
      // if (this.checkpassword == '') {

      //   this.$refs.addFormRef.validateField('checkpassword');
      // }
      if (this.checkpassword === '') {
        callback(new Error('请再次输入密码'));
      } else if (this.checkpassword !== this.newObj.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    //  验证手机号的规则：
    let checkMobile = (rule, value, cb) => {
      // 验证手机的正则表达式
      const regMobile =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error('手机号格式不正确，请重新输入'));
    };
    return {
      newObj: {},
      checkpassword: '',
      //   选择的省市
      region: '',
      // 机构数据
      provinceList: [],
      //   表单验证规则
      addFormRules: {
        name: [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: ['blur'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          //   自定义校验规则
          {
            pattern:
              /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,30}$/,
            message: '密码为数字，小写字母，大写字母，特殊符号 至少包含三种',
            trigger: 'blur'
          }
        ],
        checkpassword: [{ validator: checkNewPassW2, trigger: 'blur' }]
      }
    };
  },
  computed: {
    // 判断是  添加页面  还是  编辑页面
    name() {
      return this.newObj.isTrusted !== undefined ? '添加' : '编辑';
    }
  },
  watch: {
    $router: {
      handler(val) {
        this.newObj = JSON.parse(Base64.decode(val.currentRoute.query.info));
      },
      // 就是当值第一次绑定时，默认不会执行监听函数值为false
      immediate: true
    }
  },
  created() {},
  methods: {
    // 提交
    submit() {
      if (this.name === '编辑') {
        this.$refs.addFormRef.validate(async (valid) => {
          console.log(valid);
          // 验证失败
          if (!valid) {
            return;
          }
          // 验证成功：可以发起添加用户的网络请求
          const { data: res } = await request.post(
            'backstage/platformManager/updateManagerUser',
            this.newObj
          );
          console.log(res);
          if (res.status !== 200) {
            return this.$message.error('修改失败！');
          }
          this.$refs.addFormRef.resetFields();
          this.$message.success('修改成功！');
          this.$router.back();
        });
      } else {
        this.$refs.addFormRef.validate(async (valid) => {
          console.log(valid);
          // 验证失败
          if (!valid) {
            return;
          }
          // 验证成功：可以发起添加用户的网络请求
          const { data: res } = await request.post(
            'backstage/platformManager/addManagerUser',
            this.newObj
          );
          console.log(res);
          if (res.status !== 200) {
            return this.$message.error('添加失败！');
          }
          this.$refs.addFormRef.resetFields();
          this.$message.success('添加成功！');
          this.$router.back();
        });
      }
    }
  }
};
</script>
  
  <style lang="less" scoped>
.el-input {
  width: 300px;
  height: 34px;
  margin-right: 35px;
}
.el-form {
  width: 700px;
  margin-top: 40px;
}
.el-select {
  width: 300px;
  height: 34px;
  margin-right: 35px;
}
</style>