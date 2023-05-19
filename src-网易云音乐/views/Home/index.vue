<template>
  <div>
    <p class="title">推荐歌单</p>
    <van-row gutter="10">
      <!-- 想让谁循环就写在谁身上 -->
      <van-col span="8" v-for="song in recommendMusicList" :key="song.id">
        <van-image width="100%" height="3rem" :src="song.picUrl" />
        <p class="song_name">{{ song.name }}</p>
      </van-col>
    </van-row>
    <p class="title">最新音乐</p>
    <SongItem
      :title="item.name"
      :label="item.song.artists[0].name + '  ' + item.name"
      v-for="item in hotMusicList"
      :key="item.id"
      :id="item.id"
    ></SongItem>
  </div>
</template>

<script>
import { recommendMusicAPI, hotMusicAPI } from '@/api/index';
import SongItem from '@/components/SongItem.vue';
export default {
  name: 'Home',
  components: { SongItem },
  data() {
    return {
      recommendMusicList: [],
      hotMusicList: []
    };
  },
  async created() {
    const res = await recommendMusicAPI({ limit: 6 });
    this.recommendMusicList = res.data.result;
    const hotMusic = await hotMusicAPI({ limit: 6 });
    this.hotMusicList = hotMusic.data.result;
  },
  methods: {}
};
</script>

<style scoped>
.title {
  padding: 0.267rem 0.24rem;
  margin-bottom: 0.24rem;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
.play-icon {
  font-size: 21px;
}
</style>