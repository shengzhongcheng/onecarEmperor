<template>
	<view>
		<view class="withdrawal">
			<view class="money">提现金额</view>
			<input type="number" v-model="usermoney" placeholder="请输入提现金额">
		</view>
		<view class="err">
			<view class="">预计在1~7个工作日到账</view>
		</view>
		
		<view class="tixianbut" @click="usermoneys()">
			立即提现
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//提现金额
				usermoney:null,
				
			}
		},
		methods: {
			//用户提现
			async usermoneys(){
				if(this.usermoney != null && this.usermoney != 0){
					const req =await uni.$http.post('api/jiu/user/cashadveb',{
						user_id:uni.getStorageSync('user_id'),
						money:this.usermoney
					})
					console.log('用户提现',req)
					uni.showToast({
						icon:"none",
						title:req.data.msg,
						success: (res) => {
							if(req.data.msg == "申请成功"){
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},500)
							}
						}
					})
				}else{
					uni.showToast({
						icon:"none",
						title:"请输入金额"
					})
				}
			}
			
			
			
			
		}
	}
</script>

<style scoped lang="scss">
.withdrawal{
	width: 90%;
	margin: 30rpx auto;
	border: 1rpx solid gainsboro;
	border-radius: 15rpx;
	display: flex;
	justify-content: space-between;
	padding: 100rpx 40rpx;
	
	.money{
		font-size: 40rpx;
	}
	input{
		color: #21ce78;
		font-size: 40rpx;
	}
}
.err{
	margin-left: 40rpx;
}
.tixianbut{
	width: 300rpx;
	height: 80rpx;
	margin:300rpx auto;
	color: white;
	background-color: #21ce78;
	text-align: center;
	line-height: 80rpx;
	border-radius: 20rpx;
}
</style>
