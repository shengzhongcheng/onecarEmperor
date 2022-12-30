<template>
	<view v-show="showview">
		<!-- 头部信息 -->
		<view class="username">
			<!-- 背景图片 -->
			<view class="myheader_back">
				
			</view>
			<!-- 用户详细信息 -->
			<view class="userinfor">
				<view class="xian">
					
				</view>
				<view class="userdisplay">
					<view class="userinfor_radiu ">
						1
					</view>
					<view class="userinfor_radiu blue">
						2
						
					</view>
					<view class="userinfor_radiu">
						3
						
					</view>
				</view>
				<view class="userdisplaytext">
					<view class="">待派单</view>
					<view class="blue">已派单</view>
					<view class="">已完成</view>
				</view>
			</view>
		</view>
		<!-- 订单地址信息 -->
		<view class="userdizhi">
			<view class="left_imag">
				<image src="@/static/ordsinfor/dinwei.png" mode=""></image>
			</view>
			<view class="userinfor_dizi">
				<view class="dizi" v-if="sta != 1">{{yipaidan.adress.province}}-{{yipaidan.adress.city}}-{{yipaidan.adress.district}}{{yipaidan.adress.detail}}</view>
				<view class="dizi" v-if="sta == 1">{{yipaidan.adress.province}}-{{yipaidan.adress.city}}-{{yipaidan.adress.district}}{{yipaidan.adress.detail}}</view>
				<view class="dizicol"  v-if="sta != 1">{{yipaidan.adress.real_name}} </view><!-- {{yipaidan.adress.phone}} -->
				<view class="dizicol"  v-if="sta == 1">{{yipaidan.adress.real_name}} </view>
				
			</view>
		</view>
		<!-- 地址信息 -->
		<view class="userdizhi">
			<view class="ordsimg">
				<image  v-if="sta == 1" :src="getImgsrc( yipaidan.image)" mode=""></image>
				<image v-if="sta != 1" :src="getImgsrc( yipaidan.serimage)" mode=""></image>
			</view>
			<view class="userinfor_dizi">
				<view class="ordsshopname" v-if="sta == 1">{{ yipaidan.cate.catename}}</view>
				<view class="ordsshopname" v-if="sta != 1">{{yipaidan.title}}</view>
				<view class="ordsshopguige" v-if="sta == 1">车品牌：{{yipaidan.brand.brandname}} {{yipaidan.series.sername}}</view>
				<view class="ordsshopguige" v-if="sta != 1">数量:{{yipaidan.num}}份</view>
			</view>
			<view class="ordsmoney">
				<view class="" v-if="sta == 1">￥<strong>{{yipaidan.amount}}</strong></view>
				<view class="" v-if="sta != 1">￥<strong>{{yipaidan.money}}</strong></view>
			</view>
		</view>
		<!-- 商品费用 -->
		<view class="shopmoney">
			<view class="shopmoneylist">
				<view >收货信息</view>
			</view>
			<view class="shopmoneylist">
				<view class="shopclo">用户昵称</view>
				<view v-if="sta == 1">{{yipaidan.user.nickname}}</view>
				<view class="" v-if="sta != 1">{{yipaidan.user.nickname}}</view>
			</view>
			<view class="shopmoneylist">
				<view class="shopclo">收货人</view>
				<view v-if="sta == 1">{{yipaidan.adress.real_name}}</view> 
				<view v-if="sta != 1">{{yipaidan.adress.real_name}}</view> 
			</view>
			<!-- <view class="shopmoneylist">
				<view class="shopclo">联系电话</view>
				<view v-if="sta == 1">{{yipaidan.adress.phone}}</view> 
				<view v-if="sta != 1">{{yipaidan.adress.phone}}</view> 
			</view> -->
			<view class="shopmoneylist">
				<view class="shopclo">收货地址</view>
				<view v-if="sta == 1">{{yipaidan.adress.province}}-{{yipaidan.adress.city}}-{{yipaidan.adress.district}}{{yipaidan.adress.detail}}</view> 
				<view v-if="sta != 1">{{yipaidan.adress.province}}-{{yipaidan.adress.city}}-{{yipaidan.adress.district}}{{yipaidan.adress.detail}}</view> 
			</view>
		</view>
		<!-- 商品下单方式 -->
		<view class="shopmoney">
			<view class="shopmoneylist">
				<view class="">订单信息</view>
			</view>
			<view class="shopmoneylist">
				<view class="shopclo">订单ID</view>
				<view v-if="sta == 1">{{yipaidan.orderid}}</view> 
				<view v-if="sta != 1">{{yipaidan.orderid}}</view> 
			</view>
			<view class="shopmoneylist" v-if="sta != 1">
				<view class="shopclo">商品总数</view>
				<view >数量:{{yipaidan.num}}份</view> 
			</view>
			<!-- <view class="shopmoneylist">
				<view class="shopclo">交付邮费</view>
				<view >0.00</view> 
			</view> -->
			<view class="shopmoneylist">
				<view class="shopclo">创建时间</view>
				<view v-if="sta == 1">{{yipaidan.uptime | timeAgo}}</view> 
				<view v-if="sta != 1">{{yipaidan.uptime | timeAgo}}</view> 
			</view>
			<view class="shopmoneylist">
				<view class="shopclo">支付时间</view>
				<view v-if="sta == 1">{{ yipaidan.paytime | timeAgo}}</view> 
				<view v-if="sta != 1">{{ yipaidan.paytime | timeAgo}}</view> 
			</view>
			<view class="shopmoneylist ">
				<view class="shopclo">订单状态</view>
				<view class="blue">已派单</view> 
			</view>
			<view class="shopmoneylist ">
				<view class="shopclo">商品总价</view>
				<view class="" v-if="sta == 1">￥{{yipaidan.totalpeice}}</view>
				 <view class="" v-if="sta != 1">￥{{yipaidan.total_price}}</view>
			</view>
			<!-- <view class="shopmoneylist ">
				<view class="shopclo">优惠卷金额</view>
				<view class="">0.00</view> 
			</view> -->
			<!-- <view class="shopmoneylist ">
				<view class="shopclo">支付方式</view>
				<view class="">微信支付</view> 
			</view> -->
			<view class="shopmoneylist ">
				<view class="shopclo">接单师傅</view>
				<view class="" v-if="sta == 1">{{yipaidan.shi.realname}}{{yipaidan.shi.shop_name}}</view>
				 <view class="" v-if="sta != 1">{{yipaidan.shi.realname}}{{yipaidan.shop_name}}</view>
			</view>
			<view class="shopmoneylist ">
				<view class="shopclo">师傅联系方式</view>
				<view class="" v-if="sta == 1">{{yipaidan.shi.shop_tel}}</view>
				 <view class="" v-if="sta != 1">{{yipaidan.shop_tel}}</view>
			</view>
		</view>
		
		<!-- 占位 -->
		<view class="zw">
			
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//订单id
				shopid:null,
				//接收以派单数据列表
				yipaidan:[],
				//当前是啥订单
				sta:0,//1是议价订单
				showview:false,
			}
		},
		onLoad(shopid) {
			console.log('shopid',shopid)
			this.sta = shopid.zt//当前是啥订单,1为议价
			this.shopid = shopid.id
			console.log(this.shopid)
			console.log('状态',this.sta)
			this.getyipaidan()
		},
		methods: {
			//已派单数据列表
			async getyipaidan(){
				if(this.sta != 1){
					console.log('111')
					const req = await uni.$http.get('api/jiu/order/pricedetail',{
						id:this.shopid
					})
					console.log(req)
					this.yipaidan = req.data.data.action
					this.showview = true
				}else if(this.sta == 1){
					const req = await uni.$http.get('api/jiu/order/bargindetail',{
						id:this.shopid
					})
					console.log('hahahahahh',req)
					this.yipaidan = req.data.data.action
					this.showview = true
					console.log(this.yipaidan)
				}
				
			}
			
		}
	}
