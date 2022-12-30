<template>
	<view>
		<!-- 抢单列表 -->
		<view class="gradordlist" v-for="(item,index) in actionlist" :key="index">
			<!-- 订单用户信息 -->
			<view class="gradhead">
				<view class="gradhead_left">
					<image :src="getImgsrc(item.user.avatar)" mode=""></image>
					<view class="gradusername">
						<view>{{item.user.nickname}}</view>
					</view>
				</view>
				<view class="gradhead_right">
					<view>预期价格: {{item.amount}}元</view>
				</view>
			</view>
			<!-- 订单详情 -->
			<view class="ordsxx">
				<view class="ordsxxlist">
					<view class="col">用户地址</view>
					<view v-if="item.adress != null">{{item.adress.detail}}</view>
					
				</view>
				<view class="ordsxxlist">
					<view class="col">订单类型</view>
					<view v-show="item.type == 1">用户上门</view>
					<view v-show="item.type == 2">商家上门</view>
				</view>
				<view class="ordsxxlist">
					<view class="col">服务类型</view>
					<view>{{item.cate.catename}}</view>
				</view>
				<view class="ordsxxlist">
					<view class="col">汽车品牌</view>
					<view>{{item.brand.brandname}}</view>
				</view>
				<view class="ordsxxlist">
					<view class="col">车型</view>
					<view>{{item.series.sername}}</view>
				</view>
				<view class="ordsxxlist">
					<view class="col">车架号</view>
					<view>{{item.frame}}</view>
				</view>
				<view class="ordsxxlist">
					<view class="col">详情描述</view>
					<view class="textar">
						<view>{{item.content}}</view>
					</view>
				</view>
			</view>
			<!-- 订单时间 -->
			<view class="ordstime">
				<view class="ortime">
					<view>{{item.uptime | timeAgo}}</view>
				</view>
				<view class="goords" @click="navtoordsxx(item)">
					去出单
				</view>
			</view>
			
		</view>
		
		<!-- 提示是否有订单信息 -->
			<view class="trfaOrd" v-if="actionlist.length == 0 ">
				<view class="orderr"><strong>还没有人发布订单哦~~</strong></view>
			</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//接收抢单大厅列表
				actionlist:[],
				
			}
		},
		onLoad() {
			this.getgra()//抢单大厅数据列表
		},
		//下拉刷新
		onPullDownRefresh() {
				this.getgra(()=>{//回调函数停止下拉刷新动画
					uni.stopPullDownRefresh()
				})
		},
		methods: {
			//获取抢单大厅数据列表
			async getgra(fn){
				const req = await uni.$http.get('api/jiu/order/list',{
					user_id:uni.getStorageSync('user_id')
				})
				console.log(req)
				this.actionlist = req.data.data.action
				if(req.statusCode == 200){
					fn&&fn()//回调函数停止下拉刷新
				}
			},
			
			//跳转订单详情页
			navtoordsxx(item){
				uni.navigateTo({
					url:'../ordsxx/ordsxx?id='+item.id
				})
			}
			
		}
	}
</script>
<style >
	page{
		background-color: #f3f3f3;
	}
</style>

<style scoped lang="scss">
	$gra-color:#F7F7F7;
	
.gradordlist{
	background-color: white;
	width: 90%;
	// height: 400rpx;
	padding-bottom: 20rpx;
	margin:30rpx auto;
	border-radius: 20rpx;
	box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
	.gradhead{
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid gainsboro;
		padding: 10rpx 20rpx;
		.gradhead_left{
			display: flex;
			image{
				height: 80rpx;
				width: 80rpx;
				border-radius: 50%;
			}
			.gradusername{
				margin-top: 20rpx;
				margin-left: 20rpx;
			}
		}
		.gradhead_right{
			margin-top: 20rpx;
			color: green;
		}
		
	}
	.ordsxx{
		width: 100%;
		margin:20rpx auto;
		border-bottom: 1rpx solid gainsboro;
		.ordsxxlist{
			width: 90%;
			margin: auto;
			display: flex;
			justify-content: space-between;
			padding: 15rpx 0rpx;
			.col{
				color: #787878;
			}
			.textar{
				// text-indent: 48rpx;
				padding: 0rpx 20rpx;
				color: #c3c3c3;
				height: 100rpx;
				width: 75%;
				border-radius: 15rpx;
				box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
				// background-color: white;
				background-color:$gra-color;
				overflow: auto;
				overflow-x: hidden;
				overflow-y: scroll;
			}
		}
	}
	.ordstime{
		width: 90%;
		display: flex;
		justify-content: space-between;
		margin: auto;
		.ortime{
			color: #787878;
		}
		.goords{
			padding: 5rpx 15rpx;
			background-color: green;
			color: white;
			border-radius: 20rpx;
		}
	}
}
.trfaOrd{
		width: 90%;
		margin:100rpx auto;
		text-align: center;
		color: #787878;
	}

</style>
