<template>
  <el-container class="home">
    <!-- 侧边栏导航 -->
    <el-aside class="home_aside" :width="isCollapse ? '64px' : '200px'">
      <div class="toggle-btn" @click="toggleCollapse">|||</div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        router
        unique-opened
        background-color="#333744"
        text-color="#fff"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <!-- 用户管理 -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="registerDoctorManage">注册医师</el-menu-item>
            <el-menu-item index="platformAdministrator"
              >平台管理员</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <!-- 内容管理 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-film"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="columnSetting">栏目设置</el-menu-item>
            <el-menu-item index="2-2">文章管理</el-menu-item>
            <el-menu-item index="2-3">文章管理</el-menu-item>
            <el-menu-item index="uploadVideos">上传视频</el-menu-item>
            <el-menu-item index="2-5">会议直播</el-menu-item>
            <el-menu-item index="friendlink">友情链接</el-menu-item>
            <el-menu-item index="corporate">企业会员</el-menu-item>
            <el-menu-item index="servicer">服务商</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 基础设置 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>基础设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">二级机构</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 我的账户 -->
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-coordinate"></i>
            <span>我的帐户</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">账户信息</el-menu-item>
            <el-menu-item index="4-2">操作信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 右侧边栏 -->
    <el-main>
      <!-- 路由组件显示区 -->
      <router-view> </router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style lang="less" scoped>
.home_aside {
  width: 200px;
  height: 760px;
}
.toggle-btn {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-menu {
  border: 0;
}
</style>