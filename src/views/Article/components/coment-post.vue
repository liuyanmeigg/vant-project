<template>
  <div class="coment-post">
    <van-field
      class="post-field"
      v-model.trim="commentContent"
      rows="2"
      autosize
      ref="addref"
      type="textarea"
      maxlength="50"
      placeholder="请发表你的评论"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onPost"
      :disabled="!commentContent.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addCommentAPI } from '@/api';
export default {
  name: 'coment-post',
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      commentContent: ''
      //   isDisabled: false
    };
  },
  methods: {
    async onPost() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast ,下面有别的属性出现的时候，会自动关闭
        forbidClick: true,
        message: '发布中...'
      });
      try {
        const { data } = await addCommentAPI({
          target: this.target,
          content: this.commentContent
        });
        // console.log(data.data);
        // 关闭弹出层
        // 将发布内容显示到列表中
        this.$emit('postSuccess', data.data);
        // 清空文本框
        this.commentContent = '';
        this.$toast.success('发布成功');
      } catch (err) {
        this.$toast.fail('评论失败，请重试');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.coment-post {
  padding: 20px;
  display: flex;
  align-items: center;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 100px;
    border: 0;
    color: #3296fb;
  }
}
</style>