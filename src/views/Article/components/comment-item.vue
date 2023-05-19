<template>
  <div class="comment-item">
    <van-cell>
      <van-image
        slot="icon"
        :src="comment.aut_photo"
        class="avatar"
        round
      ></van-image>
      <div slot="title" class="title-wrap">
        <span class="user-name">{{ comment.aut_name }}</span>
        <van-button
          :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
          class="like-btn"
          :class="{ liked: comment.is_liking }"
          :loading="commentLoading"
          @click="onLiked"
          >{{ comment.like_count || '赞' }}</van-button
        >
      </div>
      <div slot="label" class="label-wrap">
        <span class="comment-content">{{ comment.content }}</span>
        <div class="comment-bottom">
          <span class="comment-pubdate">{{
            comment.pubdate | relativeTime
          }}</span>
          <van-button round class="reply-btn" @click="onReplyComment"
            >回复 {{ comment.reply_count }}</van-button
          >
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { commentLikedAPI, delCommentLikedAPI, addCommentAPI } from '@/api';
export default {
  name: 'comment-item',
  props: {
    comment: {
      type: Object
      // required: true
    },
    typeId: {
      type: [String, Number]
    }
  },
  data() {
    return {
      commentLoading: false
    };
  },
  created() {
    // console.log(this.typeId, 'type');
  },
  methods: {
    // 监听点赞按钮事件
    async onLiked() {
      this.commentLoading = true;
      try {
        if (this.comment.is_liking) {
          await delCommentLikedAPI(this.comment.com_id);
          this.comment.like_count--;
        } else {
          await commentLikedAPI(this.comment.com_id);
          this.comment.like_count++;
        }
        this.comment.is_liking = !this.comment.is_liking;
        this.$toast.success(this.comment.is_liking ? '点赞成功' : '取消点赞');
      } catch (err) {
        this.$toast.fail('操作失败，请稍后重试');
      }
      this.commentLoading = false;
    },
    onReplyComment() {
      this.$bus.$emit('updateReplyPopup', { a: this.comment, b: true });
    }
  }
};
</script>

<style lang="less" scoped>
.comment-item {
  .van-cell {
    padding-left: 20px;
    padding-right: 20px;
    .avatar {
      width: 80px;
      height: 80px;
      margin-right: 20px;
    }
    .title-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user-name {
        color: #a1b7d9;
      }

      .liked {
        color: #e8656b;
      }
    }
    .label-wrap {
      .comment-content {
        font-size: 30px;
        color: #1f1f1f;
      }
      .comment-bottom {
        margin-top: 10px;
        display: flex;
        align-items: center;
        .comment-pubdate {
          color: #1c162d;
        }
        .reply-btn {
          width: 130px;
          height: 50px;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
<style>
.like-btn {
  border: 0;
}
</style>