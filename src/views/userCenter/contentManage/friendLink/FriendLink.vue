<template>
  <el-container>
    <!-- 顶部区域 -->
    <el-header>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>友情链接</el-breadcrumb-item>
      </el-breadcrumb>
      <span class="btn">
        <!-- 删除按钮 -->
        <el-button type="danger" round @click="handleDelete">删除</el-button>
        <!-- 添加按钮 -->
        <el-button type="primary" round @click="handleAdd">添加</el-button>
      </span>
    </el-header>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索区域 -->
      <div class="search-row">
        <el-input
          v-model="queryInfo.orgName"
          placeholder="搜索会员机构"
          clearable
          @clear="SearchAll"
          style="width: 230px; height: 32px"
        ></el-input>
        <span class="search btn">
          <!-- 搜索按钮 -->
          <el-button round @click="getFriendLinkList()">搜索</el-button>
          <!-- 全部按钮 -->
          <el-button round @click="SearchAll">全部</el-button>
        </span>
      </div>
      <!-- 表格区域 -->
      <el-table
        ref="multipleTable"
        :data="friendLinkList"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        @selection-change="selectionChange"
        height="510px"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="blogrollName" label="机构名称" width="270">
        </el-table-column>
        <el-table-column prop="blogrollUrl" label="官网链接" width="300">
        </el-table-column>
        <el-table-column prop="blogrollImg" label="LoGo">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.blogrollImg"
              style="height: 40px"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作" style="display: flex">
          <template slot-scope="scope">
            <el-link @click="detailInfo(scope.row.blogrollUrl)"
              ><i class="el-icon-view el-icon--left"></i>详细
            </el-link>
            <el-link icon="el-icon-edit" @click="edit(scope.row)">编辑</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <div class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.page"
        :page-sizes="[3, 5, 6, 10]"
        :page-size="queryInfo.limit"
        layout="total, sizes"
        :total="total"
        style="margin-top: 10px"
      >
      </el-pagination>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.page"
        :page-sizes="[3, 5, 6, 10]"
        :page-size="queryInfo.limit"
        layout=" prev, pager, next, jumper"
        :total="total"
        style="margin-top: 10px"
      >
      </el-pagination>
    </div>
    <!-- 添加编辑对话框 -->
    <el-dialog
      :title="addForm.blogrollGuid !== undefined ? '编辑' : '添加'"
      :visible.sync="dialogVisible"
      width="60%"
      center
      @close="handleClosed"
    >
      <el-form
        ref="addFormRef"
        :rules="addFormRules"
        :model="addForm"
        label-width="80px"
        label-position="top"
      >
        <el-form-item label="机构名称" prop="blogrollName">
          <el-input
            v-model="addForm.blogrollName"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="blogrollImg">
          <el-image :src="addForm.blogrollImg" style="height: 90px">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" style="font-size: 30px"></i>
            </div>
          </el-image>
          <el-upload
            action=""
            list-type="picture"
            :auto-upload="false"
            :on-change="onChange"
            ref="uploadRef"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="跳转链接" prop="blogrollUrl">
          <el-input
            v-model="addForm.blogrollUrl"
            style="width: 400px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import request from '@/api/request';
