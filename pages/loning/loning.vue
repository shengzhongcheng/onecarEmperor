<template>
	<view>
		<view class="conten">
			加载中......
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//判断是否有用户token
				token:uni.getStorageSync('token') || null,
			}
		},
		onShow() {
			console.log(this.token)
			if(this.token == null){
				console.log('呀呀呀')
				uni.navigateTo({
					url:'../login/login'
				})
			}else if(this.token != null){
				uni.switchTab({
					url:'../index/index'
				})
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.conten{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%);
	transform: translateY(-50%);
	// margin: auto;
}
</style>
