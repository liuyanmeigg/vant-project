<template>
  <div>
    <van-nav-bar title="标题" left-arrow @click-left="$router.back()" />
    <van-row type="flex" justify="center">
      <van-col span="2">
        <img src="" alt="" style="width: 20px; height: 20px" />
      </van-col>
      <van-col span="19">
        <div class="header-wrap">
          <span class="name">昵称</span>
          <span class="count">2点赞</span>
        </div>
        <p class="time">2021</p>
        <div class="comments">评论内容</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { getcommentsAPI } from '@/api/index';
export default {
  name: 'Comment',
  data() {
    return {
      commentsList: []
    };
  },
  async created() {
    console.log(this.$route.query.id, 'id');
    const res = await getcommentsAPI({
      id: this.$route.query.id,
      limit: 20
    });
    console.log(res);
  }
};
</script>

<style lang="less" scoped>
.van-row {
  margin-top: 10px;
}
.header-wrap {
  display: flex;
  justify-content: space-between;
}
.name,
.comments {
  font-size: 14px;
}
.count,
.time {
  font-size: 12px;
  color: rgba(196, 186, 186, 0.861);
}
.time {
  margin: 4px 0;
}
</style>