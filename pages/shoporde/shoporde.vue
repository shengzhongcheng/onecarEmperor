<template>
	<view>
		<!-- 导航 -->
		<template>
			<u-subsection 
			:list="list" 
			:current="current"
			 @change="sectionChange"
			 
			 ></u-subsection>
		</template>
		<!-- 订单列表 -->
		<view class="gradordlist" v-for="(item,index) in shoplist" :key="index" >
			<!-- 订单用户信息 -->
			<view class="gradhead">
				<view class="gradhead_left">
					<image :src="getImgsrc(item.user.avatar)" mode=""></image>
					<view class="gradusername">
						<view>{{item.user.nickname}}</view>
					</view>
				</view>
				<view class="gradhead_right">
					<view class="red" v-show="item.status == 2">待派单</view>
					<view class="blue"  v-show="item.status == 3 && item.type == 2">已派单</view><!--type1用户上门2商家上门  -->
					<view class="red" v-show="item.status == 5">已完成</view>
					<view class="red" v-show="item.status == 6">已售后</view>
					<view class="org" v-show="item.status == 3 && item.type == 1">用户到店</view>
				</view>
			</view>
			<!-- 订单详情 -->
			<view class="ordsxx">
				<view class="shopinfor">
					<!-- <view class="shopinfortext">商品信息</view> -->
					<view class="shopinfor_letft">
						<image :src="getImgsrc(item.server.serimage)" mode=""></image>
						<view class="shopinfor_right">
							<view class="tit">{{item.server.title}}</view>
							<view class="shopguige"><text>数量：{{item.num}}份</text> </view>
						</view>
						<view class="shopmoney">
							￥<text>{{item.price}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 订单时间 -->
			<view class="ordstime">
				<view class="ortime">
					<view>支付时间：{{item.paytime | timeAgo}}</view>
				</view>
				<view class="goords" ><!-- @click="remords(index)" -->
					<view class="oreinfor" @click="navtoshopinfor(item.id)">订单详情</view>
				</view>
			</view>
		</view>
		
		<!-- 数据为空 -->
		<view class="" v-if="shoplist.length == 0">
			<u-empty
			        mode="order"
					text="暂无订单"
			        icon="http://cdn.uviewui.com/uview/empty/order.png"
			>
			</u-empty>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				  list: [{
							name: '全部',
						}, {
							name: '未派单',
						}, {
							name: '已派单'
						}, {
							name: '已完成'
						},],
					current:0,
					//商品列表
					shoplist:[],
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getshoplist()//商品列表
		},
		methods: {
			//跳转订单详情
			navtoshopinfor(id){
				uni.navigateTo({
					url:'/pages/shopordinfor/shopordinfor?id='+id
				})
			},
			
			//分段器点击分类
			sectionChange(index){
				this.shoplist = []
				this.current = index
				this.getshoplist()
			},
			//获取订单列表
			async getshoplist(){
				let index = 0
				if(this.current == 1){
					index = 2
				}else if(this.current == 2){
					index = 3
				}else if(this.current == 3){
					index = 4
				}
				const req = await uni.$http.post('api/jiu/consult/ordershoplist',{
					user_id:uni.getStorageSync('user_id'),
					type:index
				})
				console.log('订单列表',req)
				this.shoplist = req.data.data
				
			},
			
		}
	}
</script>

<style lang="scss" scoped>
.gradordlist{
		background-color: white;
		width: 90%;
		// height: 400rpx;
		padding-bottom: 20rpx;
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
			border-bottom: 1rpx solid gainsboro;
			padding-bottom: 20rpx;
			.shopinfortext{
				margin: 10rpx 20rpx;
			}
			.shopinfor{
				width: 100%;
				.shopinfor_letft{
					margin-left: 20rpx;
					display: flex;
					image{
						flex: 1;
						width: 100rpx;
						height: 100rpx;
						border-radius: 20rpx;
					}
					.shopinfor_right{
						margin-left: 20rpx;
						flex: 2;
						.tit{
							  display: inline-block;
							  white-space: nowrap; 
							  width: 288rpx;
							  overflow: hidden;
							  text-overflow:ellipsis;
						}
						.shopguige{
							margin-top: 15rpx;
							color: #787878;
							font-size: 20rpx;
						}
					}
					.shopmoney{
						flex: 1;
						margin-left: 80rpx;
						margin-top: 10rpx;
						padding-top: 20rpx;
						// margin-right: 20rpx;
						text{
							font-size: 30rpx;
						}
					}
				}
			}
		}
		.ordstime{
			position: relative;
			width: 90%;
			display: flex;
			justify-content: space-between;
			margin: auto;
			.ortime{
				color: #787878;
			}
			.goords{
				padding: 5rpx 40rpx;
				padding-bottom: 10rpx;
				border-radius: 20rpx;
			}
			.oreinfor{
				color: #14be0e;
			}
			.ordsrem{
				position: absolute;
				right: -34rpx;
				bottom: -146rpx;
				width: 200rpx;
				box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
				border-radius: 20rpx;
				background-color: white;
				view{
					padding: 20rpx 10rpx;
					text-align: center;
					border-bottom: 1rpx solid #e3e3e3;
				}
			}
		}
	}
</style>
