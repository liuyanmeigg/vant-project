<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      fixed
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 个人信息 -->
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image class="avatar" round :src="userProfile.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      center
      :value="userProfile.name"
      @click="editNameDialog = true"
    />
    <van-cell
      title="性别"
      is-link
      center
      :value="userProfile.gender === 0 ? '男' : '女'"
      @click="editGender = true"
    >
    </van-cell>
    <van-cell
      title="生日"
      is-link
      center
      :value="formatBirthday"
      @click="editBirthdayPopup = true"
    />

    <!-- 修改昵称弹出框 -->
    <van-dialog
      v-if="editNameDialog"
      v-model="editNameDialog"
      title="修改-昵称"
      show-cancel-button
      @opened="openPopup"
      :before-close="onBeforeClose"
    >
      <van-field
        v-model.trim="userprofile2.name"
        ref="editUserNameRef"
        required
        placeholder="请输入用户名"
        input-align="center"
        show-word-limit
        maxlength="20"
      />
    </van-dialog>
    <!-- 修改性别弹出层 -->
    <van-popup
      v-if="editGender"
      v-model="editGender"
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-picker
        title="性别"
        show-toolbar
        :default-index="userprofile2.gender"
        :columns="columns"
        @cancel="editGender = false"
        @change="onChange"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 修改生日对话框 -->
    <van-popup
      v-model="editBirthdayPopup"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <editBirthday
        v-if="editBirthdayPopup"
        :birthday="userprofile2.birthday"
        @closed="editBirthdayPopup = false"
        @newDate="submitBirth"
      ></editBirthday>
    </van-popup>
    <!-- 修改头像弹出层 -->
    <van-popup
      v-if="editAvatarPopup"
      v-model="editAvatarPopup"
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <editVavtar
        :src="fileUrl"
        @close="editAvatarPopup = false"
        @updatePhoto="updatePhoto"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfileAPI, updateUserProfileAPI } from '@/api';
import editBirthday from './components/edit-birthday.vue';
import editVavtar from './components/edit-vavtar.vue';
// import { Base64 } from 'js-base64';
export default {
  name: 'UserProfile',
  components: { editBirthday, editVavtar },
  data() {
    return {
      userProfile: {}, //用户个人简介
      userprofile2: {},
      editNameDialog: false, //控制修改名字弹出层的显示,并且绑定v-if可以进行数据的重新渲染，点击”取消“按钮，保持原来的名字
      // userInfo: {
      //   name: '',
      //   gender: 0,
      //   birthday: ''
      // },
      formatBirthday: '',
      editGender: false,
      columns: ['男', '女'],
      editBirthdayPopup: false,
      editAvatarPopup: false,
      fileUrl: null //预览头像地址
    };
  },
  computed: {
    // userInfo() {
    //   return JSON.parse(Base64.decode(this.$route.query.userInfo));
    // }
  },
  created() {
    this.loadUserProfile();
  },
  // mounted() {
  //   this.$on('name', (name) => {
  //     this.userInfo.name = name;
  //   });
  //   this.$on('gender', (gender) => {
  //     this.userInfo.gender = gender;
  //   });
  //   this.$on('birthday', (birthday) => {
  //     this.userInfo.birthday = birthday;
  //   });
  // },
  methods: {
    // 获取用户个人信息
    async loadUserProfile() {
      try {
        const { data } = await getUserProfileAPI();
        this.userProfile = data.data;
        this.userprofile2 = Object.assign({}, this.userProfile);
        // console.log(this.userProfile, '个人信息');
        this.formatBirthday = this.userProfile.birthday.substring(0, 10);
      } catch (err) {
        this.$toast.fail('获取用户个人简介失败');
      }
    },
    // 点击昵称单元格
    // editName() {
    //   this.editNameDialog = true;
    //   // this.$emit('name', this.userProfile.name);
    // },
    // 打开弹窗且动画结束后触发
    openPopup() {
      // this.$nextTick(() => {
      //
      // });
      // this.$refs.editUserNameRef.focus();
    },
    // 点击昵称确定按钮时触发
    onBeforeClose(action, done) {
      if (action === 'confirm') {
        if (!this.userprofile2.name.length) {
          this.$toast('内容不能为空');
          return done(false);
        } else {
          done();
          this.updateInfo();
        }
      } else {
        done();
      }
    },
    // 更新用户信息
    async updateInfo() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      });
      try {
        const res = await updateUserProfileAPI(this.userprofile2);
        this.loadUserProfile();
        this.$toast.success('修改成功');
        console.log(res);
      } catch (err) {
        this.$toast.fail('更新用户信息失败');
      }
    },
    // 点击性别单元格
    // editGenderBtn() {
    //   this.editGender = true;
    //   // this.$emit('gender', this.userProfile.gender);
    // },
    onChange(picker, value, index) {
      this.userprofile2.gender = index;
    },
    onConfirm() {
      this.updateInfo();
      this.editGender = false;
      this.loadUserProfile();
    },
    // editBirthdayBtn() {
    //   this.editBirthdayPopup = true;
    //   // this.$emit('birthday', this.formatBirthday);
    // },
    submitBirth(data) {
      this.userprofile2.birthday = data;
      this.updateInfo();
      this.editBirthdayPopup = false;
    },
    // 监听文件选择的变化
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0]; //input元素DOM
      // 基于文章对象获取blob数据
      this.fileUrl = window.URL.createObjectURL(file);
      // 展示预览图片弹出层
      this.editAvatarPopup = true;
      // 注意：输入框如果选择了同一个文件，不会触发change事件，所以需要每次使用完毕，就把它的value值清空,确保下次选择同一文件，再次触发change事件
      this.$refs.file.value = '';
    },
    // 更新头像，接收头像新地址
    updatePhoto(newPhoto) {
      this.userprofile2.photo = newPhoto;
      this.updateInfo();
    }
  }
};
</script>

<style lang="less" scoped>
.user-profile {
  padding-top: 95px;
  .van-cell {
    padding-top: 10px;
    padding-bottom: 10px;
    height: 100px;
  }
  .avatar {
    width: 70px;
    height: 70px;
  }
  /deep/ .van-picker__cancel,
  /deep/ .van-picker__confirm {
    color: #3197fb;
  }
}
</style> 
<style>
.van-nav-bar .van-icon {
  color: #fff;
}
</style>