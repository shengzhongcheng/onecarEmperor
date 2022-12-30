<template>
	<view v-if="inforlist[0] != null">
		<view class="bondnum">
			<view class="bondum_top">
				<view class="" v-if="inforlist[0] != null">类目：{{inforlist[0].name}}</view>
			</view>
		</view>
		<!-- 付款信息 -->
		<view class="bondinfor">
			<view class="infor">
				<strong>付款信息</strong>
			</view>
		</view>
		<!-- 信息 -->
		<view class="allinfor">
			<view class="allinfor_list">
				<view class="">缴纳人</view>
				<view class="clo">{{inforlist[0].realname}}</view>
			</view>
			<view class="allinfor_list">
				<view class="">手机号码</view>
				<view class="clo">{{inforlist[0].mobile}}</view>
			</view>
			<view class="allinfor_list">
				<view class="">付款时间</view>
				<view class="clo">{{inforlist[0].uptime | timeAgo}}</view>
			</view>
			<!-- <view class="allinfor_list">
				<view class="">付款方式</view>
				<view class="clo">在线支付</view>
			</view> -->
			<view class="allinfor_list">
				<view class="">保证金总额</view>
				<view class="clo">￥{{inforlist[0].price}}</view>
			</view>
			<view class="allinfor_list">
				<view class="">支付状态</view>
				<view class="clo">已支付</view>
			</view>
			<view class="allinfor_list">
				<view class="">金额状态</view>
				<view class="clo">冻结中</view>
			</view>
		</view>
		
		<view class="but" @click="thaw()">
			解冻提现
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//传递的id
				id:null,
				//详情
				inforlist:[],
				
			}
		},
		onLoad(id) {
			console.log(id)
			this.id = id.id
			this.infor()
		},
		onShow() {
			uni.showModal({
				title:'警告',
				content:'解除冻结后，此类项目下的商品将下架处理，与此相关的服务业绩也将停止使用，请确定是本人操作。',
				success: (res) => {
					if (res.cancel) {
						uni.navigateBack({
							delta:1
						})
					}
				}
			})
		},
		methods: {
			//解冻
			async thaw(){
				const req = await uni.$http.get('api/jiu/server/serthaw',{
					user_id:uni.getStorageSync('user_id'),
					id:this.id
				})
				console.log(req)
				uni.showToast({
					icon:"none",
					title:req.data.msg,
					success: (res) => {
						uni.navigateBack({
							delta:1
						})
					}
				})
				
			},
			//订单详情
			async infor(){
				const req = await uni.$http.get('api/jiu/server/serverdetail',{
					id:this.id
				})
				console.log('12123',req)
				this.inforlist = req.data.data.action
			}
			
		}
	}
</script>

<style scoped lang="scss">
.bondnum{
	width: 100%;
	border: 1rpx solid gainsboro;
	margin-top: 30rpx;
	padding: 30rpx 0rpx;
	.bondum_top{
		width: 90%;
		margin: auto;
		view{
			font-size: 35rpx;
		}
	}
}
.bondinfor{
	width: 100%;
	margin-top: 30rpx;
	border-bottom: 1rpx solid gainsboro;
	.infor{
		width: 90%;
		margin: auto;
		padding: 20rpx 0rpx;
	}
}
.allinfor{
	width: 90%;
	margin: auto;
	.allinfor_list{
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0rpx;
		.clo{
			color: gray;
		}
	}
}
.but{
	margin:200rpx auto;
	width: 300rpx;
	text-align: center;
	padding: 30rpx 0rpx;
	background-color: #00b86b;
	color: white;
	border-radius: 15rpx;
}
</style>
