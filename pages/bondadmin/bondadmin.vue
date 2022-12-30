<template>
	<view>
		<!-- 服务保证金 -->
		<view class="bondbody" v-for="(item,index) in bondlists">
			<view class="bondname">
				<view class="">
					<view class=""><strong>类目：{{item.cate.name}}</strong></view>
					<view class="matop">金额：{{item.price}}元 <text class="qin" v-show="item.status == 2">已缴纳</text> 
					<text class="qin" v-show="item.status == 1">未缴纳</text> 
					<text class="qin" v-show="item.status == 3">审核中</text> 
				</view>
					
				</view>
				<view class="dongjie" @click="navtobondfrozen(item.id)" v-show="item.status == 2">冻结中</view>
				<view class="org" v-show="item.status == 1" @click="navtobondords(item.id)">去缴费</view>
				<view class="red" v-show="item.status == 1" @click="remlist(item.id)">删除</view>
				<view class="lu" v-show="item.status == 3" >解冻申请中</view>
				<view class="lu" @click="navtobondfrozen(item.id)" v-show="item.status == 5" >解冻失败请重试</view>
			</view>
			
		</view>
		
		<!-- 提示内容 -->
		<view class="trfaOrd" v-if="bondlists.length == 0">
			<view class="orderr"><strong>暂无记录~~</strong></view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//保证金管理列表
				bondlists:[]
			}
		},
		onLoad() {
			this.bondlist()
		},
		onShow() {
			this.bondlist()
		},
		methods: {
			//删除未支付订单
			async remlist(id){
				const req = await uni.$http.get('api/jiu/server/serverdel',{
					id:id
				})
				console.log(req)
				if(req.data.msg == "删除成功"){
					uni.showToast({
						icon:"none",
						title:"删除成功",
						success: (res) => {
							this.bondlist()
						}
					})
				}
			},
			
			//获取保证金管理列表
			async bondlist(){
				const req = await uni.$http.get('api/jiu/server/serverorder',{
					user_id:uni.getStorageSync('user_id')
				})
				console.log(req)
				this.bondlists = req.data.data.action
			},
			
			//跳转冻结中
			navtobondfrozen(id){
				console.log(id)
				uni.navigateTo({
					url:'./bondfronzen/bondfronzen?id='+id
				})
			},
			//跳转保证金订单
			navtobondords(id){
				uni.navigateTo({
					url:'./bondords/bondords?id='+id
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
	.qin{
		color: #0ad6be;
		margin-left: 20rpx;
	}
	.red{
		color: #0ad6be;
		font-size: 40rpx;
	}
	.bondbody{
		background-color: white;
		border-radius: 20rpx;
		width: 90%;
		margin:30rpx auto;
		border: 1rpx solid gainsboro;
		padding: 40rpx 20rpx;
		display: flex;
		justify-content: space-between;
		.bondname{
			width: 100%;
			display: flex;
			justify-content: space-between;
			.matop{
				margin-top: 20rpx;
			}
			.dongjie{
				background-color: oldlace;
				height: 40rpx;
				line-height: 40rpx;
				padding: 30rpx 40rpx;
				border-radius: 15rpx;
				color: gray;
			}
			.org{
				background-color: orange;
				color: white;
				height: 40rpx;
				line-height: 40rpx;
				padding: 30rpx 40rpx;
				border-radius: 15rpx;
			}
			.red{
				background-color: red;
				color: white;
				height: 40rpx;
				line-height: 40rpx;
				padding: 30rpx 40rpx;
				border-radius: 15rpx;
				font-size: 30rpx;
			}
			.lu{
				background-color: #0aaba6;
				color: white;
				height: 40rpx;
				line-height: 40rpx;
				padding: 30rpx 40rpx;
				border-radius: 15rpx;
			}
		}
	}
	
	.money{
		color: red;
		font-size: 40rpx;
	}
	.okbut{
		width: 90%;
		margin: auto;
		position: fixed;
		bottom: 0rpx;
		padding: 20rpx 40rpx;
		// color: white;
		border-top: 1rpx solid gainsboro;
		display: flex;
		justify-content: space-between;
		.allmoney{
			margin-top: 20rpx;
			text{
				color: red;
				font-size: 40rpx;
			}
		}
		.zifu{
			// float: right;
			width: 200rpx;
			text-align: center;
			color: white;
			background-color: #0ad6be;
			padding: 20rpx 30rpx;
			border-radius: 20rpx;
		}
	}
	.trfaOrd{
			width: 90%;
			margin:100rpx auto;
			text-align: center;
			color: #787878;
		}
	.zw{
		height: 400rpx;
	}
</style>
