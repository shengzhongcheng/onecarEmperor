<template>
	<!-- 一口价全部订单列表 -->
	<view class="order-car">
		<view class="orderTop">
			<u-tabs :list="list1" :activeStyle="{
				color:'#333333',
				fontWeight:'700',
				transform:'scale(1.2)'
			}" lineColor="#f7f8fc" :inactiveStyle="{
				color:'#333333',
			}" @click="click"></u-tabs>
		</view>
		<view class="orderBox" v-for="(item,index) in oneOrder" :key="index" @click="spikOrderMess(item.id)">
			<view class="boxTop">
				<view class="boxTop-left">
					<text>{{item.uptime | timeAgo}}</text>
				</view>
				<view class="boxTop-right">
					<text v-if="item.status == 1">待支付</text>
					<text v-if="item.status == 2">待发货</text>
					<text v-if="item.status == 3">待收货</text>
					<text v-if="item.status == 4">待评论</text>
					<text v-if="item.status == 5">已完成</text>
					<text v-if="item.status == 6">已退款</text>
				</view> 
				<view class="rem" v-if="item.status == 1 && rembut == true" @tap.stop="remord(item.id)">
					<text>删除</text>
				</view>
			</view>
			<view class="boxMenu">
				<view class="boxMenu-left">
					<img :src="'https://xcx.yichedi.com'+item.serimage" alt="">
				</view>
				<view class="boxMenu-right">
					<view class="pa">{{item.title}}</view>
					<view class="pb">￥{{item.money}}元</view>
					<view class="pc"><text></text><text>数量{{item.num}}</text></view>
				</view>
			</view>
		</view>
		<!-- 管理按钮 -->
		<view class="guanli" @click="remblack">
			管理
		</view>
		
		<view class="" v-if="oneOrder.length == 0">
			<u-empty
					text="暂无订单"
			        mode="order"
			        icon="http://cdn.uviewui.com/uview/empty/order.png"
			>
			</u-empty>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: uni.getStorageSync('UID') || '', //用户ID
				oneOrder: [], //所有订单
				oneOrderAll: [], //全部
				oneOrder01: [], //待支付
				oneOrder02: [], //待发货
				oneOrder03: [], //待收货
				oneOrder04: [], //待评论
				oneOrder05: [], //已完成
				oneOrder06: [], //已退款
				list1: [{
					name: '全部',
				}, {
					name: '待支付',
				}, {
					name: '待发货'
				}, {
					name: '待收货'
				}, {
					name: '待评论'
				}, {
					name: '已完成'
				}, {
					name: '已退款'
				}],
				//是否显示删除按钮
				rembut:false,
			}
		},
		
		methods: {
			//删除订单
			async remord(id){
				const req = await uni.$http.get('api/jiu/xcxorder/orderdelete',{
					id:id
				})
				console.log('删除',req)
				uni.showToast({
					icon:"none",
					title:req.data.msg,
					success: () => {
						this.oneOrder01 = []
						this.oneOrder02 = []
						this.oneOrder03 = []
						this.oneOrder04 = []
						this.oneOrder05 = []
						this.oneOrder06 = []
						this.wayGetpricelist()
					}
				})
			},
			
			//管理按钮显示
			remblack(){
				this.rembut = !this.rembut
			},
			//获取一口价订单
			wayGetpricelist() {
				let _this = this
				uni.showLoading({
					title: '加载中...'
				})
				_this.$http.pricelist({
						user_id: _this.userId
					})
					.then(res => {
						console.log('一口价', res)
						let data = res.data.data.action
						console.log('全部订单', data)
						_this.oneOrder = data
						_this.oneOrderAll = data
						for (let key in data) {
							if (data[key].status == 1) {
								_this.oneOrder01.push(data[key])
							}
							if (data[key].status == 2) {
								_this.oneOrder02.push(data[key])
							}
							if (data[key].status == 3) {
								_this.oneOrder03.push(data[key])
							}
							if (data[key].status == 4) {
								_this.oneOrder04.push(data[key])
							}
							if (data[key].status == 5) {
								_this.oneOrder05.push(data[key])
							}
							if (data[key].status == 6) {
								_this.oneOrder06.push(data[key])
							}
						}
						uni.hideLoading()
					})
			},
			click(item) {
				let index = item.index
				switch (index) {
					case 0:
						this.oneOrder = this.oneOrderAll
						break;
					case 1:
						this.oneOrder = this.oneOrder01
						break;
					case 2:
						this.oneOrder = this.oneOrder02
						break;
					case 3:
						this.oneOrder = this.oneOrder03
						break;
					case 4:
						this.oneOrder = this.oneOrder04
						break;
					case 5:
						this.oneOrder = this.oneOrder05
						break;
					case 6:
						this.oneOrder = this.oneOrder06
						break;
				}

			},
			//跳转订单详情
			spikOrderMess(id) {
				console.log('跳转', id)
				/* uni.navigateTo({
					url:"../../orerForm/orderFromOne"
				}) */
				uni.navigateTo({
					url: './orderXiang?id='+id
				})
			}
		},
		onLoad() {
			this.wayGetpricelist()
		}
	}
</script>
</script>

<style>
	page {
		background-color: #f7f8fc;
	}
</style>
<style lang="scss" scoped>
	.order-car {
		width: 100%;
		.orderBox {
			position: relative;
			width: 690rpx;
			margin: 0 auto;
			margin-bottom: 30rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			padding: 25rpx 20rpx;
			box-sizing: border-box;

			.boxTop {
				display: flex;
				justify-content: space-between;

				.boxTop-left {
					font-size: 28rpx;
					color: #666666;
					letter-spacing: 2rpx;
					padding: 20rpx 0rpx;
					text {
						padding-right: 20rpx;
					}
				}

				.boxTop-right {
					color: #45b787;
				}
				.rem{
					position: absolute;
					top: 100rpx;
					right: 20rpx;
					color: white;
					background-color: #ff462e;
					padding: 10rpx 20rpx;
					border-radius: 15rpx;
				}
			}

			.boxMenu {
				width: 100%;
				display: flex;

				.boxMenu-left {
					width: 200rpx;
					height: 200rpx;
					background-color: #f7d887;
					border-radius: 20rpx;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.boxMenu-right {

					display: flex;
					flex-direction: column;
					justify-content: center;
					padding-left: 30rpx;

					.pa {
						color: #333333;
						font-weight: bold;
						font-size: 32rpx;
					}

					.pb {
						color: #45b787;
						font-size: 30rpx;
						font-weight: bold;
						letter-spacing: 2rpx;
						padding: 10rpx 0;
					}

					.pc {
						display: flex;
						justify-content: space-between;
						color: #666666;
						font-size: 28rpx;
						width: 420rpx;

						text:nth-child(2) {
							font-weight: bold;
						}
					}
				}
			}
		}
	}
	.guanli{
		border-radius: 50%;
		width: 130rpx;
		height: 130rpx;
		line-height: 130rpx;
		text-align: center;
		background-color: #42b07f;
		position: fixed;
		bottom: 40rpx;
		right: 10rpx;
		color: white;
	}
</style>
