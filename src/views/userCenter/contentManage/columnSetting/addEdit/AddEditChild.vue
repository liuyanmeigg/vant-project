<template>
  <el-container>
    <!-- 顶部区域 -->
    <el-header>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/columnSetting">内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>栏目设置</el-breadcrumb-item>
        <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 表单区域 -->
      <el-form ref="addFormRef" :model="ChildInfo" inline label-position="top">
        <!-- 一级栏目 -->
        <el-form-item label="一级栏目" prop="fguid">
          <el-select
            v-model="ChildInfo.fguid"
            placeholder="请选择"
            @change="handleChange"
          >
            <el-option
              v-for="item in parentList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <div class="hint">
          * 目前只能在已有的一级栏目下添加子栏目，默认模板为文章列表样式。
        </div>
        <br />
        <!-- 编号 -->
        <el-form-item label="编号" prop="num">
          <el-input v-model="addForm.num" placeholder="请输入"></el-input>
        </el-form-item>
        <!-- 名称 -->
        <el-form-item label="名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入"></el-input>
        </el-form-item>
        <br />
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
  name: 'AddEditChild',
  data() {
    return {
      ChildInfo: {},
      parentList: [],
      // addForm: {
      //   fguid: '0'
      // },
      selectedValue: ''
    };
  },
  watch: {
    $router: {
      immediate: true,
      handler(value) {
        this.ChildInfo = JSON.parse(
          Base64.decode(value.currentRoute.query.info)
        );
      }
    }
  },
  computed: {
    title() {
      return this.ChildInfo.isTrusted !== undefined ? '添加' : '编辑';
    },
    addOredit() {
      return this.title === '添加' ? 'add' : 'edit';
    }
  },
  created() {
    this.getParentData();
  },
  methods: {
    // 获取一级栏目数据
    async getParentData() {
      const { data: res } = await request.get(
        '/backstage/columnSetting/firstColumn'
      );
      if (res.status !== 200) {
        return this.$message.error('获取列表失败');
      }
      this.parentList = res.data;
    },
    handleChange(selectedId) {
      this.addForm.fguid = selectedId;
    },
    submit() {
      this.$refs.addFormoRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const { data: res } = await request.post(
          `backstage/columnSetting/${this.addOredit}Child`,
          this.addForm
        );
        if (res.status !== 200) {
          return this.$message.error(`${this.title}失败`);
        }
        console.log(res);
        this.$message.success(`${this.title}成功`);
        this.$router.push('/columnSetting');
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-form {
  padding-top: 40px;
  margin-left: 40px;
}
::v-deep .el-input__inner {
  width: 300px;
  height: 34px;
}
::v-deep .el-form--inline .el-form-item {
  margin-right: 20px;
}
.hint {
  display: inline-block;
  padding-top: 53px;
  width: 300px;
  font-size: 12px;
}
</style>