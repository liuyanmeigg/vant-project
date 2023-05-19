<template>
  <div class="comment-reply">
    <span class="reply-count">{{ comment.reply_count }}条回复</span>
    <commentItem :comment="comment"></commentItem>
    <commentList :list="list" :sourceId="sourceId"></commentList>
    <div class="reply-bottom">
      <van-button class="edit-comment" round @click="onComment"
        >写评论</van-button
      >
      <likeComment class="like-btn" :art_id="art_id"></likeComment>
    </div>
  </div>
</template>

<script>
import commentItem from './comment-item.vue';
import commentList from './comment-list.vue';
import likeComment from '@/components/like-article';
export default {
  name: 'comment-reply',
  components: {
    commentItem,
    commentList,
    likeComment
  },
  props: {
    list: {
      type: Array,
      default: () => []
      // default: function () {
      //   return [];
      // }
    },
    comment: {
      type: Object
    },
    sourceId: {
      type: [Number, Object, String]
    },
    art_id: {
      type: [Number, Object, String]
    }
    // attitude: {
    //   type: Number
    // }
  },
  data() {
    return {
      // comment: {} //单个评论信息对象
    };
  },
  methods: {
    onComment() {
      this.$bus.$emit('showCommentPopup', true);
    }
  }
};
</script>
<style>
.van-popup__close-icon {
  color: #24adf3;
}
.van-popup__close-icon--top-left {
  top: 20px;
}
.van-popup__close-icon {
  font-size: 30px;
}
</style>
<style lang="less" scoped>
.comment-reply {
  height: 100%;
  .reply-count {
    display: inline-block;
    position: relative;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 30px;
    color: #3b3134;
  }
  .reply-bottom {
    border-top: 1px solid #ddd;
    padding: 10px 50px 5px;
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: space-between;
    align-items: center;
    .edit-comment {
      width: 300px;
      height: 60px;
    }
  }
}
</style>