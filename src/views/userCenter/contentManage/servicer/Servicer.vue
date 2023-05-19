<template>
  <el-container>
    <!-- 顶部区域 -->
    <el-header>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>服务商</el-breadcrumb-item>
      </el-breadcrumb>
      <span>
        <!-- 删除按钮 -->
        <el-button type="danger" round @click="Delete">删除</el-button>
        <!-- 添加按钮 -->
        <el-button type="primary" round @click="add">添加</el-button>
      </span>
    </el-header>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索区域 -->
      <div class="search-row">
        <el-input
          v-model="queryInfo.name"
          placeholder="搜索会员机构"
          clearable
          style="width: 230px; height: 32px"
        ></el-input>
        <span class="search">
          <!-- 搜索按钮 -->
          <el-button round>搜索</el-button>
          <!-- 全部按钮 -->
          <el-button round>全部</el-button>
        </span>
      </div>
      <!-- 表格区域 -->
      <el-table :data="tableData">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column label="栏目" prop="date"> </el-table-column>
        <el-table-column label="标题" prop="name"> </el-table-column>
        <el-table-column label="企业名称" prop="address"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link><i class="el-icon-view el-icon--left"></i>详细 </el-link>
            <el-link icon="el-icon-edit">编辑</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-container>
</template>

<script>
export default {
  name: 'Servicer',
  data() {
    return {
      queryInfo: {
        name: ''
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }
      ]
    };
  },
  created() {},
  methods: {
    // 删除
    Delete() {},
    // 添加
    add() {}
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
  margin: 15px;
  padding-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > span {
    display: flex;
  }
}
::v-deep .el-icon-view:before {
  background-color: rgba(236, 188, 4, 1);
  color: #fff;
}
::v-deep .el-link--inner {
  margin-right: 20px;
}
::v-deep .el-icon-edit:before {
  background-color: rgba(128, 196, 92, 1);
  color: #fff;
}
</style>