export default {
  name: 'Friendlink',
  data() {
    let checkImg = (rule, value, callback) => {
      if (this.addForm.blogrollImg === '') {
        return callback('请上传文件');
      }
      callback();
    };
    return {
      queryInfo: {
        page: 1,
        limit: 10,
        orgName: ''
      },
      total: 0,
      friendLinkList: [],
      blogrollGuids: [],
      selectedNames: [],
      dialogVisible: false,
      //   选中的机构的信息
      addForm: {
        blogrollGuid: '',
        blogrollImg: '',
        blogrollName: '',
        blogrollNumber: '',
        blogrollUrl: '',
        file: ''
      },
      addFormRules: {
        blogrollName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        blogrollUrl: [
          { required: true, message: '请输入链接地址', trigger: 'blur' }
        ],
        blogrollImg: [{ validator: checkImg, trigger: 'blur' }]
      }
    };
  },
  computed: {},
  created() {
    this.getFriendLinkList();
  },

  methods: {
    async getFriendLinkList() {
      const { data: res } = await request.get('backstage/blogroll/list', {
        params: this.queryInfo
      });
      if (res.status !== 200) {
        return console.log('获取数据失败 ');
      }
      this.friendLinkList = res.data.data;
      this.total = res.data.count;
    },
    //    点击全部
    SearchAll() {
      this.queryInfo.orgName = '';
      this.getFriendLinkList();
    },
    // 监听选择框
    selectionChange(obj) {
      this.selectedNames = [];
      this.blogrollGuids = [];
      obj.forEach((item) => {
        this.blogrollGuids.push(item.blogrollGuid);
        this.selectedNames.push(item.blogrollName);
      });
      this.selectedNames = this.selectedNames.join(',');
    },
    // 详请
    detailInfo(url) {
      window.open(url, '_blank');
    },
    // 编辑
    edit(row) {
      this.dialogVisible = true;
      this.addForm = row;
    },
    // // 添加
    handleAdd() {
      this.addForm = {
        blogrollGuid: '',
        blogrollImg: '',
        blogrollName: '',
        blogrollNumber: '',
        blogrollUrl: '',
        file: ''
      };
      this.dialogVisible = true;
    },
    // 删除
    async handleDelete() {
      if (this.blogrollGuids.length < 1) {
        return this.$message.error('没有选中项');
      }
      const confirmResult = await this.$confirm(
        `是否删除"${this.selectedNames}"?`,
        '删除',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err);
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除');
      }
      const { data: res } = await request.post('backstage/blogroll/delOrg', {
        blogrollGuids: this.blogrollGuids
      });
      if (res.status !== 200) {
        return this.$message.error('删除失败');
      }
      this.getFriendLinkList();
      this.$message.success('删除成功');

      console.log(res);
    },
    // 监听对话框的关闭
    handleClosed() {
      this.$refs.addFormRef.resetFields();
      this.$refs.uploadRef.clearFiles();
      this.addForm = {
        blogrollGuid: '',
        blogrollImg: '',
        blogrollName: '',
        blogrollNumber: '',
        blogrollUrl: '',
        file: ''
      };
    },

    // 提交对话框
    submitEdit() {
      this.$refs.addFormRef.validate(async (valid) => {
        // console.log(valid);
        // 验证失败
        if (!valid) {
          return;
        }
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        const { data: res } = await request({
          method: 'post',
          url:
            this.addForm.blogrollGuid !== ''
              ? 'backstage/blogroll/editOrg'
              : '/backstage/blogroll/addOrg',
          data: this.addForm,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        let info = this.addForm.blogrollGuid !== undefined ? '编辑' : '添加';
        if (res.status !== 200) {
          return this.$message.error(info + '失败');
        }
        loading.close();
        this.$message.success(info + '成功');
        this.dialogVisible = false;
        this.getFriendLinkList();

        // console.log(res);
      });
    },
    // 监听每页条数的变化
    handleSizeChange(val) {
      this.queryInfo.limit = val;
      this.getFriendLinkList();
    },
    // 监听当前页码的变化
    handleCurrentChange(val) {
      this.queryInfo.page = val;
      this.getFriendLinkList();
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChange(file, list) {
      this.addForm.file = file.raw;
      this.addForm.blogrollImg = file.url;
    }
  }
};
</script>

<style lang="css" scoped>
.card {
  margin-bottom: 15px;
}
::v-deep .el-input {
  width: 220px;
  height: 32px;
}
.search-row {
  margin: 25px 0;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn {
  display: flex;
}
::v-deep .el-link--inner {
  margin-right: 15px;
}
::v-deep .el-header {
  border-bottom: 1px solid #dddddd;
}

.el-form-item__label {
  padding: 0;
}
.el-dialog__body {
  padding-top: 10px;
}
::v-deep .image-slot {
  width: 200px;
  height: 100px;
  text-align: center;
  background-color: #dddddd;
  line-height: 100px;
}
::v-deep .el-icon-edit:before {
  background-color: rgba(128, 196, 92, 1);
  color: #fff;
}
::v-deep .el-icon-view:before {
  background-color: rgba(236, 188, 4, 1);
  color: #fff;
}
.paging {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>