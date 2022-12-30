<template>
	<view>
		<!-- 头部信息 -->
		<view class="username">
			<!-- 用户详细信息 -->
			<view class="userinfor">
					<!-- 用户名 -->
					<view class="userallname">
						<view class="userheadimg">
							<image :src="touxiang" mode=""></image>
						</view>
						<view class="edimg" @click="img_upload()">
							<view class="">点击更换<image src="/static/image/right_skip.png" mode=""></image> </view>
						</view>
					</view>
			</view>
		</view>
		<!-- 用户信息 -->
		<view class="funlist">
			<view class="funalllist" >
				<view class="funalllistimg">昵称</view>
				<view class="with"><input type="text" v-model="user.nickname" placeholder="请输入修改昵称"> </view>
			</view>
			<view class="funalllist" >
				<view class="funalllistimg">联系电话</view>
				<view class="with"><input type="number" v-model="user.mobile" placeholder="请输入修改电话"> </view>
			</view>
			<view class="funalllist" >
				<view class="funalllistimg">地址</view>
				<view class="with"><input type="text" v-model="user.address" placeholder="请输入修改地址"> </view>
			</view>
		</view>
		<!-- 技能展示 -->
		<view class="zw">
			
		</view>
		<view class="tuicu" @click="edxx()">
			确定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				touxiang:uni.getStorageSync('avatar'),
				user:{
					user_id:uni.getStorageSync('user_id'),
					nickname:'',
					mobile:'',
					address:'',
					avatar:uni.getStorageSync('avatar'),
				},
				//接收头像
				userimgs:'',
			}
		},
		onLoad() {
			this.getuser()
			this.imageUrl()
		},
		methods: {
			//判断头像地址是否是详情地址
			imageUrl(){
			  let url = this.touxiang
			  let str = RegExp('http');
			  let newUrl;
			  //通过三元运算符进行判断该图片是否含有http域名，没有就拼接上去https://xcx.yichedi.com/
			  str.test(url) ? newUrl = url : newUrl = 'https://xcx.yichedi.com/' + url;
			  this.touxiang = newUrl
			  // console.log('头像',this.userimg)
			  // return newUrl
			},
			//获取用户详情
			async getuser(){
				const req = await uni.$http.get('api/jiu/user/userinfo',{
					user_id:uni.getStorageSync("user_id"),
					type:uni.getStorageSync('type')
				})
				console.log(req)
				this.user.address = req.data.data.action.address
				this.user.mobile = req.data.data.action.mobile
				this.user.nickname = req.data.data.action.nickname
			},
			
			//修改头像
			img_upload(){
				this.userimgs = ''
				this.$upload.uploadImg(1,(res) =>{
					console.log(res)
					this.user.avatar = res
					this.touxiang = res
					this.userimgs = res
					this.imageUrl()
				})
			},
			
			//修改信息
			async edxx(){
				if(this.user.nickname == '' || this.user.mobile == '' || this.user.address == ''){
					uni.showToast({
						icon:"none",
						title:'请输入完整信息'
					})
				}else{
					// this.user.avatar = this.userimgs
					const req = await uni.$http.get('api/jiu/user/edit',this.user)
					console.log(req)
					if(req.statusCode == 200){
						uni.setStorageSync('nickname',this.user.nickname)
						uni.showToast({
							icon:"none",
							title:req.data.msg,
							success: (res) => {
								uni.setStorageSync('avatar',this.userimgs)
								uni.setStorageSync('nickname',this.user.nickname)
								console.log(this.userimgs)
							}
						})
					}
				}
				
			}
			
		}
	}
</script>

<style scoped lang="scss">
.username{
		position: relative;
		width: 100%;
		padding-top: 100rpx;
		.myheader_back{
			height: 200rpx;
			width: 100%;
			position: absolute;
			left: 0rpx;
			top: 0rpx;
			background-color: #2bb381;
			z-index: -1;
		}
		.userinfor{
			width: 85%;
			margin: auto;
			background-color: white;
			border-radius: 20rpx;
			box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
			.userallname{
				border-radius: 20rpx;
				position: relative;
				width: 100%;
				height: 150rpx;
				display: flex;
				justify-content: space-between;
				background-color: #ffffff;
				.userheadimg{
					image{
						border-radius: 50%;
						height: 100rpx;
						width: 100rpx;
						margin-top: 25rpx;
						margin-left: 15rpx;
					}
					
				}
				.edimg{
					margin-top: 50rpx;
					margin-right: 40rpx;
					margin-left: 10rpx;
					view{
						image{
							height: 20rpx; 
							width: 20rpx;
						}
					}
				}
				.userid{
					margin-top: 70rpx;
					margin-left: 20rpx;
				}
				
			}
			.userbotfun{
				display: flex;
				justify-content: space-around;
				.usermoney{
					margin-top: 50rpx;
					text-align: center;
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
		margin:50rpx auto;
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
			margin:20rpx auto;
			padding: 15rpx 10rpx;
			.with{
				width: 40%;
			}
		}
		.tuicu{
			position: absolute;
			bottom: -174rpx;
			left: 184rpx;
			box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
			padding: 26rpx 104rpx;
			border-radius: 20rpx;
			background-color: #2bb381;
			color: white;
		}
		
	}
	.zw{
		height: 300rpx;
	}
.tuicu{
			position: absolute;
			bottom: 100rpx;
			left: 50%;
			transform: translateX(-50%);
			box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
			padding: 26rpx 104rpx;
			border-radius: 20rpx;
			background-color: #2bb381;
			color: white;
		}
</style>
