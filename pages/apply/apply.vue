<template>
	<view>
		<view class="treapply" @click="navtoter()">
			<strong>师傅注册</strong>
		</view>
		<view class="treapply" @click="navtoshop()">
			<strong>店铺注册</strong>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			//师傅入驻
			navtoter(){
				uni.navigateTo({
					url:'/pages/carMe/carmechild/masterAuth-car'
				})
			},
			//商家入驻
			navtoshop(){
				uni.navigateTo({
					url:'../carMe/carmechild/merchant-car'
				})
			},
			
			
		}
	}
</script>

<style scoped lang="scss">
	.treapply{
		width: 90%;
		padding: 100rpx 0rpx;
		margin: auto;
		text-align: center;
		margin-top: 100rpx;
		font-size: 50rpx;
		// border: 1rpx solid gainsboro;
		background-color: #c3c3c3;
		color: white;
		border-radius: 20rpx;
	}
</style>
