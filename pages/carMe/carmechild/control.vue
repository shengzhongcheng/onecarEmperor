<template>
	<!-- 账户管理 -->
	<view class="control">
		<view class="carset_menu">
			<view class="carset_con" @tap="headimg">
				<view class="carset_left">更换头像</view>
				<view class="carset_right">
					<view class="right_image"><image :src="$jointImage(userinfors.avatar)" mode=""></image></view>
					<image src="../../../static/image/right_skip.png"></image>
				</view>
			</view>
			<!-- <view class="carset_con">
				<view class="carset_left">用户名</view>
				<view class="carset_right">
					<view>{{userinfors.username}}</view>
					<image src="../../../static/image/right_skip.png"></image>
				</view>
			</view> -->
			<view class="carset_con" @tap="username">
				<view class="carset_left">昵称</view>
				<view class="carset_right">
					<view>{{userinfors.nickname}}</view>
					<image src="../../../static/image/right_skip.png"></image>
				</view>
			</view>
			
			<!-- <view class="carset_con">
				<view class="carset_left">介绍</view>
				<view class="carset_right">
					<view>快来添加个人信息吧,让更多人认识你!</view>
					<image src="../../../static/image/right_skip.png"></image>
				</view>
			</view> -->
			<view class="carset_con" @tap="navnum">
				<view class="carset_left">手机号</view>
				<view class="carset_right">
					<view>{{userinfors.mobile || "请绑定手机号"}}</view>
					<image src="../../../static/image/right_skip.png"></image>
				</view>
			</view>
			<view class="carset_con" @tap="navpaw">
				<view class="carset_left">修改密码</view>
				<view class="carset_right">
					<view>点击修改密码</view>
					<image src="../../../static/image/right_skip.png"></image>
				</view>
			</view>
			<!-- <view class="carset_con">
				<view class="carset_left">车辆信息</view>
				<view class="carset_right">
					<view></view>
					<image src="../../../static/image/right_skip.png"></image>
				</view>
			</view> -->
		</view>
		<!-- #ifdef APP-PLUS -->
			<view class="carset_login" @tap="remcle">退出登陆</view>
		<!-- #endif -->
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				//获取个人信息
				userinfors:[],
				//用户uid
				uid:uni.getStorageSync("UID"),
			}
		},
		onLoad(){
			console.log('UID',this.uid)
			this.getuserinfor()//获取个人信息
		},
		onShow() {
			
			this.getuserinfor()//获取个人信息
			console.log('UID',uni.getStorageSync('UID'))
		},
		methods:{
			//修改用户昵称
			 username(){
				
				uni.showModal({
					title:'修改昵称',
					editable:true,
					success: async (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							console.log(res.content)
							const req = await uni.$http.get('api/jiu/Appuser/usernickrdit',{
								user_id:uni.getStorageSync('UID'),
								nickname:res.content
							})
							uni.showToast({
								icon:"none",
								title:req.data.msg,
								success: () => {
									this.getuserinfor()
								}
							})
							console.log(req)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			
			//修改密码
			navpaw(){
				uni.navigateTo({
					url:'/pages/edpaw/edpaw'
				})
			},
			//跳转手机号
			async navnum(){
				uni.navigateTo({
					url:'/pages/shoujinum/shoujinum'
				})
			},
			
			//用户个人信息
			async getuserinfor(){
				const req = await uni.$http.get('api/jiu/Appuser/list',{
					user_id:uni.getStorageSync('UID')
				})
				console.log('UID',uni.getStorageSync('UID'))
				console.log('用户个人信息',req)
				this.userinfors = req.data.data.action
			},
			
			//更换头像
			headimg(){
				this.$upload.uploadImg(1,(res) =>{
					console.log(res)
					
					this.edheadimg(res)
				})
			},
			
			//修改用户头像
			async edheadimg(url){
				console.log('我是地址',url)
				const req = await uni.$http.get('api/jiu/Appuser/useravateredit',{
					user_id:uni.getStorageSync('UID'),
					avatar:url
				})
				console.log('修改头像',req)
				uni.showToast({
					icon:"none",
					title:req.data.msg,
					success: () => {
						this.getuserinfor()
					}
				})
			},
			
			//退出登录
			remcle(){
				uni.clearStorageSync()
				uni.reLaunch({
					url:'/pages/login/login'
				})
			},
			
			
		}
	}
	
</script>

<style lang="scss" scoped>
	.control{
		width: 100%;
		height: 100vh;
		padding-bottom: 20rpx;
		background-color: #f7f8fc;
		color: #333333;
		.carset_menu{
			.carset_con{
				width: 100%;
				padding: 30rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #ffffff;
				border-bottom: 2rpx solid #e1e1e1;
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
					.right_image{					
						image{
							border-radius: 50%;
							width: 100rpx;
							height: 100rpx;
						}
					}
					image{
						margin-left: 20rpx;
						width: 20rpx;
						height: 30rpx;
					}	
				}
			}
			
			.carset_con:last-child{
				border-bottom:none;
			}
		}

		.carset_login{
			width: 400rpx;
			margin: 100rpx auto;
			padding: 30rpx 0;
			text-align: center;
			border-radius: 50rpx;
			color:#ffffff;
			background-color: #45b787;
		}
	}
</style>
