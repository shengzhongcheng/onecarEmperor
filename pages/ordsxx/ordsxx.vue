<template>
	<view>
		<!-- 头部订单信息 -->
		<view class="ordshead">
			<view class="ordshead_box">
				<image :src="getImgsrc(curords.user.avatar)" mode=""></image>
				<view class="ords">
					<view class="">{{curords.cate.catename}}</view>
					<view class="topmarg">预期价格：{{curords.amount}}</view>
				</view>
			</view>
		</view>
		<!-- 抢单列表 -->
		<view class="gradordlist">
		
			<!-- 订单详情 -->
			<view class="ordsxx">
				<view class="ordsxxlist">
					<view class="col">用户已支付保证金</view>
					<view style="color: green;">￥{{curords.bond}}</view>
				</view>
				<view class="ordsxxlist">
					<view class="col">用户地址</view>
					<view v-if="curords.adress != null">{{curords.adress.detail}}</view>
				</view>
				<view class="ordsxxlist">
					<view class="col">订单类型</view>
					<view v-show="curords.type == 1">用户上门</view>
					<view v-show="curords.type == 2">商家上门</view>
				</view>
				<view class="ordsxxlist">
					<view class="col">服务类型</view>
					<view>{{curords.cate.catename}}</view>
				</view>
				<view class="ordsxxlist">
					<view class="col">汽车品牌</view>
					<view>{{curords.brand.brandname}}</view>
				</view>
				<view class="ordsxxlist">
					<view class="col">车型</view>
					<view>{{curords.series.sername}}</view>
				</view>
				<view class="ordsxxlist">
					<view class="col">详情描述</view>
					<view class="textar">
						<view >{{curords.content}}</view>
					</view>
				</view>
			</view>

		</view>
		<!-- 我的报价 -->
		
		
		<view class="mymoney" v-if="user == undefined || user == {}">
			<view class="">我的报价</view>
			<view class="money"><input type="number" v-model="money"></view>
			<view class="err">报价不低于用户保证金额</view>
			<!-- 确定 -->
			<view class="ok" @click="offer()">
				确定
			</view>
		</view>
		<view class="mymoney" v-if="user != null">
			<view class="">我的报价</view>
			<view class="money">{{user.price}}</view>
			
		</view>
		
		<view class="" style="height: 300rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//报价金额
				money:0,
				//当前订单id
				thisid:null,
				//当前订单数据
				curords:[],
				//接收user判断是否是定价订单
				user:[],
				//订单保证金金额
				ordbzj:null,
			}
		},
		onLoad(id) {
			this.thisid = id.id
			if(this.thisid != null){
				this.getcurrentord()
			}
		},
		methods: {
			//获取当前订单数据
			async getcurrentord(){
				const req = await uni.$http.get('api/jiu/order/offerlist',{
					id:this.thisid,
					user_id:uni.getStorageSync('user_id')
				})
				this.curords = req.data.data.action//订单数据
				this.ordbzj = this.curords.bond//订单保证金金额
				this.user = req.data.data.user//用户数据
				console.log(req)
			},
			
			//确定报价
			async offer(){
				if(this.money == 0){
					uni.showToast({
						icon:"none",
						title:'价格不能为0'
					})
				}else if(parseFloat(this.money)<parseFloat(this.ordbzj)){
					uni.showToast({
						icon:"none",
						title:'报价金额不能低于用户保证金'
					})
				}else{
					const req = await uni.$http.get('api/jiu/order/offer',{
						id:this.thisid,
						user_id:uni.getStorageSync('user_id'),
						money:this.money
					})
					if(req.data.msg == "报价成功"){
						uni.showToast({
							icon:"none",
							title:'报价成功',
							success() {
								uni.navigateBack({
									delta:1
								})
							}
						})
					}else{
						uni.showToast({
							icon:"none",
							title:req.data.msg
						})
					}
					
					console.log(req)
				}
				
				
			}
			
			
		}
	}
</script>

<style scoped lang="scss">
	$gra-color:#F7F7F7;
	.ordshead{
		width: 100%;
		margin-bottom: 20rpx;
		box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
		padding: 30rpx 0rpx;
		.ordshead_box{
			display: flex;
			width: 90%;
			margin: auto;
			image{
				width: 100rpx;
				height: 100rpx;
				border-radius: 15rpx;
			}
			.ords{
				margin-left: 20rpx;
				.topmarg{
					margin-top: 20rpx;
					color: green;
				}
			}
		}
		
	}
	
	.gradordlist{
		width: 90%;
		padding-bottom: 1rpx;
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
					padding: 0rpx 10rpx;
					color: #c3c3c3;
					height: 100rpx;
					width: 80%;
					border-radius: 15rpx;
					box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
					background-color: white;
					// background-color: #e3e3e3;
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
	.mymoney{
		margin: 30rpx auto;
		width: 80%;
		box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
		border-radius: 15rpx;
		text-align: center;
		padding-bottom: 40rpx;
		padding-top: 30rpx;
		position: relative;
		.money{
			background-color: #e3e3e3;
			color: green;
			width: 50%;
			margin:40rpx auto;
			margin-bottom: 40rpx;
			padding: 40rpx 40rpx;
			
		}
		.err{
			font-size: 20rpx;
			width: 90%;
			margin:20rpx auto;
			color: #e71d1d;
			text-align: center;
		}
		.ok{
			padding: 30rpx 80rpx;
			background-color: green;
			border-radius: 20rpx;
			color: white;
			position: absolute;
			bottom: -142rpx;
			left: 192rpx;
		}
	}
	
	
</style>
