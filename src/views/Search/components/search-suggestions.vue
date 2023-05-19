<template>
  <div class="search-suggestions">
    <van-cell
      icon="search"
      v-for="(item, index) in suggestionsList"
      :key="index"
      @click="$emit('search', item)"
    >
      <span v-html="highLight(item)" slot="title"></span>
    </van-cell>
    <!-- 带有HTML的字符串不能使用{{}}它会直接输出纯文本 -->
    <!-- 使用v-html指令可以绑定渲染带有HTML标签的字符串 -->
  </div>
</template>

<script>
import { getSearchSuggestionsAPI } from '@/api';
// debounced（防抖动）函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 func 方法
import { debounce } from 'lodash';
export default {
  name: 'search-suggestions',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestionsList: [],
      timer: null, //注意定时器要全部注册才会起作用
      htmlStr: ''
    };
  },
  //   利用watch函数进行监听searchText的变化
  watch: {
    searchText: {
      //当searchText数据发生变化的时候就会调用handler
      immediate: true, //在监听之后立即调用，如果不加，第一次的数据是不会监听的
      //   简写：
      //   方法一：
      //   handler(val) {
      //     this.getSearchSuggestions(val);
      //   }
      //   方法二：
      //   debounce函数：参数一：一个函数；参数二：延迟时间，单位是毫秒；返回值：防抖之后的函数
      handler: debounce(function (val) {
        this.getSearchSuggestions(val);
      }, 500)
    }
  },
  methods: {
    // 方法一：
    // getSearchSuggestions(val) {
    //   if (val.length === 0) this.suggestionsList = [];
    //   clearTimeout(this.timer);
    //   this.timer = setTimeout(async () => {
    //     try {
    //       const { data: res } = await getSearchSuggestionsAPI({
    //         q: val
    //       });
    //       this.suggestionsList = res.data.options;
    //       console.log(this.suggestionsList);
    //     } catch (err) {
    //       this.$toast('获取联想建议失败');
    //     }
    //   }, 500);
    // },
    // 方法二：
    async getSearchSuggestions(val) {
      try {
        const { data: res } = await getSearchSuggestionsAPI({
          q: val
        });
        this.suggestionsList = res.data.options;
        if (this.suggestionsList.length === 0) {
          this.$toast('未找到匹配内容');
        }
      } catch (err) {
        this.$toast('获取联想建议失败');
      }
    },

    // 设置搜索关键字高亮
    highLight(text) {
      const textCss = `<span class="active">${this.searchText}</span>`;
      const reg = new RegExp(this.searchText, 'gi'); //'gi' 全局+忽略大小写
      return text.replace(reg, textCss); //注意：只是在展示页面的时候修改，原始数据并未改变,这里记得return
      //  知识点总结：
      //   一：正则表达式
      //  1. 正则表达式 // 中间的内容都会当作匹配字符来使用，而不是数据变量;
      //  2. 如果需要根据数据变量动态的创建正则表达式，则需要手动 new RegExp();
      //  3. RegExp正则表达式构造函数：
      // 参数1：匹配模式字符串，它会根据这个字符串创建正则对象；
      // 参数2：匹配模式，要写到字符串中
      // 二：replace()方法
      // 语法： stringObj.replace(rgExp, replaceText)
      // 参数：
      //  stringObj：字符串(string)；
      // reExp：可以是正则表达式对象(RegExp)，也可以是字符串(string)；
      // replaceText：替代查找到的字符串。
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .active {
  color: #3296fa;
}
</style>