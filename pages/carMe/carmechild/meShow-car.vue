<template>
	<!-- 自己展示界面信息 -->
	<view class="meShow" :style="{'margin-top':statusBar+'px','height':screenHeight+'px'}"> 
		<!-- style="background: url(../../static/image/4452192f6.png);" -->
		<!-- <view class="meShowPic" >
			<image class="image1" src="@/static/image/4452192f6.png" mode=""></image>
			<image class="imgFiexd" src="@/static/image/return.png" mode="" @tap="sipkToMe"></image>
		</view> -->
		<view class="" style="height: 50rpx;"></view>
		<view class="msShowTox">
			<view class="tox-left">
				<image :src="$jointImage(useravatar)" mode=""></image>
			</view>
			<view class="tox-right">
				<view class="r-top">
					<text>0 关注</text>
					<text>0 粉丝</text>
					<text>0 获赞</text>
				</view>
				<view class="r-btn">
					<text class="btnOne">私信</text>
					<text class="btnTwe">账号管理</text>
				</view>
			</view>
		</view>
	
		<view class="msShowuser">
			<view class="user-name">
				<text>用户123455</text>
				<!-- <image class="image1" src="../../../static/image/VIP1.png" mode=""></image> -->
			</view>		
			<view class="user-mess">
				<image class="xinb" src="@/static/image/xinbie01.png" mode=""></image>
				<text class="t1">
					男
				</text>
				<text class="t2">郑州</text>
				<text class="t3">驾龄500天</text>
			</view>	
			<view class="user-liu">
				这个人很懒,什么也没有留下!
			</view>	
		</view>
			
		<view class="showNav">
			 <u-tabs :list="list1" :activeStyle="{
				 color:'#333333',
				 fontWeight:'bold',
				 transform:'scale(1.2)'
			 }" lineColor="#333333" @click="click"></u-tabs>
		</view>
		
		<view class="showMenu">
			<view class="attent-con">
				<view class="attent-toux">
					<view class="tox-left">
						<image src="../../../static/image/car02.jpg" mode=""></image>
					</view>	
					<view class="tox-right">
						用户123455
					</view>	
				</view>	
				<h3>你了解兰博基尼吗?</h3>
				<p class="p1">
					意大利兰博基尼汽车公司生产的第一辆机车实际上是拖拉机，该公司创始人Ferrucio
					Lamborghini用这些拖拉机满足了经历第二次世界大战后意大利农民生产对拖拉机的迫切需要。而第一辆兰博基尼跑车350GT，于1963年诞生。后兰博基尼公司经数次转手，最后落到美国... ...
				</p>
				<view class="c-img">
					<image src="@/static/image/car02.jpg" mode=""></image>
				</view>
				<p class="p2">
					<text>2022-02-02 22:22:22</text>
				</p>
				<view class="c-top">
					<u-avatar :src="src" shape="square" @tap="spikAttention"></u-avatar>
					<view class="c-text" >
						<h4>兰博基作俑者</h4>
						<p><text>活跃车友20w</text><text style="padding-left: 20rpx;">认证车主2000</text></p>
					</view>
				<!-- 	<view class="c-image">
						<text>进圈</text>
						<image src="@/static/image/del.png" mode="" style="width: 40rpx;height: 40rpx;"></image>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				useravatar:uni.getStorageSync('avatar') || null,
				
				list1:[{
					name:'我的发布'
				},{
					name:'留言'
				},{
					name:'大赏记录'
				},{
					name:'我的成就'
				}],
				statusBar:0, //状态栏的高度
				screenHeight:0,
				src: 'https://sf3-cdn-tos.toutiaostatic.com/img/user-avatar/86d41102254edacedbed6e77ee27c601~300x300.image'
			}
		},
		methods:{
			//返回上一层 
			sipkToMe(){
				uni.navigateBack()
			}
		},
		onLoad(){
			let _this = this 
			uni.getSystemInfo({
				success(res){
						console.log(res)
						_this.statusBar = res.statusBarHeight
						_this.screenHeight = res.screenHeight
				}
			})
		}
	}
</script>

