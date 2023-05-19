module.exports = {
  plugins: {
    // 'autoprefixer': {
    //   browers: ['Android >=4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      // 能够把所有元素的px单位转成Rem
      // rootValue: 转换px的基准值。
      // 例如一个元素宽是75px，则换成rem之后就是2rem。
      // rootValue支持两种类型：
      // 数字：固定数值
      // 函数：可以动态处理返回
      // postcss-pxtorem处理每个css文件的时候都会调用这个函数，他会把处理的css文件的相关信息通过参数传递给该函数
      rootValue({ file }) {
        // 因为设计稿使750rpx,vant使基于375
        // 知识点：反斜杠\     反斜杠前面需要再加一个反斜杠，用来对自身转义
        let a = file.indexOf('\\vant') !== -1 ? 37.5 : 75
        return a
      },
      // rootValue: 37.5,
      propList: ['*'],
      // 配置不要转换的样式资源
      exclude: 'markdowm'
    }
  }
}
  // postcss技术：webpack的插件（处理/转化/降级css的代码)
  // postcss-pxtorem插件：把px都转成rem