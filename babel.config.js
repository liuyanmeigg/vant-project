module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 按需引入样式
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      // 指定样式路径
      style: (name) => `${name}/style/less`,
    }, 'vant']
  ],

}