</script>

<style scoped lang="scss">
	
.username{
		position: relative;
		width: 100%;
		padding-top: 100rpx;
		.myheader_back{
			height: 200rpx;
			width: 100%;
			position: absolute;
			left: 0rpx;
			top: 0rpx;
			background-color: #2bb381;
			z-index: -1;
		}
		.userinfor{
			padding: 15rpx 0rpx;
			width: 85%;
			margin: auto;
			background-color: white;
			border-radius: 20rpx;
			box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
			position: relative;
			.xian{
				border: 2rpx solid gainsboro;
				width: 80%;
				height: 0rpx;
				position: absolute;
				top: 40%;
				transform: translateY(-40%);
				z-index: 0;
				left: 50%;
				transform: translateX(-50%);
			}
			.userdisplay{
				text-align: center;
				width: 100%;
				display: flex;
				justify-content: space-around;
				.userinfor_radiu{
					z-index: 1;
					text-align: center;
					font-size: 40rpx;
					height: 100rpx;
					line-height: 100rpx;
					width: 100rpx;
					border-radius: 50%;
					background-color: #ffffff;
					border: 1rpx solid #bfbfbf;
				}
				.blue{
					border: 1rpx solid #2bb381;
					color: #2bb381;
				}
			}
			.userdisplaytext{
				text-align: center;
				width: 100%;
				display: flex;
				justify-content: space-between;
				view{
					flex: 0.4;
					// text-align: center;
				}
				.blue{
					color: #2bb381;
				}
			}
			
		}
		
	}
	
	.userdizhi{
		padding: 15rpx 0rpx;
		width: 85%;
		margin:40rpx auto;
		background-color: white;
		border-radius: 20rpx;
		box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
		position: relative;
		display: flex;
		.left_imag{
			margin-left: 15rpx;
			image{
				height: 60rpx;
				width: 60rpx;
			}
		}
		.ordsimg{
			margin-left: 15rpx;
			image{
				height: 100rpx;
				width: 100rpx;
				border-radius: 20rpx;
			}
		}
		.userinfor_dizi{
			margin-left: 30rpx;
			.dizi{
				width: 500rpx;
			}
			.dizicol{
				color: #bfbfbf;
				font-size: 20rpx;
			}
			.ordsshopname{
				width: 300rpx;
				margin-top: 10rpx;
			}
			.ordsshopguige{
				margin-top: 15rpx;
				color: #bfbfbf;
				font-size: 20rpx;
			}
		}
		.ordsmoney{
			margin-top: 40rpx;
			margin-left: 60rpx;
		}
	}
	.shopmoney{
		padding: 15rpx 0rpx;
		width: 85%;
		margin:40rpx auto;
		background-color: white;
		border-radius: 20rpx;
		box-shadow:0rpx 0rpx  3rpx 3rpx #e3e3e3;
		position: relative;
		.shopmoneylist{
			display: flex;
			justify-content: space-between;
			padding: 20rpx 20rpx;
			.shopclo{
				color: #888888;
			}
			.red{
				color: red;
				font-size: 40rpx;
			}
			.blue{
				color: #2bb381;
			}
			image{
				height: 40rpx;
				width: 40rpx;
			}
		}
		.xian{
			width: 100%;
			border-bottom: 1rpx solid #888888;
		}
	}
	.zw{
		height: 200rpx;
	}
	.goords{
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		border-top: 1rpx solid gainsboro;
		view{
			float: right;
			padding: 0rpx 40rpx;
			background-color: #2bb381;
			color: white;
			border-radius: 20rpx;
		}
	}
</style>
