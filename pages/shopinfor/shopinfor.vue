<template>
	<view>
		<!-- 头部信息 -->
		<view class="username">
			<!-- 背景图片 -->
			<view class="myheader_back">
				
			</view>
			<!-- 用户详细信息 -->
			<view class="userinfor">
					<!-- 用户名 -->
					<view class="userallname">
						<view class="userheadimg">
							<image :src="userimg" mode=""></image>
						</view>
						<view class="userid">
							<view class="useridname">
								<strong>{{shopinfor.nickname}}</strong>
							</view>
							<view class="useridid">
								id:{{shopinfor.id}}
							</view>
						</view>
					</view>
			</view>
		</view>
		<!-- 用户信息 -->
		<view class="funlist">
			<!-- <view class="funalllist" >
				<view class="funalllistimg">法人姓名</view>
				<view class="">西部口号</view>
			</view> -->
			<view class="funalllist" >
				<view class="funalllistimg">联系电话</view>
				<view class="col">{{shopinfor.mobile}}</view>
			</view>
			<view class="funalllist" >
				<view class="funalllistimg">门店地址</view>
				<view class="col">{{shopinfor.address}}</view>
			</view>
		</view>
		<!-- 技能展示 -->
		<view class="funlist">
			<view class="funalllist" @click="navtoscope()">
				<view class="funalllistimg">服务范围</view>
				<image src="@/static/indexiconfont/rightjt.png" mode=""></image>
			</view>
			<!-- <view class="funalllist" >
				<view class="funalllistimg">保证金管理</view>
				<image src="@/static/indexiconfont/rightjt.png" mode=""></image>
			</view> -->
			<!-- <view class="funalllist" @click="navtoshopperson()">
				<view class="funalllistimg">资质管理</view>
				<image src="@/static/indexiconfont/rightjt.png" mode=""></image>
			</view> -->
			<!-- 退出按钮 -->
			<view class="tuicu" @click="navtoeditshopinfor()">
				修改
			</view>
		</view>
		<view class="zw">
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//店铺详情数据
				shopinfor:[],
				//用户头像
				userimg:null,
			}
		},
		onLoad() {
			this.getshopinfor()
			// this.imageUrl()//获取头像
		},
		onShow() {
			this.getshopinfor()
		},
		methods: {
			//判断头像地址是否是详情地址
			imageUrl(){
			  let url = this.shopinfor.avatar
			  let str = RegExp('http');
			  let newUrl;
			  //通过三元运算符进行判断该图片是否含有http域名，没有就拼接上去https://xcx.yichedi.com/
			  str.test(url) ? newUrl = url : newUrl = 'https://xcx.yichedi.com/' + url;
			  this.userimg = newUrl
			  console.log('头像',this.userimg)
			  // return newUrl
			},
			
			
			//获取用户详情
			async getshopinfor(){
				const req = await uni.$http.get('api/jiu/user/userinfo',{
					user_id:uni.getStorageSync('user_id'),
					type:uni.getStorageSync('type')
				})
				this.shopinfor = req.data.data.action
				console.log(req)
				uni.setStorageSync('avatar',this.shopinfor.avatar)
				this.imageUrl()//回调判断头像地址是否是详情地址
			},
			
			//跳转服务范围
			navtoscope(){
				uni.navigateTo({
					url:'../scoperan/scoperan'
				})
			},
			//跳转资质管理
			navtoshopperson(){
				uni.navigateTo({
					url:'../personalqualif/shopperson/shopperson'
				})
			},
			//跳转商品修改页
			navtoeditshopinfor(){
				uni.navigateTo({
					url:'../editmyinfor/editshopinfor/editshopinfor'
				})
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
				height: 200rpx;
				display: flex;
				background-color: #ffffff;
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
					.useridid{
						color: #707070;
					}
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
		width: 95%;
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
			margin: auto;
			padding: 30rpx 10rpx;
			margin-bottom: 20rpx;
			.col{
				color: #707070;
			}
		}
		.fu{
			width: 90%;
			margin:20rpx auto;
			padding: 15rpx 10rpx;
		}
		.tuicu{
			position: absolute;
			bottom: -174rpx;
			left: 50%;
			transform: translateX(-50%);
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

</style>
