<template>
	<view>
		<view class="cet" v-for="(item,index) in moeylist">
			<view class="left">
				<view class="">打赏收益</view>
				<view class="clo">
					{{item.createtime | timeAgo}}
				</view>
			</view>
			<view class="money">
				+{{item.money}}
			</view>
		</view>
		<!-- 提示内容 -->
		<view class="trfaOrd" v-if="moeylist.length == 0">
			<view class="orderr"><strong>暂无打赏记录~~</strong></view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//接受数据
				moeylist:[],
			}
		},
		onLoad() {
			this.shozhi()
		},
		methods: {
			//收支明细数据
			async shozhi(){
				const req =await uni.$http.get('api/jiu/user/reward',{
					user_id:uni.getStorageSync('user_id')
				})
				// this.moeylist1 = req.data.data.order
				// this.moeylist2 = req.data.data.order1
				// this.moeylist3 = req.data.data.order2
				this.moeylist = req.data.data.action
				console.log(req)
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.cet{
		width: 90%;
		margin: auto;
		border-bottom: 1rpx solid gainsboro;
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0rpx;
		.clo{
			color: gray;
		}
		.money{
			margin-top: 20rpx;
			color: #46cbaa;
		}
	}
	.trfaOrd{
			width: 90%;
			margin:100rpx auto;
			text-align: center;
			color: #787878;
		}
</style>
