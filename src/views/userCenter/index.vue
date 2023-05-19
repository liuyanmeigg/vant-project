/*
@Description: 用户中心
@author:pompey_hpy
@createTime: 2022-11-02
*/
<template>
  <div class="page-content">
    <div class="w">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户中心</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 侧边导航 -->
      <div class="left_nav">
        <BMDALeftNav
          :menuFUid="menuFUid"
          :defaultActive="defaultActive"
        ></BMDALeftNav>
      </div>
      <!-- 页面 -->
      <div class="right_main">
        <div class="right_main_nav">
          <div class="nav_circle"></div>
          <div class="nav_title">{{ rightTitle }}</div>
        </div>
        <template v-if="rightTitle == '注册医师'">
          <div class="s">
            <el-button type="danger">删除</el-button>
            <el-button type="primary">添加</el-button>
          </div>

          <registerDoctorManage />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import BMDAPagination from '@/components/BMDAPagination/index.vue';
import BMDATextList from '@/components/BMDATextList/index.vue';
import BMDALeftNav from '@/components/BMDALeftNav/index.vue';
import { findNewsCenter } from '@/api/whiteList/whiteList';
import registerDoctorManage from './userManage/registerDoctorManage/index.vue';
export default {
  name: 'userCenter',
  components: {
    BMDAPagination,
    BMDATextList,
    BMDALeftNav,
    registerDoctorManage
  },
  data() {
    return {
      //右侧标题
      rightTitle: '',
      //选中菜单
      defaultActive: '',
      //当前菜单父Uid
      menuFUid: ''
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        this.menuFUid = query.fuid != '0' ? query.fuid : query.uid;
        this.defaultActive = query.uid;
        this.rightTitle = query.title;
      },
      immediate: true
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import '~@/styles/common.scss';
@import '~@/styles/variables.scss';
@import '~@/styles/index.scss';

.page-content {
  font-family: Microsoft YaHei;
  background: rgba(246, 249, 255, 1);
  padding-top: 20px;
  padding-bottom: 70px;

  // 面包屑
  .el-breadcrumb {
    height: 20px;
    line-height: 20px;
    margin-bottom: 10px;

    ::v-deep .el-breadcrumb__inner {
      color: rgba(80, 80, 80, 1);
      font-size: 13px;
    }

    ::v-deep .el-breadcrumb__separator {
      color: rgba(80, 80, 80, 1);
      margin: 0;
    }
  }

  //左边菜单
  .left_nav {
    padding-top: 23px;
    padding-left: 38px;
    position: relative;
    padding-bottom: 180px;
  }

  //右面面板
  .right_main {
    position: relative;

    .el-empty {
      padding-top: 170px;
      border-bottom: 1px dashed rgba(208, 215, 229, 1);
      padding-bottom: 244px;

      ::v-deep .el-empty__description p {
        color: rgba(166, 166, 166, 1);
      }
    }
  }
}
</style>
