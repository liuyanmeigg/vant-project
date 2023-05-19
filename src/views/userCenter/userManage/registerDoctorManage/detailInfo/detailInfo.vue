<template>
  <el-container>
    <el-header>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/registerDoctorManage' }"
          >注册医师</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ reveiveObj.orgName }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="danger" round @click="deleteObj">删除</el-button>
    </el-header>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 表单搜索分类 -->
      <div class="top_search">
        <el-form ref="form" :model="queryInfo" label-width="80px" inline>
          <!-- 国内国际 -->
          <el-form-item>
            <el-select v-model="queryInfo.type" placeholder="国际">
              <el-option label="国内" value="1"></el-option>
              <el-option label="国际" value="2"></el-option>
            </el-select>
          </el-form-item>
          <!-- 性别 -->
          <el-form-item>
            <el-select v-model="queryInfo.sex" placeholder="性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <!-- 医师级别 -->
          <el-form-item>
            <el-select v-model="queryInfo.level" placeholder="医师级别">
              <el-option label="执业医师" value="1"></el-option>
              <el-option label="执业助理医师" value="2"></el-option>
            </el-select>
          </el-form-item>
          <!-- 执业分类 -->
          <el-form-item>
            <el-select v-model="queryInfo.category" placeholder="职业分类">
              <el-option label="临床" value="1"></el-option>
              <el-option label="口腔" value="2"></el-option>
              <el-option label="公共卫生" value="3"></el-option>
              <el-option label="中医" value="4"></el-option>
            </el-select>
          </el-form-item>
          <!-- 执业范围 -->
          <el-form-item>
            <el-select v-model="queryInfo.scope" placeholder="执业范围">
              <el-option label="内科专业" value="1"></el-option>
              <el-option label="外科专业" value="2"></el-option>
              <el-option label="儿科专业" value="3"></el-option>
              <el-option label="眼耳鼻咽喉科专业" value="4"></el-option>
              <el-option label="皮肤病和性病专业" value="5"></el-option>
              <el-option label="医学影像和放射治疗专业" value="6"></el-option>
              <el-option label="医学检验" value="7"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="queryInfo.doctorName"
              :placeholder="placeholder"
              @focus="onfocus"
              @blur="onblur"
            ></el-input>
          </el-form-item>
        </el-form>
        <span class="anniu">
          <el-button round @click="getDoctorList">搜索</el-button>
          <el-button round @click="getDoctorListAll">全部</el-button>
        </span>
      </div>
      <!-- 表格区域 -->
      <el-table
        stripe
        ref="doctorFormRef"
        :data="doctorList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <!-- 医师姓名 -->
        <el-table-column prop="doctorName" label="医师姓名" width="120">
        </el-table-column>
        <!-- 国籍 -->
        <el-table-column label="国籍">
          <template slot-scope="scope">
            <i v-show="scope.row.type === '1'">国内</i>
            <i v-show="scope.row.type === '2'">国外</i>
          </template>
        </el-table-column>
        <!-- 性别 -->
        <el-table-column prop="sex" label="性别"></el-table-column>
        <!-- 医师级别 -->
        <el-table-column label="医师级别">
          <template slot-scope="scope">
            <i v-show="scope.row.level === '1'">执业医师</i>
            <i v-show="scope.row.level === '2'">执业助理医师</i>
          </template>
        </el-table-column>
        <!-- 职业类别 -->
        <el-table-column prop="category" label="职业类别"> </el-table-column>
        <!-- 职业范围 -->
        <el-table-column prop="scope" label="职业范围"> </el-table-column>
        <!-- 证书编码 -->
        <el-table-column prop="code" label="证书编码" width="190">
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <label for="edit">
              <img src="@/assets/css/图标 1.svg" class="editImg"
            /></label>
            <el-link @click="edit(scope.row)" id="edit">编辑</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-container>
</template>

<script>
import { Base64 } from 'js-base64';
import request from '@/api/request';
export default {
  name: 'detailInfo',
  data() {
    return {
      // 选中的ID数组
      doctorGuids: [],
      reveiveObj: {},
      doctorList: [],
      // 查询参数
      queryInfo: {
        page: 1,
        limit: 7,
        //执业医师姓名
        doctorName: '',
        //国内国际
        type: '',
        sex: '',
        //医师级别
        level: '',
        //执业范围
        scope: '',
        //执业医师编码
        code: '',
        orgGuid: ''
      },
      placeholder: '搜索医师姓名'
    };
  },
  watch: {
    $router: {
      handler(val) {
        this.reveiveObj = JSON.parse(
          Base64.decode(val.currentRoute.query.info)
        );
        if (this.reveiveObj) {
          this.queryInfo.orgGuid = this.reveiveObj.orgGuid;
          this.$route.meta.title = `${this.reveiveObj.orgName}`;
        }
      },
      immediate: true
    }
  },
  created() {
    this.getDoctorList();
  },
  methods: {
    async getDoctorList() {
      const { data: res } = await request.get(
        `/backstage/doctorManage/doctorList`,
        {
          params: this.queryInfo
        }
      );
      if (res.status !== 200) {
        return this.$message.error('获取数据失败');
      }
      this.doctorList = res.data.data;
      // console.log(this.doctorList);
    },
    handleSelectionChange(selection) {
      this.doctorGuids = [];
      selection.forEach((item) => {
        this.doctorGuids.push(item.doctorGuid);
      });
    },
    edit(row) {
      const objToStr = JSON.stringify(row);
      const orgNameStr = JSON.stringify(this.reveiveObj.orgName);
      this.$router.push({
        path: '/editPassword',
        query: {
          info: Base64.encode(objToStr),
          orgName: Base64.encode(orgNameStr)
        }
      });
    },
    //  获取焦点
    onfocus() {
      this.placeholder = '';
    },
    // 失去焦点
    onblur() {
      this.placeholder = '搜索医师姓名';
    },
    getDoctorListAll() {
      this.queryInfo.doctorName = '';
      this.queryInfo.type = '';
      this.queryInfo.sex = '';
      this.queryInfo.category = '';
      this.queryInfo.level = '';
      this.getDoctorList();
    },
    // 删除
    async deleteObj() {
      if (this.doctorGuids.length === 0) {
        this.$message({
          showClose: true,
          message: '未选中内容，请选中后执行操作',
          type: 'warning'
        });
        return;
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
        '/backstage/doctorManage/doctorDel',
        { userGuids: this.doctorGuids }
      );
      if (res.status !== 200) {
        return this.$message.error('删除失败！');
      }
      this.getDoctorList();
      this.$message.success('删除成功！');
      console.log(res);
    }
  }
};
</script>

<style lang="less" scoped>
.top_search {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  border-bottom: 1px solid #dddddd;
}
.el-form {
  width: 690px;
}
.el-form-item {
  margin-right: 15px;
}

.el-option {
  width: 220px;
  height: 32px;
}
i {
  font-style: normal;
}
.editImg {
  width: 10px;
  height: 10px;
  background-color: #2a82e4;
  margin-right: 5px;
  vertical-align: middle;
}
::v-deep .el-input__inner {
  width: 220px;
  height: 32px;
  background-color: #fafafa;
}
::v-deep .el-input {
  margin-bottom: 10px;
}
.anniu {
  width: 260px;
}
</style>