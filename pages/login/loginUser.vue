<template>
	<!-- 账户密码登入 -->
	<view class="loginUser">
			<view class="login-content">
				<!-- <view class="logiExit">
					<image src="../../static/image/deldel.png" mode=""></image>
				</view> -->
				<view class="login-title">账户密码登陆</view>
				<view class="loginInput">
					<input class="input" type="text" placeholder="请输入手机号" v-model="accountnumber">
					<view class="inputFiexd" @click="remtemlnum()" ><!-- 点击清除输入框账号 -->
						<image src="../../static/image/del2.png" mode=""></image>
					</view>
				</view>   
				<view class="loginInput">
					<input class="input" type="password" placeholder="密码" v-model="paw">
					<view class="inputFiexd" @click="rempaw()"><!-- 点击清除输入框密码 -->
						<image src="../../static/image/del2.png" mode=""></image>
					</view>
				</view>
				<view class="logwanj" @tap="spikLoginForget">
					忘记密码？
				</view>
				<view class="loginBtn" @click="userlogin()">
					登陆
				</view>
				<view class="loginMess">
					<label class="radio" @tap="radioBoolBtn">
						<radio value="" :checked="radioBool"/><view>勾选表示同意<text @tap.stop="getuserxx">用户协议</text>和<text @tap.stop="getys">隐私协议</text></view>
					</label>
				</view>
				<view class="loginFiex">
					<!-- <view class="fiexBox" @click="wxlogin()">
						<image src="../../static/image/lomg02.png" mode=""></image>
						<text>微信登陆</text>
					</view> -->
					<!-- <view class="fiexBox">
						<image src="../../static/image/lomg01.png" mode=""></image>
						<text>扫码邀请登陆</text>
					</view> -->
				</view>	
			</view>	
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
	export default{
		data(){
			return{
				radioBool:false,
				//接收账号输入框
				accountnumber:'',
				//接收密码
				paw:'',
				//用户协议
				userxx:null,
				/* 屏幕宽度 */
				windowwidth:0,
				/* 屏幕高度 */
				windowheight:0,
				//用户协议是否弹出
				eject:false,
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
			// this.getuserxx()
		},
		methods:{
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
				console.log(req.data.data.action.agreement)
				this.userxx = req.data.data.action.agreement
				this.eject = true
			},
			//账号密码登录
			async userlogin(){
				if(this.radioBool != false){
					if(this.accountnumber != '' && this.paw != ''){
						let req = await uni.$http.get('api/jiu/login/login',{
							username:this.accountnumber,
							password:this.paw
						})
						uni.showToast({
							icon:"none",
							title:req.data.msg
						})
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
						console.log(req)
						
					}else{
						uni.showToast({
							icon:"none",
							title:'请输入账号密码'
						})
					}
					
				}else{
					uni.showToast({
						icon:"none",
						title:'请勾选用户协议'
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
								console.log(unionid)
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
			
			//协议选择按钮
			radioBoolBtn(){
				this.radioBool = !this.radioBool
			},
			//点击清除账号框
			remtemlnum(){
				this.accountnumber = ''
			},
			//点击清除密码框
			rempaw(){
				this.paw = ''
			},
			//跳转忘记密码
			spikLoginForget(){
				uni.navigateTo({
					url:'./loginForget'
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.loginUser{
		.login-content{
			width: 690rpx;
			margin: 0 auto;
			.logiExit{
				text-align: right;
				padding-right: 30rpx;
				image{
					width: 40rpx;
					height: 40rpx;
				}
			}
			.login-title{
				margin-top: 50rpx;
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
			.logwanj{
				padding-top: 10rpx;
				font-size: 26rpx;
				color: #45b787;
			}
			.loginBtn{
				margin-top: 40rpx;
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
</style>