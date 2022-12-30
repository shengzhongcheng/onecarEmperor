<template>
	<view>
		
		<!-- 当前有的服务 -->
		<view class="newscope">
			<view class=""><strong>当前已有服务</strong></view>
		</view>
		<view class="scopelist">
			<view class="scopelist_list" v-for="(item,index) in scoperan" :key="index">
				{{item.name}}
				
			</view>
			
		</view>
		
		<!-- 提示是否有订单信息 -->
			<view class="trfaOrd" v-if="scoperan.length == 0">
				<u-empty
				        mode="data"
						text="还没有服务,快去添加吧~~"
				        icon="http://cdn.uviewui.com/uview/empty/data.png"
				>
				</u-empty>
			</view>
		
		
		<!-- 编辑 -->
		
		<view class="bj" @click="navtoed()"><text>添加</text> </view>
		
		<!-- 占位 -->
		<view class="zw">
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//用户id
				user_id:uni.getStorageSync('user_id') || null,
				//当前有的服务
				scoperan:[
					
				],
				
			}
		},
		onLoad() {
			this.getscoper()
		},
		onShow() {
			this.getscoper()
		},
		methods: {
			//获取当前已有的服务列表
			async getscoper(){
				const req = await uni.$http.get('api/jiu/server/serverbuy',{
					user_id:this.user_id
				})
				this.scoperan = req.data.data.action
				console.log(req)
			},
			
			//跳转编辑服务范围
			navtoed(){
				uni.navigateTo({
					url:'../editscope/editscope'
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
	.newscope{
		width: 100%;
		padding: 20rpx 40rpx;
	}
	.scopelist{
		width: 90%;
		margin: 20rpx auto;
		// display: flex;
		// justify-content: space-between;
		// flex-wrap: wrap;
		.scopelist_list{
			// width: 198rpx;
			// height: 100rpx;
			// line-height: 100rpx;
			// margin-top: 30rpx;
			background-color: white;
			color: #313131;
			padding: 20rpx 0rpx;
			margin: 20rpx 0rpx;
			text-align: center;
			position: relative;
			// padding: 80rpx 60rpx;
			border-radius: 15rpx;
			border: 1rpx solid #37cbc6;
			.xx{
				position: absolute;
				width: 30rpx; 
				height: 30rpx;
				line-height: 24rpx;
				text-align: center;
				right: 0rpx;
				top: 0rpx;
				border: 1rpx solid #959595;
				color: #959595;
				border-radius: 50%;
			}
		}
	}
	.bj{
		position: fixed;
		bottom: 0rpx;
		width: 100%;
		color: white;
		font-size: 35rpx;
		text-align: center;
		background-color: #37cbc6;
		padding: 30rpx 0rpx;
		// text{
		// 	padding: 30rpx 40rpx;
		// 	border-radius: 20rpx;
		// 	color: white;
		// 	background-color: #37cbc6;
		// }
	}
	.trfaOrd{
			width: 90%;
			margin:100rpx auto;
			text-align: center;
			color: #787878;
		}
		.zw{
			height: 500rpx;
		}
</style>
