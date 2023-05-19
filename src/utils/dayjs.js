import Vue from "vue";
import dayjs from "dayjs";
// dayjs默认语言是英文
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// 配置导入相对时间插件
// var relativeTime = require('dayjs/plugin/relativeTime') ES6之前的写法
import relativeTime from 'dayjs/plugin/relativeTime' //ES6写法
dayjs.extend(relativeTime)

// 全局使用汉语
dayjs.locale('zh-cn')
dayjs().format('YYYY-MM-DD');

// console.log(dayjs().toNow()); //当前时间
// console.log(dayjs().format('YYYY-MM-DD')); //指定时间

// 定义一个全局过滤器
// 参数一：过滤器名称
// 参数二：过滤器函数
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})