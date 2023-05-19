<template>
  <div>
    <!-- 方法一： :to="`/article/${art.art_id}`-->
    <!-- 方法二：:to="'/article' + art.art_id" -->
    <!-- 方法三： params  根据路由名称进行跳转 跳转地址不会显示articleId（http://localhost:8080/#/article/8190)
      :to="{
        name: 'article',
        paramas: {
          articleId: art.art_id
        }
      }" -->
    <!-- 方法四： query  跳转地址有articleId(http://localhost:8080/#/article/articleId:8190)
      :to="{
        path: '/article',
        // 传递路由动态参数，这里的属性名根据路由配置定义的动态参数名称为准：articleId
        query: {
          articleId: art.art_id
        }
      }"
     -->
    <van-cell
      class="article-item"
      :to="{
        name: 'article',
        // 传递路由动态参数，这里的属性名根据路由配置定义的动态参数名称为准：articleId
        params: {
          articleId: art.art_id
        }
      }"
    >
      <div slot="title" class="top">
        <div class="title van-multi-ellipsis--l2">
          {{ art.title }}
        </div>
        <van-image
          fit="cover"
          class="img"
          v-if="art.cover.type === 1"
          slot="default"
          :src="changeUrl(art.cover.images[0])"
        />
      </div>

      <div slot="label">
        <div class="cover-wrap" v-if="art.cover.type === 3">
          <van-image
            class="img"
            fit="cover"
            v-for="(img, index) in art.cover.images"
            :key="index"
            :src="changeUrl(img)"
          />
        </div>
        <div class="label-wrap">
          <div class="label-info-wrap">
            <span>{{ art.aut_name }}</span>
            <span>{{ art.comm_count }}评论</span>
            <span>{{ art.pubdate | relativeTime }}</span>
          </div>
          <van-icon name="cross" @click="onClosed(art.art_id)" />
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { articleDislikeAPI } from '@/api';
export default {
  name: 'ArticleItem',
  props: {
    art: {
      type: Object,
      required: true
    }
  },
  created() {
    // console.log(this.art);
  },
  methods: {
    async onClosed(id) {
      // try {
      //   const res = await articleDislikeAPI({
      //     target: id
      //   });
      //   console.log(res);
      // } catch (err) {
      //   console.log(err);
      // }
    },
    changeUrl(imgUrl) {
      return imgUrl.replace(
        'http://localhost:8000',
        'http://toutiao.itheima.net'
      );
    }
  }
};
</script>

<style lang="less" scoped>
.article-item {
  .top {
    display: flex;
    justify-content: space-between;
  }
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 230px;
    height: 146px;
    margin-left: 25px;
  }
  .cover-wrap {
    display: flex;

    .img {
      flex: 1;
      margin: 30px 0;
      // 前两个子元素设置
      &:nth-child(-n + 2) {
        margin-right: 5px;
      }
    }
  }
  .img {
    width: 230px;
    height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .label-wrap {
    display: flex;
    justify-content: space-between;
  }
}
</style>