<style lang="scss" spaced>
	
	.meShow{
		width: 100%;
		background-color: #f7f8fc;
		.meShowPic{
			width: 100%;
			height: 220rpx; 
			position: relative;
			
			.image1{
				width: 100%;
				height: 100%;
			}
			.imgFiexd{
				width: 40rpx;
				height: 50rpx;
				position: absolute;
				left: 20rpx;
				top: 10rpx;
			}
		}
			
		.msShowTox{
			width: 690rpx;
			margin: 0rpx auto;
			margin-top: -20rpx;
			display: flex;
			align-items:center;
			.tox-left{
				width: 160rpx;
				height: 160rpx;
				overflow: hidden;
				border: 2rpx solid #ffffff;
				border-radius: 50%;
				position: relative;
				image{
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
				}
			}
			.tox-right{
				padding-left: 20rpx;
				padding-top: 40rpx;
				.r-top{
					padding-bottom: 20rpx;
					text{
						font-size: 26rpx;
						padding-right: 20rpx;
						color: #333333;
					}
				}
				.r-btn{
					padding-left: 20rpx;
					.btnOne{
						color:#45b787 ;
						font-size: 28rpx;
						padding: 5rpx 20rpx;
						border-radius: 40rpx;
						border: 4rpx solid #45b787;
					}
					.btnTwe{
						font-size: 29rpx;
						border-radius: 40rpx;
						padding: 8rpx 40rpx;
						color: #ffffff;
						margin-left: 30rpx;
						background-color: #45b787;
					}
				}
				
			}
		}
	
		.msShowuser{
			width: 690rpx;
			margin: 30rpx auto;
			.user-name{
				text{
					font-size: 44rpx;
					// font-weight: bold;
					color: #333333;
					letter-spacing: 2rpx;
				}
				.image1{
					width: 25rpx;
					height: 25rpx;
					padding: 6rpx 25rpx;
					margin-left: 20rpx;
					border-radius: 30rpx;
					background-color:#fee1d6 ;
				}
			}
			.user-mess{
				display: flex;
				align-items: center;
				padding: 15rpx 0;
				font-size: 30rpx;
				color: #333333;
				letter-spacing: 2rpx;
				.xinb{
					width: 40rpx;
					height: 40rpx;
				}
				.t1{
					padding: 0 10rpx;
				}
				.t2{
					padding: 0 30rpx;
				}
			}
			.user-liu{
				font-size: 30rpx;
				color: #333333;
			}
		}
	
		.showNav{
			padding-left: 20rpx;
			letter-spacing: 2rpx; 
			
			.u-tabs__wrapper__nav__item{ 
				padding: 0 6px !important;
			}
		}
		.showMenu{
			width: 100%;
			margin-top:30rpx;
			background-color: #ffffff;
			.attent-con {
				width: 690rpx;
				margin: 0 auto;
				.attent-toux{
					display: flex;
					align-items: center;
					padding: 15rpx 0;
					.tox-left{
						width: 100rpx;
						height: 100rpx;				
						image{
							border-radius: 50%;
							width: 100%;
							height: 100%;
						}
					}
					.tox-right{
						font-size: 34rpx;
						color: #333333;
						padding-left: 20rpx;
						letter-spacing: 2rpx;
					}
					
				}
				.c-top {
					width: 100%;
					display: flex;
					padding: 20rpx 0;
					position: relative;
			
					.c-text {
						padding-left: 20rpx;
			
						h4 {
							color: #333333;
							padding-bottom: 8rpx;
						}
			
						p {
							font-size: 24rpx;
							color: #666666;
						}
					}
			
					.c-image {
						position: absolute;
						right: 60rpx;
						top: 35rpx;
						display: flex;
						align-items: center;
			
						text {
							color: #45b787;
							font-size: 34rpx;
							padding-right: 20rpx;
			
						}
			
						image {
							vertical-align: middle;
						}
					}
				}
			
				h3 {
					font-size: 35rpx;
					font-weight: bold;
					color: #333333;
					padding: 10rpx 0rpx;
			
				}
			
				.c-img {
					image {
						padding: 20rpx 0;
						width: 400rpx;
						height: 280rpx;
					}
				}
			
				.p1 {
					width: 690rpx;
					margin: 0 auto;
					font-size: 29rpx;
					letter-spacing: 2rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 4;
					font-weight: normal;
					font-stretch: normal;
					color: #333333;
				}
			
				.p2 {
					font-size: 27rpx;
					color: #666666;
					letter-spacing: 2rpx;
				}
			
				.c-dianz {
					width: 690rpx;
					margin: 0rpx auto;
					display: flex;
					justify-content: space-around;
			
					p {
						display: flex;
						align-items: center;
						padding: 30rpx 0;
						font-size: 26rpx;
						color: #666666;
			
						image {
							padding-right: 5rpx;
							width: 35rpx;
							height: 35rpx;
						}
					}
				}
			}
		}
	}
</style>
