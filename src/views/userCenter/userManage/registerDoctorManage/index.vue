<template>
  <el-container class="registerDoctorManage">
    <!-- 顶部区域 -->
    <el-header>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/registerDoctorManage' }"
          >注册医师</el-breadcrumb-item
        >
      </el-breadcrumb>
      <span>
        <!-- 删除按钮 -->
        <el-button type="danger" round @click="removeInfo">删除</el-button>
        <!-- 添加按钮 -->
        <el-button type="primary" round @click="add">添加</el-button>
      </span>
    </el-header>
    <!-- 卡片区域 -->
    <el-card class="card">
      <!-- 搜索区域 -->
      <div class="search-row">
        <el-input
          v-model="queryInfo.orgName"
          placeholder="搜索会员机构"
          clearable
          @clear="search"
        ></el-input>
        <span class="search">
          <!-- 搜索按钮 -->
          <el-button round @click="search">搜索</el-button>
          <!-- 全部按钮 -->
          <el-button round @click="clearSearch">全部</el-button>
        </span>
      </div>
      <!-- 表格区域 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        @selection-change="selectionChange"
        height="510px"
      >
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column prop="orgName" label="机构名称" width="220">
        </el-table-column>
        <el-table-column prop="doctorNum" label="注册人数" width="100">
        </el-table-column>
        <el-table-column prop="contactName" label="联系人"> </el-table-column>
        <el-table-column prop="contactPhone" label="联系电话" width="150">
        </el-table-column>
        <el-table-column prop="provinceName" label="省份"> </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-link @click="detailInfo(scope.row)"
              ><i class="el-icon-view el-icon--left"></i>详细
            </el-link>
            <el-link icon="el-icon-edit" @click="add(scope.row)">编辑</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.page"
      :page-sizes="[5, 7, 8, 10]"
      :page-size="queryInfo.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-container>
</template>

<script>
import { Base64 } from 'js-base64';
import { getArticalListAPI } from '@/api/getArticalAPI.js';
import request from '@/api/request';
export default {
  name: 'RegisterDoctorManage',
  data() {
    return {
      // 搜索数据
      searchInfo: '',
      tableData: [],
      // 查询参数
      queryInfo: {
        orgName: '',
        page: 1,
        limit: 5
      },
      total: 0,
      // 勾选的数组
      orgGuids: []
    };
  },
  created() {
    this.getList();
  },

  methods: {
    async getList() {
      const { data: res } = await getArticalListAPI(this.queryInfo);
      if (res.status !== 200) {
        return console.log('获取数据失败 ');
      }
      this.tableData = res.data.data;
      this.total = res.data.count;

      // console.log(this.tableData);
    },

    // 搜索
    search() {
      this.queryInfo.page = 1;
      this.getList();
    },
    clearSearch() {
      this.queryInfo.orgName = '';
      this.getList();
    },
    // 勾选
    selectionChange(selection) {
      // this.orgGuids.push(row.orgGuid);
      this.orgGuids = [];
      selection.forEach((item) => {
        this.orgGuids.push(item.orgGuid);
      });
    },
    // 监听页码的改变
    handleCurrentChange(val) {
      this.queryInfo.page = val;
      this.getList();
    },
    // 监听条数的变化
    handleSizeChange(val) {
      this.queryInfo.limit = val;
      this.getList();
    },
    // 删除
    async removeInfo() {
      if (this.orgGuids.length === 0) {
        return alert('未勾选内容，请先勾选再删除');
      }
      const confirmResult = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err);
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除');
      }
      const { data: res } = await request.post(
        '/backstage/doctorManage/orgDel',
        { orgGuids: this.orgGuids }
      );
      if (res.status !== 200) {
        return this.$message.error('删除失败！');
      }
      this.getList();
      this.$message.success('删除成功！');
    },
    // 添加
    add(params) {
      const objToStr = JSON.stringify(params);
      this.$router.push({
        path: '/add',
        query: { info: Base64.encode(objToStr) }
      });
    },
    detailInfo(params) {
      const objToStr = JSON.stringify(params);
      this.$router.push({
        path: '/detailInfo',
        query: {
          info: Base64.encode(objToStr)
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  margin-bottom: 15px;
}
::v-deep .el-input {
  width: 220px;
  height: 32px;
}
.search-row {
  margin-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-link {
  margin-left: 5px;
}
::v-deep .el-header {
  border-bottom: 1px solid #dddddd;
}
::v-deep .el-input--suffix .el-input__inner {
  background-color: #fbfafa;
  width: 220px;
  height: 32px;
}
</style>