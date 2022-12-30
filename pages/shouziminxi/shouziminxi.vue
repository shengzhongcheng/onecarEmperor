<template>
	<view>
		<!-- 议价订单收入 -->
		<view class="cet" v-for="(item,index) in moeylist1" :key="index" v-if="item.status == 2 || item.status == 6">
			<view class="left">
				<view class="">议价订单收入</view>
				<view class="clo">
					<!-- {{item.updatetime}} -->
					{{item.updatetime | timeAgo}}
				</view>
			</view>
			<view class="money" v-if="item.status == 2">
				+{{item.price || item.money || item.totalpeice}}
			</view>
			<view class="money" v-if="item.status == 6">
				-{{item.price || item.money || item.totalpeice}}
			</view>
		</view>
		<!-- 一口价收入 -->
		<view class="cet" v-for="(item,index) in moeylist2" :key="index">
			<view class="left">
				<view class="">一口价收入</view>
				<view class="clo">
					{{item.uptime | timeAgo}}
				</view>
			</view>
			<view class="money" v-if="item.status == 2">
				<!-- {{item.total_price}} -->
				+{{item.total_price}}
			</view>
			<view class="money" v-if="item.status == 6">
				-{{item.total_price}}
			</view>
		</view>
		<!-- 类目收入 -->
		<view class="cet" v-for="(item,index) in moeylist3">
			<view class="left">
				<view class="">类目收入</view>
				<view class="clo">
					{{item.uptime | timeAgo}}
				</view>
			</view>
			<view class="money" v-if="item.status == 2">
				<!-- {{item.total_price}} -->
				-{{item.price}}
			</view>
			<view class="money" v-if="item.status == 4">
				+{{item.price}}
			</view>
		</view>
		<!-- 等级 -->
		<view class="cet" v-for="(item,index) in moeylist4"><!-- 2见 -->
			<view class="left">
				<view class="">等级</view>
				<view class="clo">
					{{item.uptime | timeAgo}}
				</view>
			</view>
			<view class="money" v-if="item.status == 2">
				<!-- {{item.total_price}} -->
				-{{item.price}}
			</view>
		</view>
		<!-- 提现 -->
		<view class="cet" v-for="(item,index) in moeylist5">
			<view class="left">
				<view class="">提现</view>
				<view class="clo">
					{{item.uptime | timeAgo}}
				</view>
			</view>
			<view class="money" v-if="item.status == 2">
				<!-- {{item.total_price}} -->
				-{{item.price}}
			</view>
		</view>
		<!-- 提示内容 -->
		<view class="trfaOrd" v-if="moeylist1.length == 0 && moeylist2.length == 0 && moeylist3.length == 0 && moeylist4.length == 0 && moeylist5.length == 0">
			<view class="orderr"><strong>暂无记录~~</strong></view>
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//接受数据
				moeylist1:[],
				moeylist2:[],
				moeylist3:[],
				moeylist4:[],
				moeylist5:[],
			}
		},
		onLoad() {
			this.shozhi()
		},
		methods: {
			//收支明细数据
			async shozhi(){
				const req =await uni.$http.get('api/jiu/user/list',{
					user_id:uni.getStorageSync('user_id')
				})
				this.moeylist1 = req.data.data.order
				this.moeylist2 = req.data.data.order1
				this.moeylist3 = req.data.data.order2
				this.moeylist4 = req.data.data.order3
				this.moeylist5 = req.data.data.order4
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
