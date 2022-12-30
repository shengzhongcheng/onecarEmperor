<template>
	<!-- 一口价订单 -->
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
		<view class="orderBox" v-for="index in 3" :key="index" @tap="spikOrderMess">
			<view class="boxTop">
				<view class="boxTop-left">
					<text>2022-01-01</text>
					<text>14:00</text>
				</view>
				<view class="boxTop-right">
					待付款
				</view>
			</view>
			<view class="boxMenu">
				<view class="boxMenu-left">
					<img src="" alt="">
				</view>
				<view class="boxMenu-right">
					<view class="pa">奥迪Q3方向盘套</view>
					<view class="pb">￥99元</view>
					<view class="pc"><text>翻毛皮质感</text><text>数量99</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list1: [{
					name: '全部',
				}, {
					name: '待付款',
				}, {
					name: '已付款'
				}, {
					name: '待派单'
				}, {
					name: '已排单'
				}, {
					name: '已完成'
				}, {
					name: '售后订单'
				}]
			}
		},
		methods: {
			//获取一口价订单
			click(item) {
				console.log('item', item);
			},
			//跳转订单详情
			spikOrderMess() {
				uni.navigateTo({
					url: './orderXiang'
				})
			}
		}
	}
</script>
</script>

<style lang="scss" scoped>
	.order-car {
		width: 100%;
		background-color: #f7f8fc;

		.orderBox {
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

					text {
						padding-right: 20rpx;
					}
				}

				.boxTop-right {
					color: #45b787;
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
</style>
