<template>
	<!-- 我的 -->
	<view class="carMe">
		
		<view class="c-header">
			<view class="h-top">
				<!-- <image src="../../static/image/shezhi1.png" mode="" @tap="spikGoUrl('../information/information')">
				</image> -->
				<!-- #ifdef APP -->
				<image src="../../static/image/shezhi2.png" mode="" @tap="navimg2"></image>
				<!-- #endif -->
				
			</view>
			<view class="h-head">
				<block>
					<image :src="$jointImage(userinfors.avatar)" mode="" v-if="token"></image>
					<image src="../../static/image/noLogin.png" mode="" v-else></image>
				</block>
				<view class="h-text" v-if="token">
					<h4 @tap="skpikmeShow">
						<text>{{userinfors.nickname}}</text>
						<!-- <image src="../../static/image/youyou.png" mode=""></image> -->
					</h4>
					<h3>备胎豆：<text>{{userinfors.spare}}</text></h3>
					<view class="t-huo">
						<p @tap="spikAttention">关注<text>{{userinfors.guan}}</text></p>
						<p @tap="spikCollect">收藏<text>{{userinfors.shouc}}</text></p>
						<!-- <p>互动<text>0</text></p> -->
					</view>
				</view>
				<!-- #ifdef APP-PLUS -->
				<view class="loginViter" v-else>立即登陆</view>
				<!-- #endif -->

				<!-- #ifdef MP-WEIXIN -->
				<view class="loginViter" v-else @tap="spikLoginWeix">立即授权</view>
				<!-- #endif -->
				<!-- <view class="h-fiexdOne">
					领取备胎豆
				</view> -->

				<!-- <view class="h-fiexdTwe">
					<image src="../../static/image/zuji.png" mode=""></image>
					<p>足迹查询</p>
				</view> -->
			</view>
		</view>

		<view class="c-carLisk">
			<view class="c-h3">
			    <view class="left">
			     <text class="car_title">爱车信息</text>
			    </view>
			    <view class="iright" @click="spikMessageCar">
			     <image class="img" src="../../static/image/add.png" mode=""></image>
			     <text class="add-car">添加车辆</text>
			    </view>
			   </view>
				 <!-- 爱车详细信息 -->
				 <view class="c-con" v-for="(item,index) in allCar" :key="index" v-if="index<current">
				<view class="c-image">
					
					<image :src="$jointImage(item.image)" mode=""></image>
					<p >{{item.registration}}</p>
				</view>
				<view class="c-text" style="width: 180rpx;">
					<p>品牌：<text>{{item.brand.name}}</text></p>
					<p>车年份：<text>{{item.year}}</text></p>
				</view>
				<view class="c-text" style="width: 400rpx;">
					<view class="rem" @tap="remcar(item.id)">删除</view>
					<p>车型号：<text>{{item.mark.name}}</text></p>
					<p>车架号：<text>{{item.frame}}</text></p>
				</view>
			</view>
			<!-- 查看更多 -->
			<view class="gengduo">
				<text @click.stop="more" v-if="current!=allCar.length">查看更多</text>
				<text @click.stop="more1" v-else>收起</text>
				<image class="img" src="@/static/image/right_skip.png" mode=""></image>
			</view>
		</view>

		<view class="c-nav">
			<view class="h3">
				我的订单
			</view>
			<view class="c-con" >
				<view class="c-box" @tap="spikOrder" style="flex: 1;">
					<image src="../../static/image/yikouj.png" mode=""></image>
					<p>一口价订单</p>
				</view>
				<view class="c-box" @tap="spikYijiaOrder" style="flex: 1;">
					<image src="../../static/image/dingdan.png" mode=""></image>
					<p>议价订单</p>
				</view>
				<view class="c-box" @tap="spikGoUrl('../shopOrder/shopOrder')">
					<image src="../../static/image/shancgun.png" mode=""></image>
					<p>商城订单</p>
				</view>
				<!-- <view class="c-box" @tap="spikShopping">
					<image src="../../static/image/gowuche.png" mode=""></image>
					<p>购物车</p>
				</view> -->
				<view class="c-box" @tap="spikReceiving" style="flex: 1;">
					<image src="../../static/image/dimap.png" mode=""></image>
					<p>收货地址</p>
				</view>

			</view>
		</view>

		<view class="c-spwe">
			<!-- 轮播图 -->
			<view class="imgswiper" v-if="typelist == 2">
				<swiper :circular="true" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<navigator  class="swiper-item">
							<image :src="$jointImage(item.bannerimage)" mode="" class="swiperwith"></image>
						</navigator>
						
					</swiper-item>
					
				</swiper>
			</view>
			<view class="imgswiper" v-if="typelist == 1 && guangao.length != 0">
				<swiper :circular="true" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="(item,index) in guangao" :key="index">
						<navigator  class="swiper-item" :url="'/pages/store/store?id='+item.shop_id">
							<image :src="$jointImage(item.banner1image)" mode="" class="swiperwith"></image>
						</navigator>
						
					</swiper-item>
					
				</swiper>
			</view>
			<view class="imgswiper" v-if="typelist == 1 && guangao.length == 0">
				<swiper :circular="true" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="(item,index) in blankimg" :key="index">
						<navigator  class="swiper-item">
							<image :src="$jointImage(item)" mode="" class="swiperwith"></image>
						</navigator>
						
					</swiper-item>
					
				</swiper>
			</view>
		</view>

		<!-- 商家入驻	 -->
		<view class="c-ruzhu" v-if="truedata">
			<view class="h3">
				商家入驻
			</view>
			<view class="r-con">
				<view class="r-text" @tap="spikmasterAuth">
					<view class="text-t">
						<p>师傅入驻</p>
						<p>机会多，保障多</p>
					</view>
					<image src="../../static/image/shifu.png" mode=""></image>
				</view>
				<view class="r-text" style="background-color: #fde4da;" @tap="spikmerchant">
					<view class="text-t">
						<p>商户入驻</p>
						<p>规范的入驻模式</p>
					</view>
					<image src="../../static/image/shanghu.png" mode=""></image>
				</view>

			</view>
		</view>

		<view class="c-nav">
			<view class="h3">
				我的订单
			</view>
			<view class="c-con" style="flex-wrap: wrap;">
				<view class="c-box"@tap.stop="hx">
					<image src="../../static/image/dongtai.png" mode=""></image>
					<p>我的消息</p>
				</view>
				<view class="c-box" @tap="spikGoUrl1">
					<image src="../../static/image/about.png" mode=""></image>
					<p>一车帝</p>
				</view>
				<view class="c-box" @click="spikGoUr2">
					<image src="../../static/image/lianxime.png" mode=""></image>
					<p>联系我们</p>
				</view>
				<!-- <view class="c-box" @tap="spikGoUrl('../information/information')">
					<image src="../../static/image/pingtaikong.png" mode=""></image>
					<p>平台公告</p>
				</view> -->
				<view class="c-box" @tap="spikGoUrl('../hotNew/hotNew')">
					<image src="../../static/image/dongtai.png" mode=""></image>
					<p>新闻动态</p>
				</view>
				<view class="c-box" @click="download">
					<image src="../../static/image/beitaidou.png" mode=""></image>
					<p>商户管理</p>
				</view>
				<view class="c-box" @click="remuser">
					<image src="../../static/image/cheyuouquna.png" mode=""></image>
					<p>注销账户</p>
				</view>
				<view class="c-box"@tap.stop="getuserxx">
					<image src="../../static/image/xieyi.png" mode=""></image>
					<p>用户协议</p>
				</view>
				<view class="c-box"@tap.stop="getys">
					<image src="../../static/image/yingshi.png" mode=""></image>
					<p>隐私协议</p>
				</view>
				
				<!-- <view class="c-box" @tap="spikGoUrl('../carCircle/carCircle')">
					<image src="../../static/image/cheyuouquna.png" mode=""></image>
					<p>车友圈</p>
				</view> -->
				<!-- <view class="c-box" @tap="spikGoUrl('../carKnowledge/carKnowledge')">
					<image src="../../static/image/cheyuouquna.png" mode=""></image>
					<p>知识学堂</p>
				</view> -->
				<!-- <view class="c-box"> 
					<image src="../../static/image/xiaofei.png" mode=""></image>
					<p>消费记录</p>
				</view> -->
				<!-- <view class="c-box">
					<image src="../../static/image/beitaidou.png" mode=""></image>
					<p>备胎豆</p>
				</view> -->
				
			</view>
		</view>
		<!-- <view class=""><button @click="setuser">环信</button></view> -->
			<!-- 弹出框 -->
			<view class="pop" v-if="eject">
				<view class="" v-html="userxx"></view>
				
			</view>
			<!-- 蒙层 -->
			<view class="men" v-if="eject" @tap="eje"  :style="{height:windowheight}"  style="background-color: black;width: 100%;position: fixed;top: 0;opacity: 0.3;z-index: 888;">
				
			</view>
			
	</view>
