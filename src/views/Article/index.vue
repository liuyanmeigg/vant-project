<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar title="标题" fixed left-arrow @click-left="$router.back()" />
    <div class="main-wrap">
      <!-- 加载中... -->
      <div class="loading-wrap" v-if="loading">
        <!-- <van-loading /> -->
        <van-loading vertical text-color="#3296fa">加载中...</van-loading>
      </div>
      <!-- 加载完成——文章详情 -->
      <div class="article-wrap" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- 用户信息 -->
        <van-cell>
          <!-- 头像 -->
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          ></van-image>
          <span slot="title" class="user-name">{{ article.aut_name }}</span>
          <span slot="label" class="publish-date">{{
            article.pubdate | relativeTime
          }}</span>
          <!-- 模板中的$event就是事件参数 -->
          <!-- 当我们传递给子组件的数据既要使用还要修改的时候 ：
          传递：props   
          :isFollowed="article.is_followed"
          修改： 自定义事件
           @update-isFollowed="article.is_followed = $event"
           简写方式： 在组件上使用v-model
           规则：
           value="article.is_followed"
           @input="article.is_followed = $event"
           所以对方要接收默认的value和@input
               v-if="value"和$emit("input")(在子组件中)
            在子组件中可以(写如下代码)来更改规则：
              model:{prop:'checked',event:'change'},
              props:{checked :false}
         -->
          <!-- 引入《关注用户》组件 -->
          <followUser
            class="follow-btn"
            v-model="article.is_followed"
            :aut_id="article.aut_id"
          ></followUser>
        </van-cell>
        <!-- 文章内容 -->
        <div class="article-content-wrap markdown-body">
          <div
            class="article-content"
            v-html="article.content"
            ref="article-content-ref"
          ></div>
          <van-divider class="article-content-end">End</van-divider>
        </div>
        <!-- 文章内容 正文结束 -->
        <!-- 文章评论列表 -->
        <commentList
          :sourceId="article.art_id"
          :list="commentList"
          @updateCount="totalCount = $event.total_count"
        />
        <!-- /文章评论列表 -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            hairline
            round
            @click="show = true"
            >写评论</van-button
          >
          <van-badge :content="totalCount">
            <div class="child">
              <van-icon name="comment-o" />
            </div>
          </van-badge>
          <!-- 引入《收藏/取消收藏》组件 -->
          <collectArticle
            class="icons"
            :art_id="article.art_id"
            v-model="article.is_collected"
          ></collectArticle>
          <!-- 引入《喜欢/不喜欢》组件 -->
          <likeArticle
            class="icons"
            v-model="article.attitude"
            :art_id="article.art_id"
          />
          <van-icon name="share-o" />
        </div>
        <!-- 发布评论的弹出层 -->
        <van-popup v-model="show" round position="bottom">
          <commentPost
            :target="article.art_id"
            @postSuccess="onPostSuccess"
          ></commentPost>
        </van-popup>
        <!-- 回复评论弹出层 -->
        <van-popup
          v-model="popupState"
          position="bottom"
          closeable
          close-icon-position="top-left"
          :style="{ height: '80%' }"
        >
          <commentReply
            :list="replyCommentList"
            :comment="comment"
            :sourceId="comment.com_id"
            :art_id="article.art_id"
            :attitude="article.attitude"
          ></commentReply>
        </van-popup>
      </div>
      <!-- 加载失败:404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <div class="hint-words">该资源不存在或已删除！</div>
      </div>
      <!-- 加载失败：其它未知错误 -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" class="failure-btn" />
        <div class="hint-words">内容加载失败！</div>
        <van-button type="default" size="small" @click="loadArticle"
          >点击重试</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { ImagePreview, Divider, Badge, NoticeBar, Loading } from 'vant';
