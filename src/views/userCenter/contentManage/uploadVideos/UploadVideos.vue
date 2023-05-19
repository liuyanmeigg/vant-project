<template>
  <el-container>
    <el-header>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>上传视频</el-breadcrumb-item>
      </el-breadcrumb>
      <span>
        <el-button type="danger" round>删除</el-button>
        <el-button type="warning" round>下架</el-button>
        <el-button type="success" round>发布</el-button>
        <el-button type="primary" round>添加</el-button></span
      >
    </el-header>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索区域 -->
      <div class="search-box" style="margin-top: 20px">
        <div class="form">
          <el-form :model="queryInfo" label-position="top" inline>
            <!-- 栏目 -->
            <el-form-item>
              <el-cascader
                placeholder="栏目"
                v-model="queryInfo.docCategoryName"
                :options="columnList"
                :props="{
                  expandTrigger: 'hover',
                  value: 'value',
                  label: 'label',
                  children: 'children'
                }"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
            <!-- 课程分类 -->
            <el-form-item>
              <el-cascader
                placeholder="课程分类"
                v-model="queryInfo.videoCategoryName"
                :options="categoryList"
                :props="{
                  expandTrigger: 'hover',
                  value: 'value',
                  label: 'label',
                  children: 'children'
                }"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
            <!-- 课程费用 -->
            <el-form-item>
              <el-cascader
                placeholder="课程费用"
                v-model="queryInfo.courseCost"
                :options="courseOptions"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>

            <!-- 状态 -->
            <el-form-item>
              <el-cascader
                placeholder="状态"
                v-model="queryInfo.state"
                :options="stateOptions"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
            <!-- 开始时间——结束时间 -->
            <el-form-item>
              <el-date-picker
                style="width: 224px"
                v-model="queryInfo.createDate"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <!-- 搜索课程名 -->
            <el-form-item>
              <el-form-item>
                <el-input
                  style="width: 224px"
                  v-model="queryInfo.speaker"
                  placeholder="搜索课程名称或主讲人姓名"
                ></el-input>
              </el-form-item>
            </el-form-item>
          </el-form>
        </div>
        <span>
          <el-button round @click="getUploadList()">搜索</el-button>
          <el-button round @click="searchAll">全部</el-button>
        </span>
      </div>
      <!-- 表格区域 -->
      <el-table
        ref="multipleTable"
        :data="uploadList"
        tooltip-effect="dark"
        style="width: 100%"
        stripe
        @selection-change="selectionChange"
        height="510px"
      >
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column prop="docCategoryName" label="栏目"> </el-table-column>
        <el-table-column prop="title" label="标题" width="180">
          <template slot-scope="scope">
            {{ showWords(scope.row.title) }}
          </template>
        </el-table-column>
        <el-table-column prop="speaker" label="主讲人" width="120">
        </el-table-column>
        <el-table-column prop="videoCategoryName" label="课程分类">
        </el-table-column>
        <el-table-column prop="courseCost" label="课程费用">
          <template slot-scope="scope">
            <span v-if="scope.row.state === '1'">公开</span>
            <span v-else>会员</span>
          </template>
        </el-table-column>
        <el-table-column prop="issueDate" label="发布时间" width="170">
        </el-table-column>
        <el-table-column prop="downloadNum" label="下载量" width="70">
        </el-table-column>
        <el-table-column prop="state" label="状态" width="70">
          <template slot-scope="scope">
            <span v-if="scope.row.state === '0'">待发布</span>
            <span v-else-if="scope.row.state === '1'">发布</span>
            <span v-else>下架</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="170">
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
    <div class="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.page"
        :page-sizes="[3, 5, 8, 10]"
        :page-size="queryInfo.limit"
        layout="total, sizes"
        :total="total"
      >
      </el-pagination>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.page"
        :page-sizes="[3, 5, 8, 10]"
        :page-size="queryInfo.limit"
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </el-container>
</template>

<script>
import request from '@/api/request';
export default {
  name: 'UploadVideos',
  data() {
    return {
      // 栏目下拉数据
      columnList: [],
      //   课程分类下拉数据
      categoryList: [],
      //   课程费用配置
      courseOptions: [
        {
          value: '1',
          label: '公开'
        },
        {
          value: '2',
          label: '会员'
        }
      ],
      // 状态配置
      stateOptions: [
        {
          value: '1',
          label: '发布'
        },
        {
          value: '2',
          label: '下架'
        }
      ],
      uploadList: [],
      queryInfo: {
        page: 1,
        limit: 5,
        // 栏目
        docCategoryName: '',
        // 课程分类
        videoCategoryName: '',
        // 课程费用
        courseCost: '',
        // 状态
        state: '',
        // 创建时间
        createDate: '',
        // 发布时间
        issueDate: '',
        speaker: ''
      },
      total: 0
    };
  },
  created() {
    this.getUploadList();
    this.getcolumnTree();
    this.getcategoryTree();
  },
  methods: {
    async getUploadList() {
      const { data: res } = await request.get('/backstage/uploadVideo/list', {
        params: this.queryInfo
      });
      if (res.status !== 200) {
        return this.$message.error('获取上传视频列表失败！');
      }
      this.uploadList = res.data.data;
      this.total = res.data.count;
    },
    // 查询栏目下拉数据
    async getcolumnTree() {
      const { data: res } = await request.get(
        '/backstage/uploadVideo/columnTree'
      );
      if (res.status !== 200) {
        return this.$message.error('获取上传视频列表失败！');
      }
      this.columnList = res.data;
    },
    // 查询课程分类下拉数据
    async getcategoryTree() {
      const { data: res } = await request.get(
        '/backstage/uploadVideo/categoryTree'
      );
      if (res.status !== 200) {
        return this.$message.error('获取上传视频列表失败！');
      }
      this.categoryList = res.data;
    },
    // 监听级联选择器的变化
    handleChange() {},
    // 监听表格复选框的变化
    selectionChange() {},
    showWords(words) {
      if (words.length <= 10) {
        return words;
      } else {
        return words.substring(0, 10) + '...';
      }
    },
    handleSizeChange(val) {
      this.queryInfo.limit = val;
      this.getUploadList();
    },
    handleCurrentChange(val) {
      this.queryInfo.page = val;
      this.getUploadList();
    },
    // 按全部按钮
    searchAll() {
      this.queryInfo.courseCost = '';
      this.queryInfo.docCategoryName = '';
      this.queryInfo.state = '';
      this.queryInfo.createDate = '';
      this.queryInfo.videoCategoryName = '';
      this.queryInfo.speaker = '';
      this.getUploadList();
    }
  }
};
</script>
<style>
</style>
<style lang="less" scoped>
::v-deep .el-input__inner {
  background-color: #fafafa;
}
.search-box {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dddddd;
  > span {
    display: flex;
  }
}
.el-pagination {
  margin-top: 10px;
}
::v-deep .el-icon-edit:before {
  background-color: rgba(128, 196, 92, 1);
  color: #fff;
}
::v-deep .el-icon-view:before {
  background-color: rgba(236, 188, 4, 1);
  color: #fff;
}
::v-deep .el-link--inner {
  margin-right: 15px;
}
.paging {
  display: flex;
  justify-content: space-between;
  margin: 0 30px;
}
</style>