</template>

<script>
	import iSwiper from '@/components/swiper/index.vue'
	// let disp = require("../../utils/broadcast");
	let WebIM = require("../../utils/WebIM")["default"];
	let __test_account__, __test_psword__;
	let disp = require("../../utils/broadcast");
	let runAnimation = true;
	export default {
		data() {
			return {
				token: uni.getStorageSync('token') || '',
				nickname: uni.getStorageSync('nickname') || '',
				avatar: uni.getStorageSync('avatar') || '',
				UserMess: {},
				//轮播图
				swiperList:[],
				guangao:[],//广告图
				// 我的全部爱车信息
				allCar: [],
				// 当前显示数据的个数
				current: 1,
				// 用户ID
				userID: '',
				//用户详情
				userinfors:[],
				//用户协议
				userxx:null,
				/* 屏幕宽度 */
				windowwidth:0,
				/* 屏幕高度 */
				windowheight:0,
				//用户协议是否弹出
				eject:false,
				//轮播图类型
				typelist:null,
				//广告图片为空
				blankimg:[],
				//控制商家入驻
				truedata:null,
				
			name: "",
			psd: "",
			grant_type: "password",
			psdFocus: "",
			nameFocus: "",
			showPassword:false,
			type:'text'
				
			}
		},
		onLoad() {
			//获取屏幕高度
			uni.getSystemInfo({
				success:(res) => {
					this.windowwidth = res.windowWidth
					this.windowheight = res.windowHeight+'px'
				}
			})
			this.kongzhiimg()//控制轮播图类型
			
			this.wayUserMessage()
			this.swiperBanner()
			
			this.getmycar()

		},
		onShow() {
			this.zhishitrue()
			// #ifdef APP
			if(!uni.getStorageSync('UID')){
				uni.clearStorageSync()
				uni.reLaunch({
					url:'/pages/login/login'
				})
			}
			// #endif
			
			this.token = uni.getStorageSync('token') || ''
			this.getmycar()
			this.getuserinfor()//获取个人信息
		},
		methods: {
			hx(){
				// uni.navigateTo({
				// 	url:'/pages/huanxinglongin/huanxinglongin'
				// })
				// if (uni.getStorageSync('myUsername')) {
				//     disp.on("em.unreadspot", message => {
				//      // me.getChatList();
				//      this.setData({
				//       // arr: me.getChatList(),
				//       unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ?
				//        "99+" : getApp().globalData.unReadMessageNum,
				//      });
				//      console.log('新消息————————')
				//     });
				//    }
				
				if(uni.getStorageSync('UID')){
					console.log(111, {
					  apiUrl: WebIM.config.apiURL,
					  user: __test_account__ || this.name.toLowerCase(),
					  pwd: __test_psword__ || this.psd,
					  grant_type: this.grant_type,
					  appKey: WebIM.config.appkey
					})
					getApp().globalData.conn.open({
					  apiUrl: WebIM.config.apiURL,
					  user: __test_account__ || this.name.toLowerCase(),
					  pwd: __test_psword__ || this.psd,
					  grant_type: this.grant_type,
					  appKey: WebIM.config.appkey
					});
					getApp().globalData.onLoginSuccess(
					  uni.getStorageSync("myUsername").toLowerCase()
					);
				}else{
					uni.showToast({
						icon:'none',
						title:'请先登陆'
					})
				}
				
				
			},
			//跳转系统通知
			// into_inform: function () {
			//   uni.redirectTo({
			//     url: "../notification/notification",
			//   });
			// },
			
			
			//控制入驻
			async zhishitrue(){
				const req = await uni.$http.get('api/jiu/useranswer/shangjiaruzhu')
				console.log('控制',req)
				this.truedata = req.data.data
			},
			
			
			
			//获取广告为空时的图片
			async getblankimg(){
				const req = await uni.$http.get('api/ke/Banner/guanggaoyuantu')
				console.log('空广告',req)
				this.blankimg = req.data.data
			},
			//控制轮播图类型
			async kongzhiimg(){
				const req = await uni.$http.get('api/ke/Banner/weizhixianzhi02')
				console.log('轮播图限制',req)
				if(req.statusCode == 200){
					console.log('asjfhsjkdfhashd jkakjdhasjk')
					this.typelist = req.data.data.action.typelist
					if(this.typelist == 2){
						this.postSwiper()//获取轮播图
					}else if(this.typelist == 1){
						this.guangaoSwiper()//获取广告图
					}
					
				}
			},
			//获取广告图片
			async guangaoSwiper() {
				const req = await uni.$http.get('api/ke/Banner/tupianguanggao02')
				console.log('广告图',req)
				this.guangao = req.data.data.action
				if(this.guangao.length == 0){
					this.getblankimg()
				}
			},
			//获取轮博图片
			async postSwiper() {
				const req = await uni.$http.get('api/ke/Banner/indexbaner02')
				console.log('轮播图',req)
				this.swiperList = req.data.data.action
				
			},
			//跳转人脸页面
			navtorenlian(){
				uni.navigateTo({
					url:'/pages/renlianshibie/renlianshibie'
				})
			},
		
			//注销账户
			 remuser(){
				 if(this.token != ''){
					 uni.showModal({
					 		editable:true,
					 		placeholderText:'请输入当前账号密码',
					 		title:'您确定要注销账号吗？',
					 		success: async (res) => {
					 			console.log(res)
					 			 if (res.confirm) {
					 				 if(res.content != ""){
					 			  const req = await uni.$http.get('api/jiu/user/canceluser',{
					 				  user_id:uni.getStorageSync('UID'),
					 				  passwod:res.content,//账号密码
					 			  })
					 			  console.log(req)
					 			  uni.showToast({
					 			  	icon:'none',
					 				title:req.data.msg,
					 				success: () => {
					 					if(req.data.msg == "注销成功"){
					 						setTimeout(()=>{
					 							uni.clearStorageSync()
					 							uni.reLaunch({
					 								url:'../login/login'
					 							})
					 						},1000)
					 					}else{
					 						uni.showToast({
					 							icon:'none',
					 							title:req.data.msg
					 						})
					 					}
					 					
					 				}
					 			  })
					 			  }else{
					 				  uni.showToast({
					 				  	icon:'none',
					 					title:'请输入密码'
					 				  })
					 			  }
					 			 }else if(res.cancel){
					 				 
					 				}
					 		}
					    })
				 }else{
					 uni.showToast({
					 	icon:'none',
						title:'请先登录'
					 })
				 }
				
			},
			
			//获取用户协议
			async getys(){
				const req = await uni.$http.get('api/jiu/xcxserver/treaty')
				console.log(req.data.data.action.privacy)
				this.userxx = req.data.data.action.privacy
				this.eject = true
			},
			
			//蒙层点击事件
			eje(){
				this.eject = false
			},
			
			//用户协议
			async getuserxx(){
				const req = await uni.$http.get('api/jiu/xcxserver/treaty')
				console.log(req.data.data.action.privacy)
				this.userxx = req.data.data.action.agreement
				this.eject = true
			},
			
			//删除车量信息
			async remcar(id){
				const req = await uni.$http.get('api/jiu/user/delcar',{
					id:id
				})
				console.log(req)
				uni.showToast({
					icon:'none',
					title:req.data.msg,
					success: () => {
						this.getmycar()
					}
				})
				
			},
			
			//获取用户个人信息
			async getuserinfor(){
				console.log('UID',uni.getStorageSync("UID"))
				const req = await uni.$http.get('api/jiu/Appuser/list',{
					user_id:uni.getStorageSync('UID')
				})
				console.log('用户个人信息',req)
				this.userinfors = req.data.data.action
			},
			
			// 联系我们
			spikGoUr2() {
				uni.navigateTo({
					url: '../conect/conect',
					fail: (res) => {
						console.log(res)
					}
				})
			},
			// 一车帝
			spikGoUrl1() {
				console.log('sahfi9hi')
				uni.navigateTo({
					url: '../about/about',
					fail: (res) => {
						console.log(res)
					}
				})
			},
			// 查看更多
			more() {
				console.log('pppppppp')
				this.current = this.allCar.length
			},
			more1(){
				this.current = 0
			},
			//获取所有爱车信息
			getmycar(){
				let that = this
				that.$http.getallcar({
					user_id:uni.getStorageSync('UID')
				})
				.then(res => {
					console.log('我的全部爱车',res)
					that.allCar = res.data.data.action
					console.log('爱车', that.allCar)
				})
			},
			
			// 小程序商家管理下载app
			download() {
				uni.navigateTo({
					url:'../download/download'
				})
			},
			//获取轮博图片
			async swiperBanner() {
				const req = await uni.$http.get('api/ke/Banner/indexbaner02')
				this.swiperList = req.data.data.action
			},
			//获取用户信息
			wayUserMessage() {
				let _this = this
				_this.$http.postUserMessage()
					.then(res => {
						console.log('用户的基本信息', res)
						_this.UserMess = res.data.data
						uni.setStorageSync('UID', res.data.data.id)
					})
			},
			//跳转商城
			spikShopping() {
				uni.switchTab({
					url: '../shopping/index'
				})
			},
			//跳转微信授权
			spikLoginWeix() {
				uni.navigateTo({
					url: '../login/loginWeixin'
				})
			},
			//公共跳转
			spikGoUrl(e) {
				// uni.showToast({
				// 	icon:'none',
				// 	title:"该功能暂未开启"
				// })
				uni.navigateTo({
					url: e,
					fail: (res) => {
						console.log('res',res)
					}
				})
			},
			//议价订单
			spikYijiaOrder() {
				uni.navigateTo({
					url: '../yijiaOrder/yijiaOrder'
				})
			},
			//跳转到收藏
			spikCollect() {
				uni.navigateTo({
					url: '../collect/collect'
				})
			},
			// 跳转我的设置界面
			navimg2() {
				uni.navigateTo({
					url: './carmechild/carset',
				})
			},
			// //跳转车辆信息界面
			spikMessageCar() {
				uni.navigateTo({
					url: './carmechild/messageCar'
				})
			},
			//跳转收货地址
			spikReceiving() {
				uni.navigateTo({
					url: './carmechild/receiving'
				})
			},
			//跳转订单
			spikOrder() {
				uni.navigateTo({
					url: './carmechild/order-car'
				})
			},
			//跳转关注界面
			spikAttention() {
				uni.navigateTo({
					url: './carmechild/attention-car'
				})
			},
			//跳转师傅认证
			async spikmasterAuth() {
				if(this.token != ''){
					
					const req = await uni.$http.get('api/jiu/xcxserver/yanzheng',{
						user_id:uni.getStorageSync("UID"),
						type:2,
					})
					console.log('师傅',req)
					if(req.data.msg == "已存在店铺认证账户"){
						uni.showToast({
							icon:'none',
							title:req.data.msg
						})
					}else{
						uni.navigateTo({
							url: './carmechild/masterAuth-car'
						})
					}
					
				}else {
					uni.showToast({
						icon:'none',
						
						title:"请先登陆后重试"
					})
				}
				
			},
			//跳转的商户认证
			async spikmerchant() {
			    if(this.token != ''){
			     
			     const req = await uni.$http.get('api/jiu/xcxserver/yanzheng',{
			      user_id:uni.getStorageSync("UID"),
			      type:1,
			     })
			     console.log('师傅',req)
			     if(req.data.msg == "已存在师傅认证账户"){
			      uni.showToast({
			       icon:'none',
			       title:req.data.msg
			      })
			     }else{
			      uni.navigateTo({
			       url: './carmechild/merchant-car',
			       fail: (err) => {
			        console.log(err)
			       }
			      })
			     }
			     // uni.navigateTo({
			     //  url: './carmechild/merchant-car'
			     // })
			    }else {
			     uni.showToast({
			      icon:'none',
			      title:"请先登陆后重试"
			     })
			    }
			    
			   },
			//跳转个人展示界面
			skpikmeShow() {
				// uni.showToast({
				// 	icon:"none",
				// 	title:"该功能暂未开启，敬请期待"
				// })
				// console.log('ee')
				// uni.navigateTo({

				// 	url: './carmechild/meShow-car'
				// })
			}
		},
		components: {
			iSwiper
		},
		
	}
