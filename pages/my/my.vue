<template>
	<view>
		<!-- 头部占位符 -->
		 <view class="status_bar">
		    <!-- 这里是状态栏 -->
		</view>
		<!-- 用户信息 -->
		<view class="username">
			<view class="mys">个人中心</view>
			<!-- 背景图 -->
			<image class="baimg" src="@/static/mybackground/myback.png" mode=""></image>
			<!-- 用户详细信息 -->
			<view class="userinfor">
					<!-- 用户名 -->
					<view class="userallname">
						<view class="userheadimg">
							<image :src="userimg" mode=""></image>
						</view>
						<view class="userid">
							<view class="useridname">
								<strong>{{username}}</strong>
								<view class="vip">V{{dengji}}</view>
							</view>
							<view class="useridid" v-if="userxx.is_ren == 1">
								已认证专家
							</view>
							<view class="useridid" style="background-color: #2c2c2c;" v-if="userxx.is_ren == 0" @tap="renz()">
								{{shenghe}}
							</view>
						</view>
						<view class="edit" @click="navtomyinfor()">
							<view>编辑</view>
						</view>
					</view>
					<!-- 用户功能 -->
					<view class="userbotfun">
						<view class="usermoney" @click="navtowallet()">
							<image src="@/static/indexiconfont/money.png" mode=""></image>
							<view>钱包</view>
						</view>
						<!-- <view class="usermoney" @click="navtopinlun()">
							<image src="@/static/mybackground/fabu.png" mode=""></image>
							<view>评价</view>
						</view> -->
						<view class="usermoney" @click="navtoguanzhu()">
							<image src="@/static/indexiconfont/guanzhu.png" mode=""></image>
							<view>关注</view>
						</view>
					</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="myords">
			<view class="myords_box">
				<view class="myordstext">店铺订单</view>
				<view class="displaylist">
					<view class="myords_list" @click="navtoordinfor(0)">
						<view class=""><image src="../../static/indexiconfont/sehbeixinxi.png" mode=""></image> </view>
						<view>一口价订单</view>
					</view>
					<view class="myords_list"  @click="navtoordinfor(1)">
						<view class=""><image src="../../static/indexiconfont/xiangmuxinxi.png" mode=""></image> </view>
						<view>议价订单</view>
					</view>
					<view class="myords_list"  @click="navtoshopord()">
						<view class=""><image src="../../static/indexiconfont/dingdan.png" mode=""></image> </view>
						<view>商城订单</view>
					</view>
				</view>
				
			</view>
		</view>
		<!-- 用户列表 -->
		<view class="funlist">
			<view class="funalllist" v-for="(item,index) in useralllist" :key="index" @click="navto(index)">
				<view class="funalllistimg"><!-- <image :src="item.funimg" mode=""></image> -->{{item.name}}</view>
				<image src="@/static/indexiconfont/rightjt.png" mode=""></image>
			</view>
			<view class="funalllist" @tap="tuiguang">
				<view class="funalllistimg">推广码</view>
				<image src="@/static/indexiconfont/rightjt.png" mode=""></image>
			</view>
			<view class="funalllist" @tap="remuser">
				<view class="funalllistimg">注销账户</view>
				<image src="@/static/indexiconfont/rightjt.png" mode=""></image>
			</view>
			<view class="funalllist" @tap="getuserxx">
				<view class="funalllistimg">用户协议</view>
				<image src="@/static/indexiconfont/rightjt.png" mode=""></image>
			</view>
			<view class="funalllist" @tap="getys">
				<view class="funalllistimg">隐私协议</view>
				<image src="@/static/indexiconfont/rightjt.png" mode=""></image>
			</view>
			<!-- 退出按钮 -->
			<view class="tuicu" @click="remcle()">
				退出
			</view>
			
		</view>
		<!-- 弹出层 -->
		<!-- <view class="tanchu" v-if="kdtf">
			<view class="title"><strong>更多功能请前往PC后台管理系统</strong></view>
			<view class="title"><text>https://xcx.yichedi.com/manystore</text> </view>
		</view> -->
		
		<!-- 屏幕蒙层 -->
		<view class="men" @click="none()" v-if="kdtf" :style="{height:windowheight}"  style="background-color: black;width: 100%;position: fixed;top: 0;opacity: 0.3;z-index: 888;">
			
		</view>
		
		
		<!-- 弹出框 -->
		<view class="pop" v-if="eject">
			<view class="">
				{{userxxs}}
			</view>
			
		</view>
		<view class="mapop" v-if="ma">
			<view class="title">推广码</view>
			<text class="" >{{userxx.plug}}</text>
		</view>
		<!-- 蒙层 -->
		<view class="men" v-if="eject" @tap="eje"  :style="{height:windowheight}"  style="background-color: black;width: 100%;position: fixed;top: 0;opacity: 0.3;z-index: 888;">
			
		</view>
		<!-- 蒙层 -->
		<view class="ma" v-if="ma" @tap="mact"  :style="{height:windowheight}"  style="background-color: black;width: 100%;position: fixed;top: 0;opacity: 0.3;z-index: 888;">
			
		</view>
		
		<!-- 占位 -->
		<view class="zw">
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//推广码
				ma:false,
				//是否显示蒙层
				kdtf:false,
				//获取用户token
				token:uni.getStorageSync('token') || null,
				//用户头像
				// userimg:uni.getStorageSync('avatar') || null,
				userimg:null,
				//用户名
				username:null,
				//用户展示id
				user_id:uni.getStorageSync('user_id') || null,
				/* 用户功能列表 */
				useralllist:[
					{'funimg':'../../static/indexiconfont/suo.png','name':'修改密码'},
					// {'funimg':'../../static/mybackground/luntai.png','name':'备胎豆'},
					// {'funimg':'../../static/mybackground/baozhenjing.png','name':'保证金管理'},
					// {'funimg':'../../static/indexiconfont/fjdr.png','name':'等级申请'},
					// {'funimg':'../../static/indexiconfont/fjdr.png','name':'商户管理'},
				],
				//用户等级
				dengji:0,
				//用户个人信息
				userxx:[],
				//用户协议
				userxxs:null,
				/* 屏幕宽度 */
				windowwidth:0,
				/* 屏幕高度 */
				windowheight:0,
				//用户协议是否弹出
				eject:false,
				//审核中
				shenghe:'申请专家',
				//
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
			this.userInfor()
			this.imageUrl()
		},
		onShow() {
			// this.username = uni.getStorageSync('nickname') || null
			// this.userimg = uni.getStorageSync('avatar') || null
			this.userInfor()
			this.imageUrl()
		},
		methods: {
			mact(){
				this.ma = false
			},
			tuiguang(){
				this.ma = true
			},
			//认证专家
			async renz(){
				const req = await uni.$http.post('api/jiu/advert/proficient',{
					user_id:uni.getStorageSync('user_id')
				})
				console.log('req',req)
				uni.showToast({
					icon:"none",
					title:req.data.msg
				})
				this.shenghe = this.userxx.shenqing
			},
			//跳转商城订单页面
			navtoshopord(){
				uni.navigateTo({
					url:'/pages/shoporde/shoporde'
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
					 			  const req = await uni.$http.get('api/jiu/user/cancelshang',{
					 				  user_id:uni.getStorageSync('user_id'),
					 				  passwod:res.content,//账号密码
					 			  })
					 			  console.log(req)
					 			  uni.showToast({
					 			  	icon:'none',
					 				title:req.data.msg,
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
			//获取隐私协议
			async getys(){
				const req = await uni.$http.post('api/jiu/yinsixieyi/shanghuxieyi')
				// console.log(req.data.data.action.privacy)
				this.userxxs = req.data.data
				this.eject = true
			},
			
			//蒙层点击事件
			eje(){
				this.eject = false
			},
			
			//用户协议
			async getuserxx(){
				const req = await uni.$http.post('api/jiu/yinsixieyi/userxieyi')
				// console.log(req.data.data.action.agreement)
				this.userxxs = req.data.data
				this.eject = true
			},
			
			
			//用户个人信息
			async userInfor(){
				const req = await uni.$http.get('api/jiu/user/userinfo',{
					user_id:uni.getStorageSync('user_id'),
					type:uni.getStorageSync('type')
				})
				console.log('用户信息',req)
				this.userxx = req.data.data.action
				this.dengji = req.data.data.action.grade
				this.username = req.data.data.action.nickname
				uni.setStorageSync('nickname',req.data.data.action.nickname)
			},
			
			
			//判断图片是否为网络路径
			imageUrl(){
			  let url = uni.getStorageSync('avatar')
			  let str = RegExp('http');
			  let newUrl;
			  //通过三元运算符进行判断该图片是否含有http域名，没有就拼接上去https://xcx.yichedi.com/
			  str.test(url) ? newUrl = url : newUrl = 'https://xcx.yichedi.com/' + url;
			  this.userimg = newUrl
			  // return newUrl
			},
			
			
			//点击显示弹框
			kdtrue(){
				this.kdtf = true
			},
			//点击蒙层的时候关闭
			none(){
				this.kdtf = false
			},
			//跳转关注
			navtoguanzhu(){
				uni.navigateTo({
					url:'../guanzhu/guanzhu'
				})
			},
			
			//跳转评论页面
			navtopinlun(){
				uni.navigateTo({
					url:'../pinlun/pinlun'
				})
			},
			
			
			//跳转个人信息页
			navtomyinfor(){
				if(uni.getStorageSync('type') == 1){//type等于1就是商家
					uni.navigateTo({
						url:'../shopinfor/shopinfor'
					})
				}else if(uni.getStorageSync('type') == 2){//type等于2就是用户
					uni.navigateTo({
						url:'../myinfor/myinfor'
					})
				}
				
			},
			//清空缓存
			remcle(){
				// clearInterval(getApp().globalData.setinterTime);
				uni.clearStorageSync()
				uni.reLaunch({
					url:'../loning/loning'
				})
			},
			//跳转个人订单列表页
			navtoordinfor(i){
				uni.navigateTo({
					url:'../ordsinfor/ordsinfor?indexclass='+i
				})
			},
			//个人中心的底部列表跳转
			navto(index){
				if(index == 0){//0为修改密码跳转
					uni.navigateTo({
						url:'../edpaw/edpaw'
					})
				}else /* if(index == 1){//跳转备胎豆
					// uni.navigateTo({
					// 	url:'../beitaidou/beitaidou'
					// })
				}else */ if(index == 1){//跳转等级申请
					this.kdtrue()
					// uni.navigateTo({
					// 	url:'../dengjishenqing/dengjishenqing'
					// })
				}else if(index == 3){
					this.kdtrue()
				}
			},
			//跳转钱包
			navtowallet(){
				uni.navigateTo({
					url:'../wallet/wallet'
				})
			}
			
			
		}
	}
</script>


<style scoped lang="scss">
//头部占位符
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.username{
		position: relative;
		padding-top: 30rpx;
		width: 100%;
		height: 550rpx;
		.mys{
			width: 150rpx;
			text-align: center;
			color: white;
			margin:30rpx auto;
		}
		.baimg{
			width: 100%;
			height: 350rpx;
			position: absolute;
			top: 0rpx;
			left: 0rpx;
			z-index: -1;
		}
		.userinfor{
			height: 400rpx;
			width: 85%;
			margin:50rpx auto;
			background-color: white;
			border-radius: 20rpx;
			box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
			.userallname{
				position: relative;
				width: 100%;
				height: 200rpx;
				border-bottom: 1rpx solid gainsboro;
				display: flex;
				.userheadimg{
					image{
						border-radius: 50%;
						height: 150rpx;
						width: 150rpx;
						margin-top: 25rpx;
						margin-left: 15rpx;
					}
				}
				.userid{
					margin-top: 70rpx;
					margin-left: 20rpx;
					.useridname{
						position: relative;
						.vip{
							position: absolute;
							top: 0rpx;
							right: -80rpx;
							background-color: #222222;
							color: #d9cd43;
							padding: 2rpx 20rpx;
							font-size: 25rpx;
							border-radius: 20rpx;
						}
					}
					.useridid{
						font-size: 20rpx;
						background-color: #45b787;
						border-radius: 20rpx;
						width: 130rpx;
						text-align: center;
						color: white;
					}
				}
				.edit{
					position: absolute;
					right: -1rpx;
					bottom: 34rpx;
					background-color: #45b787;
					padding: 14rpx 50rpx;
					border-radius: 30rpx 0rpx 0rpx 30rpx;
					color: white;
				}
			}
			.userbotfun{
				display: flex;
				justify-content: space-around;
				.usermoney{
					margin-top: 50rpx;
					text-align: center;
					image{
						height: 40rpx;
						width: 40rpx;
					}
				}
			}
		}
		
	}
	.myords{
		width: 100%;
		margin-bottom: 30rpx;
		.myords_box{
			width: 90%;
			margin: auto;
			box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
			border-radius: 20rpx;
			// height: 300rpx;
			padding: 20rpx 0rpx;
			.myordstext{
				margin-left: 46rpx;
				margin-bottom: 30rpx;
			}
			.displaylist{
				display: flex;
				justify-content: space-around;
				width: 100%;
				.myords_list{
					text-align: center;
					color: #7d7d7d;
					image{
						height: 50rpx; 
						width: 50rpx;
					}
				}
			}
			
		}
	}
	.funlist{
		width: 85%;
		margin: auto;
		padding: 30rpx 0rpx;
		box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
		border-radius: 15rpx;
		position: relative;
		image{
			height: 30rpx;
			width: 30rpx;
		}
		.funalllist{
			display: flex;
			justify-content: space-between;
			width: 90%;
			margin: auto;
			padding: 15rpx 10rpx;
			.funalllistimg{
				image{
					margin-right: 10rpx;
				}
			}
		}
		.tuicu{
			position: absolute;
			bottom: -174rpx;
			left: 184rpx;
			box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
			padding: 26rpx 104rpx;
			border-radius: 20rpx;
		}
	}
	.zw{
		height: 300rpx;
	}
	.tanchu{
		width: 80%;
		height: 500rpx;
		background-color: white;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		// transform: translateY(-50%);
		z-index: 999;
		.title{
			width: 100%;
			text-align: center;
			margin-top: 20rpx;
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
.mapop{
		width: 80%;
		height: 400rpx;
		overflow: auto;
		background-color: #a7a7a7;
		color: white;
		margin-top: 100rpx;
		text-align: center;
		padding: 10rpx 10rpx;
		position: fixed;
		top: 30%;
		left: 10%;
		border-radius: 15rpx;
		z-index: 999;
		padding: 20rpx 10rpx;
		.title{
			padding: 30rpx;
			font-size: 35rpx;
			font-weight: 700;
			margin-bottom: 30rpx;
		}
	}
</style>
