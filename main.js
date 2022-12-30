import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()


//环信的setData
Vue.mixin({
	methods: {
		setData: function(obj, callback) {
			let that = this;
			let keys = [];
			let val, data;
			Object.keys(obj).forEach(function(key) {
				keys = key.split('.');
				val = obj[key];
				data = that.$data;
				keys.forEach(function(key2, index) {
					if (index + 1 == keys.length) {
						that.$set(data, key2, val);
					} else {
						if (!data[key2]) {
							that.$set(data, key2, {});
						}
					}
					data = data[key2];
				})
			});
			callback && callback();
		} 
	}
});

//引入uview
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

//引入封装的接口请求函数
import { $http } from '@escook/request-miniprogram'
$http.baseUrl = 'https://xcx.yichedi.com/'
uni.$http = $http

//给图片路径添加路径
Vue.prototype.getImgsrc = function(url){
	let urlk = url;
	let str = RegExp('http');
	let newUrl;
	//通过三元运算符进行判断该图片是否含有http域名，没有就拼接上去https://xcx.yichedi.com/
	str.test(urlk) ? newUrl = urlk : newUrl = 'https://xcx.yichedi.com/' + urlk;
	const urls = newUrl
		return urls
	
	// return 'https://xcx.yichedi.com/'+src
}
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
	uni.showLoading({
	    title: '数据加载中...',
	  })
	     
}
// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}
//上传图片
import upLoad from "./utils/upload.js";
Vue.prototype.$upload = upLoad;

//全局过滤器
import * as filters from './filter/index'
Object.keys(filters).forEach(key => {
  	Vue.filter(key, filters[key])
});


// #endif




// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif