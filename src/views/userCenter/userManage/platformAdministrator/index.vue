<template>
  <el-container>
    <!-- 顶部区域 -->
    <el-header>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/platformAdministrator' }"
          >平台管理员</el-breadcrumb-item
        >
      </el-breadcrumb>
      <span>
        <!-- 删除按钮 -->
        <el-button
          type="danger"
          round
          size="mini"
          @click="operationUser(operation[0])"
          >{{ operation[0] }}</el-button
        >
        <!-- 禁用 -->
        <el-button
          type="warning"
          round
          size="mini"
          @click="operationUser(operation[1])"
          >{{ operation[1] }}</el-button
        >
        <!-- 启用 -->
        <el-button
          type="success"
          round
          size="mini"
          @click="operationUser(operation[2])"
          >{{ operation[2] }}</el-button
        >
        <!-- 添加按钮 -->
        <el-button type="primary" round size="mini" @click="edit"
          >添加</el-button
        >
      </span>
    </el-header>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索区域 -->
      <div class="search-row">
        <el-form inline>
          <!-- 是否禁用 -->
          <el-form-item>
            <el-select v-model="queryInfo.state" placeholder="可登录">
              <el-option label="可登录" value="Y"></el-option>
              <el-option label="禁用" value="N"></el-option>
            </el-select>
          </el-form-item>
          <!-- 搜索 -->
          <el-form-item>
            <el-input
              v-model="queryInfo.name"
              placeholder="搜索管理员姓名或登录名"
            ></el-input>
          </el-form-item>
        </el-form>
        <span class="search">
          <!-- 搜索按钮 -->
          <el-button round @click="getmanagerUserList()">搜索</el-button>
          <!-- 全部按钮 -->
          <el-button round @click="clearSearch">全部</el-button>
        </span>
      </div>
      <!-- 表格区域 -->
      <el-table
        stripe
        ref="UserFormRef"
        :data="managerUserList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话"> </el-table-column>
        <el-table-column prop="userName" label="登录名"> </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            {{ scope.row.state === 'Y' ? '正常' : '禁用' }}
          </template>
        </el-table-column>
        <el-table-column prop="lastLoginTime" label="最后登录时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link icon="el-icon-edit" @click="edit(scope.row)">编辑</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.page"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="queryInfo.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-container>
</template>

<script>
import { Base64 } from 'js-base64';
import request from '@/api/request';
export default {
  name: 'platformAdministrator',
  data() {
    return {
      managerUserList: [],
      // 选中的用户ID数组
      selectedIds: [],
      // 查询参数
      queryInfo: {
        name: '',
        state: '',
        page: 1,
        limit: 5
      },
      // 总条数
      total: 0,
      operation: ['删除', '禁用', '启用']
    };
  },

  created() {
    this.getmanagerUserList();
  },
  methods: {
    // 获取数据列表
    async getmanagerUserList() {
      const { data: res } = await request.get(
        `backstage/platformManager/managerUser`,
        { params: this.queryInfo }
      );
      if (res.status !== 200) {
        return this.$message.error('获取平台管理员列表失败');
      }
      this.managerUserList = res.data.data;
      this.total = res.data.count;
    },
    // 点击  全部 按钮
    clearSearch() {
      this.queryInfo.name = '';
      this.queryInfo.state = '';
      this.getmanagerUserList();
    },
    // 监听勾选的状态变化
    handleSelectionChange(val) {
      this.selectedIds = [];
      val.forEach((item) => {
        this.selectedIds.push(item.userGuid);
      });
    },

    // 添加用户
    edit(userInfo) {
      const objToStr = JSON.stringify(userInfo);
      this.$router.push({
        path: '/addEdit',
        query: {
          info: Base64.encode(objToStr)
        }
      });
    },

    opt(val) {
      if (val === '删除') {
        return 'D';
      }
      if (val === '禁用') {
        return 'N';
      } else {
        return 'Y';
      }
    },

    // 删除
    async operationUser(opt) {
      if (this.selectedIds.length === 0) {
        this.$message({
          message: '未选中内容，请选中后执行操作',
          type: 'warning'
        });
        return;
      }
      const confirmResult = await this.$confirm(
        `此操作将${opt}选中用户, 是否继续?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err);
      if (confirmResult !== 'confirm') {
        return this.$message.info(`已取消${opt}`);
      }
      console.log(this.opt(opt));
      const { data: res } = await request.post(
        `backstage/platformManager/editUserState`,
        {
          userGuid: this.selectedIds,
          state: this.opt(opt)
        }
      );

      console.log(res);
      this.$message.success(`已成功${opt}`);
      this.getmanagerUserList();
    },
    handleSizeChange(val) {
      this.queryInfo.limit = val;
      this.getmanagerUserList();
    },
    handleCurrentChange(val) {
      this.queryInfo.page = val;
      this.getmanagerUserList();
    }
  }
};
</script>

<style lang="less" scoped>
.el-form {
  margin-top: 15px;
}
.search-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
::v-deep .el-input__inner {
  background-color: #fafafa;
}
.el-input,
.el-select {
  width: 220px;
  height: 32px;
}
i {
  font-style: normal;
}
::v-deep .el-icon-edit:before {
  background-color: rgba(124, 196, 92, 1);
  color: #fff;
}
</style>