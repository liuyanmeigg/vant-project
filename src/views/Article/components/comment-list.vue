<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <span class="allCommentText">全部评论</span>
      <!-- 注意：在这里进行遍历 -->
      <commentItem
        :comment="item"
        v-for="(item, index) in list"
        :key="index"
        :typeId="type"
      ></commentItem>
    </van-list>
  </div>
</template>

<script>
// 关于props的数据修改：
// 当传给子组件的Prop为基本数据类型是（Number,String）在子组件中修改Prop控制台会报错 prop的值不会改变
// 当传给子组件的Prop为引用时（Object，Array）在子组件中修改Prop的属性不会报错且值可以改变
import commentItem from './comment-item.vue';
import { getCommentListAPI } from '@/api';
export default {
  name: 'comment-list',
  components: { commentItem },
  props: {
    sourceId: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
      // default: function () {
      //   return [];
      // }
    }
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, //用来获取下一页的标记
      limit: '5'
    };
  },
  created() {
    this.onLoad();
  },
  computed: {
    type() {
      if (this.sourceId.match(/[a-z]/i)) {
        return 'c';
      }
      return 'a';
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getCommentListAPI({
          type: this.type, //'a'代表对文章的评论列表, 'c'代表对评论的回复列表
          source: this.sourceId, //如果type为'a'这里传递文章id, 如果type为'c'这里传评论id
          offset: this.offset, //偏移量id(评论id), 值为评论id, 偏移量, 表示告诉后台从此id往后返回数据给前端, 做加载更多效果
          limit: this.limit
        });
        const { results } = data.data;
        this.list.push(...results);
        this.loading = false;
        // console.log(this.list);
        if (results.length) {
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
        this.$emit('updateCount', data.data);
      } catch (err) {
        this.$toast.fail('获取评论列表失败');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.allCommentText {
  font-size: 30px;
  padding-left: 20px;
  line-height: 2;
}
</style>