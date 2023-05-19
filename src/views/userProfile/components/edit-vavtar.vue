<template>
  <div class="edit-vavtar">
    <img class="avarar-img" ref="image" :src="src" />
    <div class="toobar">
      <div @click="$emit('close')">取消</div>
      <div @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
// 引入图片裁切插件
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import { updateUserAvatarAPI } from '@/api';
export default {
  name: 'edit-vavtar',
  props: {
    src: {
      type: [Object, String],
      required: true
    }
  },
  data() {
    return {
      cropper: null
    };
  },
  // 操作DOM元素，在mounted周期里面
  mounted() {
    const image = this.$refs.image; //这是Vue获取DOM的方式
    // const image = imgContent.getElementById('image'); 这是原生获取DOM
    this.cropper = new Cropper(image, {
      // 裁剪配置
      viewMode: 1, //视图模式，限制裁剪框不超过画布的大小
      dragMode: 'move', //拖动模式
      aspectRatio: 1, //设置裁剪框为固定的宽高比，默认16/9
      autoCropArea: 1, //设置裁剪区域占图片的大小, 值为 0-1 默认 0.8 表示 80%的区域
      cropBoxMovable: false, //是否可以拖拽裁剪框 默认true
      cropBoxResizable: false, //是否可以改变裁剪框的尺寸 默认trues
      background: false, //是否在容器内显示网格状的背景 默认true
      movable: true //是否可以移动图片 默认true
    });
  },
  methods: {
    onConfirm() {
      // 1. 如果是基于服务端的裁切，则使用：getData 方法，该方法得到裁切的区域参数。
      // console.log(this.cropper.getData());
      // 2.  如果是纯客户端的图片裁切，则使用：getCroppedCanvas 方法，该方法得到裁切之后的图片对象（类似于URL.createObjectURL 方法得到的文件对象）。
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        // 如果 接口要求Content-type是  application/json，则传递普通的JS对象
        // const res = await updateUserAvatarAPI({
        // // photo:blob
        // });
        // 如果 接口要求Content-type是  multipart/form-data ,则你必须传递FormData对象
        try {
          const formData = new FormData();
          formData.append('photo', blob);
          const { data } = await updateUserAvatarAPI(formData);
          // 关闭弹出层
          this.$emit('close');
          // 更新视图
          this.$emit('updatePhoto', data.data.photo);
        } catch (err) {
          this.$toast.fail('更新头像失败，请重试');
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.edit-vavtar {
  background-color: #000;
  height: 100%;
  .avarar-img {
    display: block; //Cropper要求
    max-width: 100%; //Cropper要求
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .toobar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90px;
      height: 90px;
      text-align: center;
      font-size: 30px;
      color: #fff;
      padding: 0 20px 10px;
    }
  }
}
</style>