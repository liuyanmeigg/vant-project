<template>
  <el-container class="columnSetting">
    <!-- 顶部区域 -->
    <el-header>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>栏目设置</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 添加按钮 -->
      <el-button type="primary" round @click="add">添加</el-button>
    </el-header>
    <el-card>
      <!-- 表格区域 -->
      <el-table
        ref="ListRef"
        :data="List"
        style="width: 100%; margin-bottom: 20px"
        max-height="550"
        row-key="guid"
        default-expand-all
        lazy
        :indent="10"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column label="序号" prop="num"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- {{ scope.row.fguid }} -->
            <span v-if="scope.row.fguid === ''">
              <!-- 编辑  -->
              <el-link
                icon="el-icon-edit"
                class="edit"
                @click="editTitle(scope.row)"
                >编辑</el-link
              >
            </span>
            <span v-else>
              <!-- 编辑  -->
              <el-link icon="el-icon-edit" class="edit" @click="edit(scope.row)"
                >编辑</el-link
              >
              <!-- 删除 -->
              <el-link icon="el-icon-delete" @click="delChild(scope.row)"
                >删除</el-link
              >
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 编辑对话框 -->
    <el-dialog
      title="编辑"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="handleDialogClosed"
    >
      <el-form ref="editformRef" :model="selectedInfo" label-width="80px">
        <el-form-item label="序号" prop="num">
          <el-input v-model="selectedInfo.num" disabled></el-input>
        </el-form-item>
        <el-form-item
          label="名称"
          prop="name"
          :rules="[{ required: true, message: '名称不能为空' }]"
        >
          <el-input v-model="selectedInfo.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import { Base64 } from 'js-base64';
import request from '@/api/request';
export default {
  name: 'columnSetting',
  data() {
    return {
      List: [],
      isExpand: false,
      editDialogVisible: false,
      selectedInfo: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取栏目树形结构数据
    async getList() {
      const { data: res } = await request.get('/backstage/columnSetting/list');
      if (res.status !== 200) {
        return this.$message.error('获取列表失败');
      }
      this.List = res.data;
    },
    // 删除子栏目
    async delChild(row) {
      const confirmResult = await this.$confirm(
        `此操作将永久删除《${row.name}》的内容, 是否继续?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err);
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消删除');
      }
      const { data: res } = await request.post(
        'backstage/columnSetting/delChild',
        {
          guid: row.guid,
          fguid: row.fguid
        }
      );
      if (res.status !== 200) {
        return this.$message.error('删除失败！');
      }
      this.getList();
      this.$message.success('删除成功！');
    },
    // 添加或编辑
    edit(row) {
      const objToStr = JSON.stringify(row);
      this.$router.push({
        path: '/editChild',
        query: {
          info: Base64.encode(objToStr)
        }
      });
    },
    add() {
      this.$router.push('/addChild');
    },
    // 标题名称修改
    editTitle(row) {
      this.selectedInfo = row;
      this.editDialogVisible = true;
    },
    // 监听对话框的关闭
    handleDialogClosed() {
      this.$refs.editformRef.resetFields();
    },
    // 监听修改对话框的提交事件
    submitEdit() {
      this.$refs.editformRef.validate((valid) => {
        if (!valid) {
          return;
        }
        // 发起axios请求
      });
    }
  }
};
</script>

<style lang="less" scoped>
::v-deep .el-icon-edit:before {
  background-color: rgb(207, 228, 144);
  color: #fff;
}
::v-deep .el-icon-delete:before {
  background-color: rgb(222, 29, 74);
  color: #fff;
}
.edit {
  margin-right: 8px;
}
</style>