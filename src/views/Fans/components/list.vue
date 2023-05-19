<template>
  <div class="list">
    <div class="user_wrap">
      <van-cell-group>
        <van-cell class="van-cell">
          <template>
            <div class="left">
              <img src="@/assets/user_head.jpg" alt="" />
              <div class="user-info">
                <span class="name">黑马先锋</span>
                <div class="fans-count">粉丝数：1人</div>
              </div>
            </div>
          </template>
          <template #right-icon>
            <van-button class="van-button" type="primary">回关</van-button>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="empty-wrap">
      <img class="empty-img" src="@/assets/empty-image-default.png" alt="" />
      <div class="empty-text">暂无数据</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: {
    list: {
      type: Array
    }
  }
};
</script>

<style lang="less" scoped>
.list {
  .user_wrap {
    .van-cell {
      display: flex;
      align-items: center;
      padding-top: 30px;
      padding-bottom: 30px;
      .left {
        display: flex;
        align-items: center;
        img {
          width: 110px;
          height: 110px;
          border-radius: 50%;
        }
        .user-info {
          margin-left: 20px;
          .name {
            font-size: 30px;
            color: #222;
          }
          .fans-count {
            font-size: 28px;
            color: #444;
          }
        }
      }
      .van-button {
        border-radius: 30px;
        width: 150px;
        height: 60px;
      }
    }
  }
  .empty-wrap {
    text-align: center;
    padding: 20px 0;
    .empty-img {
      width: 320px;
      height: 320px;
    }
    .empty-text {
      font-size: 30px;
    }
  }
}
</style>