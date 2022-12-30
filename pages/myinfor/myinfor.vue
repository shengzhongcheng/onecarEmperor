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
								<strong>{{myinforlist.nickname}}</strong>
							</view>
							<view class="useridid">
								id:{{myinforlist.id}}
							</view>
						</view>
					</view>
			</view>
		</view>
		<!-- 用户信息 -->
		<view class="funlist">
			<view class="funalllist" >
				<view class="funalllistimg">姓名</view>
				<view class="">{{myinforlist.nickname}}</view>
			</view>
			<view class="funalllist" >
				<view class="funalllistimg">性别</view>
				<view class="">{{myinforlist.gender}}</view>
			</view>
			<view class="funalllist" >
				<view class="funalllistimg">联系电话</view>
				<view class="">{{myinforlist.mobile}}</view>
			</view>
			<view class="funalllist" >
				<view class="funalllistimg">地址</view>
				<view class="">{{myinforlist.address}}</view>
			</view>
			<view class="fu">
				<view class="funalllistimg">个人介绍</view>
				<view class="" style="color: #5b5b5b;">{{myinforlist.introduce}}</view>
			</view>
		</view>
		<!-- 技能展示 -->
		<view class="funlist">
			<!-- <view class="funalllist" @click="navtopersonalqual()">
				<view class="funalllistimg">技能展示</view>
				<image src="@/static/indexiconfont/rightjt.png" mode=""></image>
			</view> -->
			<view class="funalllist" @click="navtoscoperan()">
				<view class="funalllistimg">服务范围</view>
				<image src="@/static/indexiconfont/rightjt.png" mode=""></image>
			</view>
			<view class="funalllist" @tap="Wxbangding" v-if='myinforlist.openid == ""'>
				<view class="funalllistimg">绑定微信</view>
				<image src="@/static/indexiconfont/rightjt.png" mode=""></image>
			</view>
			<view class="funalllist" v-else>
				<view class="funalllistimg">已绑定微信</view>
				<image src="@/static/indexiconfont/rightjt.png" mode=""></image>
			</view>
			<!-- 退出按钮 -->
			<view class="tuicu" @click="navtoeitmyinfor()">
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
				//我的信息详情
				myinforlist:[],
				//头像
				userimg:null,
			}
		},
		onLoad() {
		},
		onShow() {
			this.getmyinfor()
		},
		methods: {
			//绑定微信
			Wxbangding(){
				uni.login({
					 success: async (res) => {
						console.log('登录成功',res)
						const unionid = res.authResult.unionid
						const openid = res.authResult.openid
						const req = await uni.$http.post('api/jiu/plug/bangding',{
							user_id:uni.getStorageSync('user_id'),
							openid:openid
						})
						if(req.code === 1){
							uni.showToast({
								icon:"none",
								title:req.msg
							})
							this.getmyinfor()
						}
					},
				
				})
			},
			
			imageUrl(){
			  let url = this.myinforlist.avatar
			  let str = RegExp('http');
			  let newUrl;
			  //通过三元运算符进行判断该图片是否含有http域名，没有就拼接上去https://xcx.yichedi.com/
			  str.test(url) ? newUrl = url : newUrl = 'https://xcx.yichedi.com/' + url;
			  this.userimg = newUrl
			  console.log('头像',this.userimg)
			  // return newUrl
			},
			//个人信息详情
			async getmyinfor(){
				const req = await uni.$http.get('api/jiu/user/userinfo',{
					user_id:uni.getStorageSync('user_id'),
					type:2,
				})
				console.log('req',req)
				this.myinforlist = req.data.data.action
				uni.setStorageSync('avatar',this.myinforlist.avatar)
				this.imageUrl()//回调判断头像地址是否是详情地址
			},
			
			
			/* 跳转信息修改页 */
			navtoeitmyinfor(){
				uni.navigateTo({
					url:'../editmyinfor/editmyinfor'
					
				})
			},
			/* 跳转个人资质 */
			navtopersonalqual(){
				console.log('12312')
				uni.navigateTo({
					url:'../personalqualif/personalqualif'
					
				})
			},
			/* 跳转服务范围 */
			navtoscoperan(){
				uni.navigateTo({
					url:'../scoperan/scoperan'
					
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
		}
		.fu{
			width: 90%;
			margin:20rpx auto;
			padding: 15rpx 10rpx;
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

</style>
