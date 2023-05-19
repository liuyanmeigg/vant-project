<template>
  <el-container>
    <el-header>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/registerDoctorManage' }"
          >注册医师</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ receiveOrgName }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ receiveMSG.doctorName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <!-- 卡片区域 -->
    <el-card>
      <el-form
        ref="editFormRef"
        :model="newReceiveMSG"
        :rules="editFormRules"
        label-width="80px"
        label-position="top"
        inline
        hide-required-asterisk
      >
        <!-- 医师姓名 -->
        <el-form-item label="医师姓名">
          <el-input v-model="newReceiveMSG.doctorName" disabled></el-input>
        </el-form-item>
        <!-- 国籍 -->
        <el-form-item label="国籍">
          <el-input v-model="type" disabled></el-input>
        </el-form-item>
        <!-- 性别 -->
        <el-form-item label="性别">
          <el-input v-model="newReceiveMSG.sex" disabled></el-input>
        </el-form-item>
        <!-- 医师级别 -->
        <el-form-item label="医师级别">
          <el-input v-model="level" disabled></el-input>
        </el-form-item>
        <!-- 执业类别 -->
        <el-form-item label="执业类别">
          <el-input v-model="newReceiveMSG.category" disabled></el-input>
        </el-form-item>
        <!-- 执业范围 -->
        <el-form-item label="执业范围">
          <el-input v-model="newReceiveMSG.scope" disabled></el-input>
        </el-form-item>
        <!-- 职业证书编码 -->
        <el-form-item label="职业证书编码">
          <el-input v-model="newReceiveMSG.code" disabled></el-input>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="用户名">
          <el-input v-model="newReceiveMSG.userName" disabled></el-input>
        </el-form-item>
        <!-- 新的密码 -->
        <el-form-item label="新的密码" prop="newPassW">
          <el-input
            v-model="newReceiveMSG.newPassW"
            placeholder="请输入8位以上的密码"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 重复密码 -->
        <el-form-item label="重复密码" prop="dbpassword">
          <el-input
            v-model="newReceiveMSG.dbpassword"
            type="password"
            placeholder="请重复输入密码"
            show-password
          ></el-input>
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
import request from '@/api/request';
import { Base64 } from 'js-base64';
export default {
  name: 'EditPassword',
  data() {
    // 密码验证

    let checkNewPassW2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.newReceiveMSG.newPassW) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      // 接受路由传递的参数
      newReceiveMSG: {
        dbpassword: '',
        newPassW: '1234567Liu'
      },
      receiveMSG: {},

      receiveOrgName: '',
      // 规则
      editFormRules: {
        newPassW: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern:
              /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,30}$/,
            message: '密码为数字，小写字母，大写字母，特殊符号 至少包含三种'
          }
        ],
        dbpassword: [{ validator: checkNewPassW2, trigger: 'blur' }]
      }
    };
  },
  computed: {
    level() {
      return this.receiveMSG.level === '1' ? '执业医师' : '执业助理医师';
    },
    type() {
      return this.receiveMSG.type === '1' ? '国外' : '国内';
    }
  },

  watch: {
    $router: {
      handler(val) {
        // console.log(val);
        this.receiveMSG = JSON.parse(
          Base64.decode(val.currentRoute.query.info)
        );
        this.newReceiveMSG = { ...this.receiveMSG, ...this.newReceiveMSG };
        // console.log(this.newReceiveMSG);
        this.receiveOrgName = JSON.parse(
          Base64.decode(val.currentRoute.query.orgName)
        );
      },
      immediate: true
    }
  },
  methods: {
    submit() {
      this.$refs.editFormRef.validate(async (valid) => {
        console.log(valid);
        if (!valid) {
          return;
        } else {
          const { data: res } = await request.post(
            'backstage/doctorManage/doctorPasswEdit',
            {
              userGuid: this.newReceiveMSG.doctorGuid,
              newPassW: this.newReceiveMSG.newPassW
            }
          );
          console.log(res);

          if (res.status !== 200) {
            return this.$message.error('修改密码失败');
          }
          this.$router.back();

          this.$message.success('修改密码成功');
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  width: 980px;
  height: 588px;
}
.el-input {
  width: 300px;
  height: 34px;
  margin-right: 35px;
}
.el-form {
  width: 700px;
  margin-top: 30px;
}
::v-deep .el-input__inner {
  background-color: #fafafa;
  height: 34px;
}
::v-deep .el-form--label-top .el-form-item__label {
  padding: 0;
}
::v-deep .el-form-item {
  margin-bottom: 15px;
}
</style>