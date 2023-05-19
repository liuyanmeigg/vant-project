<template>
  <el-container>
    <el-header>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/registerDoctorManage' }"
          >注册医师</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <!-- 卡片区域 -->
    <el-card>
      <el-form
        ref="addFormRef"
        :model="addForm"
        :rules="addFormRules"
        label-width="80px"
        label-position="top"
        inline
      >
        <el-form-item label="机构名称" prop="orgName">
          <el-input v-model="addForm.orgName"></el-input>
        </el-form-item>
        <el-form-item label="所在省市" prop="provinceName">
          <el-select
            v-model="addForm.provinceName"
            placeholder="请选择活动省市"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="item in provinceList"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人" prop="contactName">
          <el-input v-model="addForm.contactName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="addForm.contactPhone"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 返回按钮 -->
          <el-button type="info" round @click="$router.back()">返回</el-button>
          <!-- 提交按钮 -->
          <el-button type="primary" round @click="submit">提交</el-button>
        </el-form-item>
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
      // 表单数据
      addForm: {},

      // 机构数据
      provinceList: [],
      //   表单验证规则
      addFormRules: {
        orgName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: ['blur'] }
        ],
        provinceName: [
          { required: true, message: '请选择省份', trigger: 'blur' }
        ]
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
        // console.log(this.newObj);
        this.addForm = { ...this.newObj, ...this.addForm };
      },
      // 就是当值第一次绑定时，默认不会执行监听函数值为false
      immediate: true
    }
  },
  created() {
    this.getProvinceList();
  },
  methods: {
    async getProvinceList() {
      const { data: res } = await request.get('reception/dic/list/province');
      if (res.status !== 200) {
        return this.$message.error('获取省份列表失败');
      }
      this.provinceList = res.data;
      // console.log(this.provinceList);
    },
    // 提交
    submit() {
      this.$refs.addFormRef.validate(async (valid) => {
        // 验证失败
        if (!valid) {
          return;
        }
        // 验证成功：可以发起添加用户的网络请求
        const { data: res } = await request.post(
          '/backstage/doctorManage/orgAdd',
          this.addForm
        );
        if (res.status !== 200) {
          return this.$message.error('添加失败！');
        }
        this.$refs.addFormRef.resetFields();
        this.$message.success('添加成功！');
        this.$router.back();
      });
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