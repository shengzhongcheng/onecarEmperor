<template>
	<!-- 忘记密码 -->
	<view class="loginForget">
		<view class="login-content">
			<view class="logiExit">
				
			</view>
			<view class="login-title">找回密码</view>
			<view class="loginInput" >
				<input class="input" type="text" placeholder="请输入手机号" v-model="telnum">
				<view class="inputFiexd">
					
				</view>
			</view>   
			<view class="loginInput">
				<input class="input" type="text" placeholder="输入验证码" v-model="vcode">
				<view class="text">
					<view class="" @tap="outtimef" v-if="timeout == ''" >获取验证码</view>
					
					<view class="" v-else>{{timeout}}</view>
				</view>	
			</view>
			<!-- <view class="logwanj" @tap="spikLoginForget">
				收不到验证码？
			</view> -->
			<view class="loginInput" >
				<input class="input" type="password" placeholder="输入密码" v-model="paw">
				<view class="inputFiexd">
					
				</view>
			</view>   
			<view class="loginInput" >
				<input class="input" type="password" placeholder="确认密码" v-model="pawure">
				<view class="inputFiexd">
					
				</view>
			</view>   
			<view class="loginBtn" @tap="zhuce">
				确认   
			</view>
		</view>	
	</view>
</template>

<script>
	export default{
		data(){
			return{
				//倒计时接受
				timeout:'',
				//手机号
				telnum:null,
				//验证码
				vcode:null,
				//密码
				paw:null,
				//确认密码
				pawure:null,
			}
		},
		methods:{
			//找回密码
			async zhuce(){
				console.log(this.telnum,this.vcode,this.paw,this.pawure)
				if(this.telnum != null && this.vcode != null && this.paw != null && this.pawure != null){
					const req = await uni.$http.get('api/jiu/login/fogetpwd',{
						mobile:this.telnum,
						captcha:this.vcode,
						password:this.paw,
						erpassword:this.pawure
					})
					uni.showToast({
						icon:"none",
						title:req.data.msg,
						success: (res) => {
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1000)
						}
					})
				}else{
					uni.showToast({
						icon:"none",
						title:'请输入全部信息'
					})
				}
				
			},
			
			
			
			//倒计时并发送验证码
			async outtimef(){
				if(this.telnum != null){
					const req = await uni.$http.post('api/sms/send',{
						mobile:this.telnum,
						event:'mobilelogin'
					})
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
						title:'请输入手机号'
					})
				}
				
				
				
			}
			
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.loginForget{
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
				margin-bottom: 50rpx;
				margin-top: 50rpx;
				color: #333333;
				font-size: 38rpx;
				letter-spacing: 3rpx;
			}
			.loginInput{
				width: 100%;
				padding: 50rpx 0 20rpx;
				font-size: 34rpx;
				letter-spacing: 2rpx;
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				border-bottom: 2rpx solid #8b8b8b;
				.input{
					// color: #999999;
				}
				.text{
					font-size: 26rpx;
					background-color: #45b787;
					color: #ffffff;
					border-radius: 30rpx;
					padding: 15rpx;
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
				margin-top: 50rpx;
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
</style>