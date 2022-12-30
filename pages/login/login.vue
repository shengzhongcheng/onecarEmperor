<template>
	<!-- 登入界面 -->
	<view class="login">
		<view class="login-content">
			<!-- 头部x -->
			<!-- <view class="logiExit">
				<image src="../../static/image/deldel.png" mode=""></image>
			</view> -->
			<view class="login-title">欢迎登陆</view>
			<view class="loginInput">
				<input class="input" type="text" placeholder="请输入手机号" v-model="telnumber">
				<view class="inputFiexd" @click="remtelnumber()"><!-- 删除输入的手机号 -->
					<image src="../../static/image/del2.png" mode=""></image>
				</view>
			</view>
			<view class="loginInput">
				<input class="input" type="text" placeholder="请输入验证码" v-model="telcode">
				<view class="inputFiexd"  @click="remtelcode()"><!-- 删除输入的验证码 -->
					<image src="../../static/image/del2.png" mode=""></image>
				</view>
			</view>
			<view class="loginLeg">
				<view @tap="spikLoginUser">账户密码登陆</view>
				<view @tap="shifuzhuche" v-if="zhuche">立即注册</view>
			</view>
			<view class="loginBtn" @tap="$u.throttle(getvcode, 2000)" v-show="telcode == ''"><!-- 验证码等于空的时候显示 -->
				获取验证码{{timeout || ''}}
			</view>
			<view class="loginBtn" @click="getlogin()" v-show="telcode != '' && telnumber != ''"><!-- 验证码和手机号不等于空的时候显示登录 -->
				登录
			</view>
			<view class="loginMess">
				<label class="radio" @tap="radioBoolBtn">
					<radio value="" :checked="radioBool"/><view>勾选表示同意<text @tap.stop="getuserxx">用户协议</text>和<text @tap.stop="getys">隐私协议</text></view>
				</label>
			</view>
			<view class="loginFiex" v-if="wei">
				<view class="fiexBox" @click="wxlogin()">
					<image src="../../static/image/lomg02.png" mode=""></image>
					<text>微信登陆</text>
				</view>
				<!-- <view class="fiexBox">
					<image src="../../static/image/lomg01.png" mode=""></image>
					<text>扫码邀请登陆</text>
					
				</view> -->
			</view>	
		</view>	
		<!-- 弹出框 -->
		<view class="pop" v-if="eject">
			<view class="" >{{userxx}}</view>
		</view>
		<!-- 蒙层 -->
		<view class="men" v-if="eject" @tap="eje"  :style="{height:windowheight}"  style="background-color: black;width: 100%;position: fixed;top: 0;opacity: 0.3;z-index: 888;">
			
		</view>
		
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				//选中框
				radioBool:false,
				//接受手机号
				telnumber:'',
				//接收验证码
				telcode:'',
				//倒计时时间
				timeout:'',
				//用户协议
				userxx:null,
				/* 屏幕宽度 */
				windowwidth:0,
				/* 屏幕高度 */
				windowheight:0,
				//用户协议是否弹出
				eject:false,
				//微信是否影藏
				wei:null,
				//注册影藏
				zhuche:null,
				
			}
		},
		onLoad() {
			this.yingzhuche()
			//获取屏幕高度
			uni.getSystemInfo({
				success:(res) => {
					this.windowwidth = res.windowWidth
					this.windowheight = res.windowHeight+'px'
				}
			})
			// this.getuserxx()
			this.weixing()
		},
		onShow() {
			
		},
		methods:{
			//隐藏显示注册师傅
			async yingzhuche(){
				const req = await uni.$http.get('api/jiu/advert/yincangzhuce')
				console.log(req)
				this.zhuche = req.data.data
			},
			
			//跳转注册师傅
			shifuzhuche(){
				uni.navigateTo({
					url:"/pages/apply/apply"
				})
			},
			
			//是否隐藏微信
			async weixing(){
				const req = await uni.$http.get('api/jiu/useranswer/yicangweilogin')
				 console.log(req)
				 this.wei = req.data.data
				 console.log(this.wei)
			},
			//获取隐私协议
			async getys(){
				const req = await uni.$http.post('api/jiu/yinsixieyi/shanghuxieyi')
				// console.log(req.data.data.action.privacy)
				this.userxx = req.data.data
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
				this.userxx = req.data.data
				this.eject = true
			},
			//获取验证码
			async getvcode(){
				if(this.telnumber != '' && this.radioBool == true){
					const req = await uni.$http.post('api/sms/send',{
						mobile:this.telnumber,
						event:"mobilelogin"
					})
					console.log(req)
					uni.showToast({
						icon:"none",
						title:req.data.msg
					})
					
					if(req.data.msg == "发送成功"){
						//倒计时
						let t = 60
						let outtime = setInterval(()=>{
							t--
							this.timeout = t
							console.log(this.timeout)
							if(t == 0){
								clearInterval(outtime)
								this.timeout = ''
								
							}
							
						},1000)
					}
					
					
				}else {
					uni.showToast({
						icon:"none",
						title:"请输入手机号并勾选用户协议"
					})
				}
				
				
			},
			//登录
			async getlogin(){
				const req = await uni.$http.get('api/jiu/login/mobilelogin',{
					mobile:this.telnumber,
					captcha:this.telcode
				})
				console.log(req)
				if(req.data.msg == "登录成功"){//登陆成功保存token跳转首页
					console.log(req.data.data.token.type)
					uni.setStorageSync('token',req.data.data.token.token)//用户token
					uni.setStorageSync('type',req.data.data.token.type)//type为1是店铺为2是师傅
					uni.setStorageSync('nickname',req.data.data.token.nickname)//用户名
					uni.setStorageSync('avatar',req.data.data.token.avatar)//用户头像
					uni.setStorageSync('user_id',req.data.data.token.id)//用户id
					uni.switchTab({
						url:'../index/index',
					})
				}else{
					uni.showToast({
						icon:"none",
						title:req.data.msg
					})
				}
				
				
			},
			
			
			//调用微信登录
			 wxlogin(){
				 if(this.radioBool != false){
					 uni.login({
					 	 success: async (res) => {
					 		console.log('登录成功',res)
					 		const unionid = res.authResult.unionid
					 		const openid = res.authResult.openid
					 		// console.log(unionid)
					 		if(unionid != null && unionid != undefined){
					 			let req = await uni.$http.get('api/jiu/login/getinfo',{
					 				unionid:unionid,
					 				openid:openid
					 			})
					 			console.log('1',req)
					 				if(req.data.msg == "登录成功"){//登陆成功保存token跳转首页
					 					console.log(req.data.data.token.type)
					 					uni.setStorageSync('token',req.data.data.token.token)//用户token
					 					uni.setStorageSync('type',req.data.data.token.type)//type为1是店铺为2是师傅
					 					uni.setStorageSync('nickname',req.data.data.token.nickname)//用户名
					 					uni.setStorageSync('avatar',req.data.data.token.avatar)//用户头像
					 					uni.setStorageSync('user_id',req.data.data.token.id)//用户id
					 					uni.switchTab({
					 						url:'../index/index',
					 					})
					 				}else{
					 					uni.showToast({
					 						icon:"none",
					 						title:req.data.msg
					 					})
					 				}
					 		}
					 		
					 	},
					 
					 })
				 }else{
					 uni.showToast({
					 	icon:"none",
						title:'请勾选用户协议'
					 })
				 }
				

			},

			
			//选中协议
			radioBoolBtn(){
				this.radioBool = !this.radioBool
			},
			//跳转首页
			navtoindex(){
				
			},
			//跳转账户密码登陆界面
			spikLoginUser(){
				uni.navigateTo({  
					url:'./loginUser',
					fail(res) {
						console.log(res)
					}
				})
			},
			//删除手机号输入框
			remtelnumber(){
				this.telnumber = ''
			},
			//删除验证码输入框
			remtelcode(){
				this.telcode = ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login{
		
		.login-content{
			width: 690rpx;
			margin: 0rpx auto;
			.logiExit{
				text-align: right;
				padding-right: 30rpx;
				image{
					width: 40rpx;
					height: 40rpx;
				}
			}
			.login-title{
				margin-top: 100rpx;
				color: #333333;
				font-size: 38rpx;
				letter-spacing: 3rpx;
			}
			.loginInput{
				width: 100%;
				margin-top: 50rpx;
				padding: 30rpx 0;
				font-size: 34rpx;
				letter-spacing: 2rpx;
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				border-bottom: 2rpx solid #8b8b8b;
				.input{
					// color: #999999;
				}
				.inputFiexd{
					width:35rpx;
					height:35rpx;
					padding-right: 30rpx;
					border-radius: 50%;
					image{
						width:100%;
						height: 100%;
					}
				}
			}
		
			.loginLeg{
				display: flex;
				justify-content: space-between;
				padding: 30rpx 0;
				font-size: 28rpx;
				color:#45b787;
			}
			.loginBtn{
				border-radius: 50rpx;
				padding: 20rpx 0;
				color: #ffffff;
				text-align: center;
				background-color: #45b787;
			}
			.loginMess{
				margin-top: 20rpx;
				.radio{
					display: flex;
					align-items: center;
					view{
						color: #999999;
						font-size: 26rpx;
						letter-spacing: 2rpx;
						text{
							color: #45b787;
						}
					}
				}
			}
		
			.loginFiex{
				display: flex;
				justify-content: center;
				margin-top: 100rpx;
				.fiexBox{
					padding: 0 30rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					image{
						width: 100rpx;
						height: 100rpx;
					}
					text{
						padding-top: 30rpx;
						font-size: 26rpx;
						color: #999999;
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
			top: 15%;
			left: 10%;
			border-radius: 15rpx;
			z-index: 999;
			padding: 20rpx 10rpx;
		}
	}
	
</style>