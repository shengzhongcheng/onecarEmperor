<template>
	<view>
	
		<!-- 地址信息 -->
		<view class="userdizhi">
			<view class="ordsimg">
				<image src="/static/logo.png" mode=""></image>
			</view>
			<view class="userinfor_dizi">
				<view class="ordsshopname">河南深深的泡咖啡噶看来大家分开了撒</view>
				<view class="ordsshopguige">规格:1kg/份&nbsp;&nbsp;数量:2份</view>
			</view>
			<view class="ordsmoney">
				<view class="">￥<strong>38</strong></view>
			</view>
		</view>
		<!-- 商品费用 -->
		<view class="shopmoney">
			<view class="shopmoneylist">
				<view >收货信息</view>
			</view>
			<view class="shopmoneylist">
				<view class="shopclo">用户昵称</view>
				<view>粑粑</view> 
			</view>
			<view class="shopmoneylist">
				<view class="shopclo">收货人</view>
				<view>吴亦撒</view> 
			</view>
			<view class="shopmoneylist">
				<view class="shopclo">联系电话</view>
				<view>123456789</view> 
			</view>
			<view class="shopmoneylist">
				<view class="shopclo">收货地址</view>
				<view >郑州是啊是觉得发放</view> 
			</view>
		</view>
		<!-- 商品下单方式 -->
		<view class="shopmoney">
			<view class="shopmoneylist">
				<view class="">订单信息</view>
			</view>
			<view class="shopmoneylist">
				<view class="shopclo">订单ID</view>
				<view>123456789</view> 
			</view>
			<view class="shopmoneylist">
				<view class="shopclo">商品总数</view>
				<view>1</view> 
			</view>
			<view class="shopmoneylist">
				<view class="shopclo">交付邮费</view>
				<view >0.00</view> 
			</view>
			<view class="shopmoneylist">
				<view class="shopclo">创建时间</view>
				<view >2022.01.12</view> 
			</view>
			<view class="shopmoneylist">
				<view class="shopclo">支付时间</view>
				<view >2022.01.12</view> 
			</view>
			<view class="shopmoneylist ">
				<view class="shopclo">订单状态</view>
				<view class="blue">完成订单</view> 
			</view>
			<view class="shopmoneylist ">
				<view class="shopclo">商品总价</view>
				<view class="">38</view> 
			</view>
			<view class="shopmoneylist ">
				<view class="shopclo">优惠卷金额</view>
				<view class="">0.00</view> 
			</view>
			<view class="shopmoneylist ">
				<view class="shopclo">支付方式</view>
				<view class="">微信支付</view> 
			</view>
			<view class="shopmoneylist ">
				<view class="shopclo">接单师傅</view>
				<view class="">老八</view> 
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
				
			}
		},
		methods: {
			
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