</script>

<style lang="scss" scoped>
	.carMe {
		width: 100%;
		background-color: #f7f8fc;

		.c-header {
			width: 100%;
			position: relative;

			.h-top {
				text-align: right;

				image {
					width: 40rpx;
					height: 40rpx;
				}

				image:nth-child(1) {
					padding: 0 30rpx;
				}
				image:nth-child(2) {
					padding: 0 30rpx;
				}
			}

			.h-head {
				// margin-top: 20rpx;
				width: 690rpx;
				margin: 0 auto;
				padding: 10rpx 0;
				display: flex;
				align-items: center;


				image {
					border-radius: 50%;
					width: 170rpx;
					height: 170rpx;

				}

				.loginViter {
					padding-left: 30rpx;
					color: #333;
					font-size: 40rpx;
				}

				.h-text {
					padding-left: 30rpx;

					h4 {
						text {
							display: inline-block;
							font-size: 38rpx;
							letter-spacing: 4rpx;
							width: 280rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;

						}

						image {
							width: 34rpx;
							height: 34rpx;
							padding-bottom: 10rpx;
						}
					}

					h3 {
						width: 200rpx;
						margin: 20rpx 0;
						padding: 5rpx 0;
						font-size: 28rpx;
						color: #666666;
						border-radius: 30rpx;
						text-align: center;
						background-color: #dddddd;
					}

					.t-huo {
						display: flex;

						p {
							padding-right: 20rpx;
							font-size: 28rpx;
							color: #666666;

							text {
								padding-left: 10rpx;
							}
						}
					}
				}

				.h-fiexdOne {
					position: absolute;
					right: 0;
					top: 75rpx;
					background-color: #43b182;
					font-size: 26rpx;
					color: white;
					padding: 10rpx 30rpx;
					border-radius: 50rpx 0 0 50rpx;
				}

				.h-fiexdTwe {
					position: absolute;
					right: 30rpx;
					top: 170rpx;

					text-align: center;
					font-size: 26rpx;
					color: #666666;

					// letter-spacing: 2px;
					image {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}

		}

		.c-carLisk {
			width: 690rpx;
			// height: 500rpx;
			background-color: white;
			overflow: hidden;
			margin: 20rpx auto 30rpx;
			padding: 0 10rpx 20rpx;

			border: 2rpx solid #e7e7eb;
			border-radius: 20rpx;

			.c-h3 {
			    padding: 20rpx 10rpx;
			    display: flex;
			
			    .left {
			     flex: 1;
			     font-size: 32rpx;
			    }
			
			    .iright {
			     font-size: 32rpx;
			     color: #999999;
			
			     .img {
			      width: 30rpx;
			      height: 30rpx;
			      padding-right: 5rpx;
			      vertical-align: middle;
			     }
			    }
			   }
			   .c-more {
			    display: flex;
			    justify-content: flex-end;
			    font-size: 30rpx;
			    color: #999999;
			    padding: 10rpx 0;
			
			    .more {
			     padding-right: 5rpx;
			    }
			
			    .ima {
			     width: 25rpx;
			     height: 25rpx;
			     margin-top: 10rpx;
			    }
			   }
			.c-con {
					// border-bottom: 1rpx solid #43b182;
					 display: flex;
					 
					 width: 100%;
					 .c-image {
						
						 width: 190rpx;
						 text-align: center;
						 padding-top: 20rpx;
						 color: #666666;
						 
						 image {
							 border-radius: 15rpx;
							 width: 160rpx;
							 height: 120rpx;
						 }
						 p{
							 overflow: hidden;
							 text-overflow: ellipsis;
						 }
					 }
					 .c-text {
						 position: relative;
						 // width: 240rpx;
						 padding-left: 10rpx;
						 margin-top: 20rpx;
						 font-size: 23rpx;
						 color: #666666;
						 overflow: hidden;
						 white-space: nowrap;
						 text-overflow: ellipsis;
						 .rem{
							 font-size: 20rpx;
							 position: absolute;
							 right: 5rpx;
							 top: 5rpx;
							 border: #43b182 solid 1rpx;
							 padding: 5rpx 10rpx;
							 border-radius: 15rpx;
							 background-color: #43b182;
							 color: white;
						 }
						 p {
							overflow: hidden;
							-webkit-line-clamp: 1;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							
							 padding: 18rpx 0;
							 text {
								 color: #000000;
							}
						}
					 }
				 }
			// .c-con {
   //      display: flex;
			// 	width: 100%;
			// 		// flex-direction: row;
			// 		.c-image {
			// 			display: flex;
			// 			flex-direction: column;
			// 			// justify-content: center;
			// 			align-items: center;
			// 			align-content: center;
			// 			width: 250rpx;
			// 			text-align: center;
			// 			padding-top: 20rpx;
			// 			color: #666666;
					
			// 			image {
			// 				width: 160rpx;
			// 				height: 120rpx;
			// 			}
					
			// 		.c-text {
			// 			width: 300rpx;
			// 			padding-left: 10rpx;
			// 			margin-top: 20rpx;
			// 			font-size: 23rpx;
			// 			color: #666666;
			// 			overflow: hidden;
			// 			white-space: nowrap;
			// 			text-overflow: ellipsis;
					
			// 			p {
			// 				padding: 18rpx 0;
					
			// 				text {
			// 					color: #000000;
			// 				}
			// 			}
			// 		}
			// 	}
				
			// }
			.current {
				display: none;
			}
			.gengduo {
				color: #999999;
				font-size: 30rpx;
				float: right;
				.img {
					padding-left: 10rpx;
					width: 20rpx;
					height: 30rpx;
				}
			}
		}

		.c-nav {
			width: 680rpx;
			background-color: white;
			margin: 30rpx auto;
			border-radius: 20rpx;
			
			.h3 {
				padding: 20rpx;
				color: #333333;
			}

			.c-con {
				color: #666666;
				font-size: 27rpx;
				display: flex;
				padding: 10rpx;
				
				.c-box {
					width: 160rpx;
					text-align: center;
					
					image {
						padding: 20rpx 0;
						width: 54rpx;
						height: 54rpx;
					}

				}

			}
		}

		.c-ruzhu {
			width: 690rpx;
			margin: 0 auto;
			background-color: white;

			.h3 {
				padding: 20rpx;
				color: #333333;
			}

			.r-con {
				display: flex;
				justify-content: space-between;

				.r-text {
					width: 330rpx;
					background-color: #e6f4ff;
					display: flex;
					align-items: center;
					border-radius: 16rpx;

					.text-t {
						padding: 0 30rpx 0 20rpx;
						font-size: 28rpx;

						p:nth-child(1) {
							color: #666666;
							padding-bottom: 10rpx;
						}

						p:nth-child(2) {
							font-size: 23rpx;
							color: #999999;
						}
					}

					image {
						padding: 10rpx;
						box-sizing: border-box;
						width: 110rpx;
						height: 120rpx;
					}
				}
			}
		}
	}
	.pop{
		width: 80%;
		height: 800rpx;
		overflow: auto;
		background-color: #ffffff;
		padding: 10rpx 10rpx;
		position: fixed;
		top: 10%;
		left: 10%;
		border-radius: 15rpx;
		z-index: 999;
		padding: 20rpx 10rpx;
	}
	.imgswiper{
		width: 90%;
		margin: auto;
		height: 300rpx;
		margin: 20rpx auto;
		/* background-color: aqua; */
	}
	.imgswiper>swiper{
		height: 100%;
		width: 100%;
		text-align: center;
	}
	.swiperwith{
		width: 100%;
		height: 300upx;
		border-radius: 20rpx;
	}
</style>
