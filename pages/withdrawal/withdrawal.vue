<template>
	<view>
		<view class="botttow">
			<view class="edittow" v-for="(item,index) in batchlist" :class="{ba:index == edindex}" :key="index" @click="batch(index)">
				{{item.name}}
			</view>
		</view>
		
		<view class="moneylist" v-for="(item,index) in tixianlist">
			<view class="moneylist_list">
				<view class="left">
					<view class="" v-show="item.status==2">已入账</view>
					<view class="" v-show="item.status==1">审核中</view>
					<view class="" v-show="item.status==3">提现失败</view>
					<view class="martop">{{item.uptime | timeAgo}}</view>
					<view class="martop" v-show="item.status==3">驳回原因:{{item.content}}</view>
				</view>
				<view class="right">
					<strong>+{{item.price}}</strong>
				</view>
			</view>

		</view>
		<!-- 提示内容 -->
		<view class="trfaOrd" v-if="tixianlist.length == 0">
			<view class="orderr"><strong>暂无提现记录~~</strong></view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//提现导航
				batchlist:[
					{'name':'已入账'},
					{'name':'审核中'},
					{'name':'提现失败'},
				],
				edindex:0,
				//接受不同提现状态提现列表
				tixianlist:[]
			}
		},
		onLoad() {
			this.gettixian()
		},
		methods: {
			//提现记录数据
			async gettixian(){
				const req = await uni.$http.get('api/jiu/user/cash',{
					user_id:uni.getStorageSync('user_id')
				})
				console.log(req)
				if(this.edindex == 0){
					this.tixianlist = []
					for(let i in req.data.data.action){
						if(req.data.data.action[i].status == 2){
							this.tixianlist.push(req.data.data.action[i])
						}
					}
					console.log(this.tixianlist)
				}else if(this.edindex == 1){
					this.tixianlist = []
					for(let i in req.data.data.action){
						if(req.data.data.action[i].status == 1){
							this.tixianlist.push(req.data.data.action[i])
						}
					}
				}else if(this.edindex == 2){
					this.tixianlist = []
					for(let i in req.data.data.action){
						if(req.data.data.action[i].status == 3){
							this.tixianlist.push(req.data.data.action[i])
						}
					}
				}
			},
			
			
			
			batch(index){
				this.edindex = index
				if(this.checkbox == this.checkbox){
					this.checkbox = false
				}
				this.gettixian()
			}
		}
	}
</script>

<style scoped lang="scss">
.moneylist{
	width: 100%;
	margin-top: 40rpx;
	.moneylist_list{
		width: 90%;
		margin: auto;
		padding: 20rpx 20rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid gainsboro;
		.left{
			
			image{
				height: 60rpx;
				width: 60rpx;
				margin-top: 10rpx;
			}
			.martop{
				margin-top: 20rpx;
				color: #717171;
			}
		}
		.right{
			margin-top: 30rpx;
		}
		
	}
}
.botttow{
		width: 100%;
		box-shadow: 0rpx 5rpx 5rpx #e3e3e3;
		
		background-color: white;
		padding: 20rpx 0rpx;
		display: flex;
		justify-content: space-around;
		.edittow{
			float: right;

			padding: 25rpx 30rpx;
			color: white;
			border-radius: 5rpx;
			color: #08c590;
			border: 1rpx solid #08c590;
		}
		.ba{
			background-color: #08c590;
			color: white;
		}
	}
	.trfaOrd{
			width: 90%;
			margin:100rpx auto;
			text-align: center;
			color: #787878;
		}
</style>
