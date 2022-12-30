<template>
	<view>
		<view class="header_back">
			<!-- 用户头部信息 -->
			<view class="username">
				<image :src="avatar" mode=""></image>
				<view class="name">
					<view class="nametop">{{name}}</view>
					<!-- <view class="namebot">ID：{{id}}</view> -->
				</view>
			</view>
			<!-- 我的佣金 -->
			<view class="mymoney">
				<view class="money">
					<view class="moon">我的佣金:</view>
					<view class="moto"><strong>{{money}}</strong></view>
				</view>
				<view class="money">
					<view class="tixian" @click="navtogowith()">立即提现</view>
				</view>
			</view>
		</view>
		<!-- 收支明细 -->
		<view class="moneylist">
			<view class="moneylist_list" @click="navtoshouzhi()">
				<view class="left" >
					<image src="../../static/wallet/qiandai.png" mode=""></image>
					<view class="martop">收支明细</view>
				</view>
				<view class="right">
					<image src="../../static/indexiconfont/rightjt.png" mode=""></image>
				</view>
			</view>
			<view class="moneylist_list" @click="navtodoneadmin()" v-if="fas">
				<view class="left">
					<image src="../../static/wallet/dunpai.png" mode=""></image>
					<view class="martop">保证金管理</view>
				</view>
				<view class="right">
					<image src="../../static/indexiconfont/rightjt.png" mode=""></image>
				</view>
			</view>
			<view class="moneylist_list" @click="navtowith()">
				<view class="left">
					<image src="../../static/wallet/tixian.png" mode=""></image>
					<view class="martop">提现记录</view>
				</view>
				<view class="right">
					<image src="../../static/indexiconfont/rightjt.png" mode=""></image>
				</view>
			</view>
			<view class="moneylist_list" @click="navtozhishi()" v-if="fas">
				<view class="left">
					<image src="../../static/wallet/tixian.png" mode=""></image>
					<view class="martop">知识殿堂打赏收益</view>
				</view>
				<view class="right">
					<image src="../../static/indexiconfont/rightjt.png" mode=""></image>
				</view>
			</view>
			<view class="moneylist_list">
				<view class="left">
					<u-icon name="chat" color="#555555" size="28"></u-icon>
					<view class="martop">联系客服：{{content}}</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//用户名
				name:uni.getStorageSync('nickname') || '',
				id:uni.getStorageSync('user_id') || '',
				avatar:null,
				//余额
				money:'',
				content: '',
				//控制按钮
				fas:false,
			}
		},
		onLoad() {
			this.kongzhi()
			this.imageUrl()
			this.getmoney()
			this.kefuNumber()
		},
		onShow() {
			this.imageUrl()
			this.name = uni.getStorageSync('nickname')
			// this.avatar = uni.getStorageSync('avatar')
			this.getmoney()
		},
		methods: {
			//控制广告管理
			async kongzhi(){
				const req = await uni.$http.post('api/jiu/useranswer/shangxianzhiquantang')
				this.fas = req.data.data
				console.log('控制',req)
			},
			//客服联系方式
			async kefuNumber(){
				console.log('1222',this.content)
				const req = await uni.$http.get('api/jiu/xcxserver/treaty')
				
				this.content = req.data.data.action.conect
				console.log('req>>>>>>>>>>>>>>>>>>',this.content)
			},
			
			
			//判断图片是否为网络路径
			imageUrl(){
			  let url = uni.getStorageSync('avatar')
			  let str = RegExp('http');
			  let newUrl;
			  //通过三元运算符进行判断该图片是否含有http域名，没有就拼接上去https://xcx.yichedi.com/
			  str.test(url) ? newUrl = url : newUrl = 'https://xcx.yichedi.com/' + url;
			  this.avatar = newUrl
			  console.log('头像路径',this.avatar)
			  // return newUrl
			},
			
			
			//跳转知识
			navtozhishi(){
				uni.navigateTo({
					url:'../zhishishouyi/zhishishouyi'
				})
			},
			
			//获取个人余额
			async getmoney(){
				let req = await uni.$http.get('api/jiu/user/money',{
					user_id:uni.getStorageSync('user_id'),
				})
				this.money = req.data.data.action.money
			},
			
			//跳转收支明细
			navtoshouzhi(){
				uni.navigateTo({
					url:'../shouziminxi/shouziminxi'
				})
			},
			
			//跳转保证金管理
			navtodoneadmin(){
				uni.navigateTo({
					url:'../bondadmin/bondadmin'
				})
			},
			//跳转提现
			navtowith(){
				uni.navigateTo({
					url:'../withdrawal/withdrawal'
				})
			},
			//去提现
			navtogowith(){
				uni.navigateTo({
					url:'../gowithdrawal/gowithdrawal'
				})
				
			}
		}
	}
</script>

<style scoped lang="scss">
.header_back{
	height: 350rpx;
	width: 90%;
	margin:20rpx auto;
	border-radius: 15rpx;
	background-color: #14d38d;
	.username{
		padding: 30rpx 20rpx;
		display: flex;
		image{
			height: 100rpx;
			width: 100rpx;
			border-radius: 50%;
			margin-left: 50rpx;
		}
		.name{
			margin-left: 30rpx;
			color: white;
			.nametop{
				margin-top: 20rpx;
				font-size: 40rpx;
			}
			.namebot{
				margin-top: 15rpx;
			}
		}
	}
	.mymoney{
		width: 90%;
		margin: auto;
		height: 200rpx;
		margin-top: 10rpx;
		display: flex;
		justify-content: space-between;
		.money{
			.moon{
				color: white;
			}
			.moto{
				font-size: 45rpx;
				color: white;
			}
			.tixian{
				margin-top: 30rpx;
				padding: 10rpx 20rpx;
				background-color: white;
				border-radius: 5rpx;
			}
		}
	}
}
.moneylist{
	width: 100%;
	margin-top: 40rpx;
	.moneylist_list{
		width: 90%;
		margin: auto;
		padding: 40rpx 20rpx;
		display: flex;
		justify-content: space-between;
		.left{
			display: flex;
			justify-content: space-between;
			image{
				height: 60rpx;
				width: 60rpx;
				margin-top: 10rpx;
			}
			.martop{
				margin-top: 20rpx;
			}
		}
		.right{
			image{
				height: 50rpx;
				width: 50rpx;
				margin-top: 10rpx;
			}
		}
		
	}
}
</style>
