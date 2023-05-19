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
          <el-button round @click="getList()">搜索</el-button>
          <!-- 全部按钮 -->
          <el-button round @click="SearchAll">全部</el-button>
        </span>
      </div>
      <!-- 表格区域 -->
      <el-table
        ref="multipleTable"
        :data="memberList"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        @selection-change="selectionChange"
        height="510px"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="memberName" label="企业名称" width="270">
        </el-table-column>
        <el-table-column prop="memberSkype" label="官网链接" width="300">
        </el-table-column>
        <el-table-column prop="blogrollImg" label="LoGo">
          <template slot-scope="scope">
            <el-image :src="scope.row.memberImg" style="height: 60px">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link @click="detailInfo(scope.row.memberSkype)"
              ><i class="el-icon-view el-icon--left"></i>详细
            </el-link>
            <el-link icon="el-icon-edit" @click="edit(scope.row)">编辑</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.page"
      :page-sizes="[3, 5, 6, 10]"
      :page-size="queryInfo.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 10px"
    >
    </el-pagination>
    <!-- 添加编辑对话框 -->
    <el-dialog
      :title="addForm.isTrusted !== undefined ? '添加' : '编辑'"
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
        <el-form-item label="企业名称" prop="memberName">
          <el-input
            v-model="addForm.memberName"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="memberImg">
          <el-image :src="addForm.memberImg" style="height: 90px">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" style="font-size: 40px"></i>
            </div>
          </el-image>
          <el-upload
            action=""
            list-type="picture"
            :auto-upload="false"
            ref="uploadRef"
            :on-change="onChange"
            :show-file-list="false"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="跳转链接" prop="memberSkype">
          <el-input
            v-model="addForm.memberSkype"
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
      if (this.addForm.memberImg === '') {
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
      memberList: [],
      memberGuids: [],
      selectedNames: [],
      dialogVisible: false,
      //   选中的机构的信息
      addForm: {
        memberSkype: '',
        memberImg: '',
        memberName: '',
        memberGuid: '',
        memberLogo: '',
        memberIntroduction: '',
        file: ''
      },
      addFormRules: {
        memberName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        memberSkype: [
          { required: true, message: '请输入链接地址', trigger: 'blur' }
        ],
        memberImg: [{ validator: checkImg, trigger: 'blur' }]
      }
    };
  },
  computed: {},
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const { data: res } = await request.get(
        'backstage/enterpriseMember/list',
        {
          params: this.queryInfo
        }
      );
      if (res.status !== 200) {
        return console.log('获取数据失败 ');
      }
      this.memberList = res.data.data;
      this.total = res.data.count;
    },
    //    点击全部
    SearchAll() {
      this.queryInfo.orgName = '';
      this.getList();
    },
    // 监听选择框
    selectionChange(obj) {
      this.selectedNames = [];
      this.memberGuids = [];
      obj.forEach((item) => {
        this.memberGuids.push(item.memberGuid);
        this.selectedNames.push(item.memberName);
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
        memberSkype: '',
        memberImg: '',
        memberName: '',
        memberGuid: '',
        memberLogo: '',
        file: ''
      };
      this.dialogVisible = true;
    },
    // 删除
    async handleDelete() {
      if (this.memberGuids.length < 1) {
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
      const { data: res } = await request.post(
        'backstage/enterpriseMember/delMember',
        {
          memberGuids: this.memberGuids
        }
      );
      if (res.status !== 200) {
        return this.$message.error('删除失败');
      }
      this.getList();
      this.$message.success('删除成功');
    },
    // 监听对话框的关闭
    handleClosed() {
      this.$refs.addFormRef.resetFields();
      this.$refs.uploadRef.clearFiles();
      this.addForm = {
        memberSkype: '',
        memberImg: '',
        memberName: '',
        memberGuid: '',
        memberLogo: '',
        file: ''
      };
    },

    onChange(file) {
      this.addForm.file = file.raw;
      this.addForm.memberImg = file.url;
    },
    // 提交对话框
    submitEdit() {
      this.$refs.addFormRef.validate(async (valid) => {
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
        let info = this.addForm.memberGuid !== undefined ? '编辑' : '添加';
        const { data: res } = await request({
          method: 'post',
          url:
            this.addForm.memberGuid !== ''
              ? '/backstage/enterpriseMember/editMember'
              : '/backstage/enterpriseMember/addMember',
          data: this.addForm,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (res.status !== 200) {
          return this.$message.error(info + '失败！');
        }
        loading.close();
        this.$message.success(info + '成功！');
        this.dialogVisible = false;
        this.getList();
      });
    },
    // 监听每页条数的变化
    handleSizeChange(val) {
      this.queryInfo.limit = val;
      this.getList();
    },
    // 监听当前页码的变化
    handleCurrentChange(val) {
      this.queryInfo.page = val;
      this.getList();
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
  margin: 15px;
  padding-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn {
  display: flex;
}
.el-link {
  margin-left: 5px;
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
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 80px;
}
</style>