import { getArticleByIdAPI } from '@/api';
Vue.use(Loading);
Vue.use(Divider);
Vue.use(Badge);
Vue.use(NoticeBar);
import followUser from '@/components/follow-user';
import collectArticle from '@/components/collect-article';
import likeArticle from '@/components/like-article';
import commentList from './components/comment-list.vue';
import commentPost from './components/coment-post.vue';
import commentItem from './components/comment-item.vue';
import commentReply from './components/comment-reply.vue';
export default {
  name: 'Artical',
  components: {
    followUser,
    collectArticle,
    likeArticle,
    commentList,
    commentPost,
    commentItem,
    commentReply
  },
  props: {
    // 方法一： 实现路由参数的截耦
    // 文章id
    articleId: {
      type: [Number, String, Object],
      required: true
      //为什么是双类型？因为通过点击文章进入的articleId是String，直接地址栏输入地址进入的articleId是Number(在vue的调试工具props属性中可以看出)
      //Object 如果id的结果超过JS处理的范围就需要JSONBig进行处理-2^53——2^53
    }
  },
  data() {
    return {
      article: {},
      loading: true, //加载中的loading状态
      errStatus: 0, //失败的状态码
      followLoading: false,
      totalCount: 0,
      show: false, //控制发布评论弹出层的显示
      commentList: [],
      comment: {}, //单个评论信息对象
      popupState: false, //控制回复评论弹出层的显示
      replyCommentList: [] //回复评论列表
    };
  },
  computed: {
    // 方法二： 这种方法路由就不用配置props: true了
    // articleId() {
    //   return this.$route.params.articleId;
    // }
  },

  created() {
    this.loadArticle();
  },
  methods: {
    async loadArticle() {
      this.loading = true;
      try {
        const { data: res } = await getArticleByIdAPI(this.articleId);
        // 其它原因的错误测试代码
        // if (Math.random() > 0.5) {
        //   JSON.parse('diojnckl');
        // }
        // 数据驱动试图这个事不是立即的
        this.article = res.data;
        // console.log(this.article);
        // 请求成功，关闭loading
        // this.loading = false;
        // 加上一个定时器就可以延迟获取
        setTimeout(() => {
          this.ImagePreview();
        }, 0);
      } catch (err) {
        if (err.response && err.response === 404) {
          this.errStatus = 404;
        }
        // this.loading =false
        this.$toast.fail('获取数据失败', err);
      }
      // 无论成功还是失败，都需要关闭loading，所以可以在这里写一遍即可
      this.loading = false;
    },
    // 获取图片节点，并添加点击事件
    ImagePreview() {
      // 得到article-content-ref下所有的img节点
      const articleContent = this.$refs['article-content-ref'];
      const imgs = articleContent.querySelectorAll('img');
      const images = [];
      imgs.forEach((img, index) => {
        // 获取所有的img地址
        images.push(img.src);
        // 给每一个img注册点击事件
        img.onclick = function () {
          ImagePreview({
            images,
            startPosition: index,
            closeable: true
          });
        };
      });
    },
    onPostSuccess(data) {
      this.show = false;
      this.commentList.unshift(data.new_obj);
      // console.log(this.commentList, 'this.commentList');
    }
  },
  mounted() {
    this.$bus.$on('updateReplyPopup', (obj) => {
      this.popupState = obj.b;
      this.comment = obj.a;
      // console.log(this.popupState, 'item传过来的');
      // console.log(this.comment, 'item传过来的');
    });
    this.$bus.$on('showCommentPopup', (data) => {
      this.show = data;
    });
  }
};
</script>


<style lang="less" scoped>
@import '@/mobile/markdowm.css';

.article-container {
  height: 100vh;
  background-color: #fff;
  .van-nav-bar__content {
    height: 92px;
  }
  /deep/ .van-icon-arrow-left:before {
    color: #fff;
  }
  // 样式穿透：
  // 父元素 /deep/ 子元素
  .main-wrap /deep/ .error-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    .failure-btn {
      font-size: 100px;
      color: #969799;
    }

    .hint-words {
      font-size: 38px;
      margin: 30px 0;
    }
  }
  .main-wrap {
    background-color: #fff;
    padding: 100px 20px;

    // 文章详情
    .article-wrap {
      // 文章标题
      .article-title {
        font-size: 30px;
      }
      .van-cell {
        padding-left: 0;
        padding-right: 0;
        align-items: center;
      }
      .avatar {
        width: 100px;
        height: 100px;
      }
      .follow-btn {
        width: 120px;
        height: 48px;
        font-size: 12px;
      }
      .van-cell__title {
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      /deep/ .van-button--normal {
        padding: 0;
      }
      //   文章内容
      .article-content-wrap {
        margin-bottom: 50px;
        .article-content {
          font-size: 20px;
        }
        .article-content-end {
          color: #969799;
          font-size: 30px;
        }
      }
      .icons {
        width: 30px;
        height: 30px;
        border: 0;
        font-size: 30px;
      }
    }
  }
}
.article-bottom {
  display: flex;
  font-size: 30px;
  justify-content: space-around;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  :nth-child(n + 3) {
    align-self: center;
    // align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性
  }
  :nth-child(2) {
    align-self: flex-end;
  }
  .comment-btn {
    width: 250px;
    height: 50px;
  }

  .child {
    width: 40px;
    height: 40px;
    border-radius: 4px;
  }
}

.reply-count {
  display: inline-block;
  position: relative;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  color: #3b3134;
}
</style>
