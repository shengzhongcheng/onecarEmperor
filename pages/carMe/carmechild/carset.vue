<template>
	<!-- 设置 -->
	<view class="carset">
		<view class="carset_con" style="margin: 20rpx 0;" @tap="spikcontrol">
			<view class="carset_left">账户管理</view>
			<view class="carset_right">
				<view></view>
				<image src="../../../static/image/right_skip.png"></image>
			</view>
		</view>
		<!-- #ifdef APP -->
			<view class="carset_con" style="margin: 20rpx 0;" @tap="wxlogin" v-if="userinfors.appopenid == '' ">
				<view class="carset_left">绑定微信</view>
				<view class="carset_right">
					<view></view>
					<image src="../../../static/image/right_skip.png"></image>
				</view>
			</view>
			<view class="carset_con" style="margin: 20rpx 0;" v-else>
				<view class="carset_left">绑定微信</view>
				<view class="carset_right">
					<view>{{userinfors.username}}</view>
					<image src="../../../static/image/right_skip.png"></image>
				</view>
			</view>
		<!-- #endif -->
		
		
		
		<!-- <view class="carset_menu">
			
			<view class="carset_con">
				<view class="carset_left">介绍</view>
				<view class="carset_right">
					<view>快来添加个人信息吧,让更多人认识你!</view>
					<image src="../../../static/image/right_skip.png"></image>
				</view>
			</view>
			<view class="carset_con">
				<view class="carset_left">手机号</view>
				<view class="carset_right">
					<view>133****1234</view>
					<image src="../../../static/image/right_skip.png"></image>
				</view>
			</view>
			<view class="carset_con">
				<view class="carset_left">修改密码</view>
				<view class="carset_right">
					<view></view>
					<image src="../../../static/image/right_skip.png"></image>
				</view>
			</view>
			<view class="carset_con">
				<view class="carset_left">车辆信息</view>
				<view class="carset_right">
					<view></view>
					<image src="../../../static/image/right_skip.png"></image>
				</view>
			</view>
			
		</view> -->

	</view>
</template>

<script>
	export default{
		data(){
			return{
				//储存用户token
				// token:uni.getStorageSync('token') || null,
				//选中框
				radioBool:false,
				//接受手机号
				telnumber:'',
				//接收验证码
				telcode:'',
				//倒计时
				timeOut:'',
				//微信名称
				wxname:'',
				//用户全部信息
				userinfors:[],
				
			}
		},
		onLoad() {
			console.log('UID',uni.getStorageSync('UID'))
			this.getuserinfor()
		},
		onShow() {
			console.log('UID',uni.getStorageSync('UID'))
			this.getuserinfor()
		},
		methods:{
			//用户个人信息
			async getuserinfor(){
				const req = await uni.$http.get('api/jiu/Appuser/list',{
					user_id:uni.getStorageSync('UID')
				})
				console.log('用户个人信息',req)
				this.userinfors = req.data.data.action
			},
			
			//绑定微信
			wxlogin(){
				uni.login({
					 success: async (res) => {
						console.log('登录成功',res)
						const access_token = res.authResult.access_token
						const openid = res.authResult.openid
						const unionid = res.authResult.unionid
						console.log(access_token)
						console.log(openid)
							let req = await uni.$http.get('api/jiu/login/bangding',{
								token:access_token,
								openid:openid,
								user_id:uni.getStorageSync("UID")
							})
							console.log('1',req)
							// this.wxname = req.data.data.action
							uni.showToast({
								icon:"none",
								title:req.data.msg,
								
							})
						
						
					},
			
				})
			
			},
			
			
			spikcontrol(){
				uni.navigateTo({
					url:'./control'
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.carset{
		width: 100%;
		color: #333333;
		background-color: #f7f8fc;
		
		.carset_con{
			width: 100%;
			padding: 30rpx 0;
			display: flex;
			justify-content: space-between;
			background-color: #ffffff;
			.carset_left{
				padding-left: 30rpx;
			}
			.carset_right{
				display: flex;
				align-items: center;
				color: #666666;
				font-size: 26rpx;
				padding-right: 30rpx;
				
				view{
					letter-spacing: 2rpx;
				}
				image{
					padding-left: 20rpx;
					width: 20rpx;
					height: 30rpx;
				}
				
			}
		}
		
		.carset_menu{
			.carset_con{
				border-bottom: 2rpx solid #e1e1e1;
			}
			.carset_con:last-child{
				border-bottom: none;
			}
		}
	}

</style>
