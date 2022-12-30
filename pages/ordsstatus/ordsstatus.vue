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
					<view class="userinfor_radiu blue">
						1
					</view>
					<view class="userinfor_radiu">
						2
						
					</view>
					<view class="userinfor_radiu">
						3
						
					</view>
				</view>
				<view class="userdisplaytext">
					<view class="blue">待派单</view>
					<view class="">已派单</view>
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
				<!-- <view class="dizi">{{shopinfor[0].province}}-{{shopinfor[0].city}}-{{shopinfor[0].district}}</view>
				<view class="dizicol">{{shopinfor[0].real_name}} {{shopinfor[0].phone}}</view> -->
				<view class="dizi" v-if="sta != 1">{{yipaidan.adress.province}}-{{yipaidan.adress.city}}-{{yipaidan.adress.district}}{{yipaidan.adress.detail}}</view>
				<view class="dizi" v-if="sta == 1">{{yipaidan.adress.province}}-{{yipaidan.adress.city}}-{{yipaidan.adress.district}}{{yipaidan.adress.detail}}</view>
				<view class="dizicol"  v-if="sta != 1">{{yipaidan.adress.real_name}} </view><!-- {{yipaidan.adress.phone}} -->
				<view class="dizicol"  v-if="sta == 1">{{yipaidan.adress.real_name}} </view>
			</view>
		</view>
		<!-- 地址信息 -->
		<view class="userdizhi">
			<view class="ordsimg">
				<image v-if="sta != 1" :src="getImgsrc(yipaidan.serimage)" mode=""></image>
				<image v-if="sta ==1" :src="getImgsrc(yipaidan.image)" mode=""></image>
			</view>
			<view class="userinfor_dizi">
				<!-- <view class="ordsshopname">{{shopinfor[0].name}}</view>
				<view class="ordsshopguige">数量:{{shopinfor[0].num}}份</view> -->
				<view class="ordsshopname" v-if="sta == 1">{{ yipaidan.cate.catename}}</view>
				<view class="ordsshopname" v-if="sta != 1">{{yipaidan.title}}</view>
				<view class="ordsshopguige" v-if="sta == 1">车品牌：{{yipaidan.brand.brandname}} {{yipaidan.series.sername}}</view>
				<view class="ordsshopguige" v-if="sta != 1">数量:{{yipaidan.num}}份</view>
			</view>
			<view class="ordsmoney">
				<!-- <view class="">￥<strong>{{shopinfor[0].money}}</strong></view> -->
				<view class="" v-if="sta == 1">￥<strong>{{yipaidan.amount}}</strong></view>
				<view class="" v-if="sta != 1">￥<strong>{{yipaidan.money}}</strong></view>
			</view>
		</view>
		<!-- 商品费用 -->
		<view class="shopmoney">
			<view class="shopmoneylist">
				<view class="shopclo">商品小计</view>
				<view v-if="sta != 1">￥{{yipaidan.total_price}}</view> 
				<view v-if="sta == 1">￥{{yipaidan.totalpeice}}</view> 
			</view>
			<!-- <view class="shopmoneylist">
				<view class="shopclo">活动</view>
				<view>-￥38</view> 
			</view> -->
			<!-- 分航线 -->
			<view class="xian">
				
			</view>
			<view class="shopmoneylist">
				<view class="shopclo">应付金额</view>
				<view v-if="sta != 1">￥{{yipaidan.total_price}}</view>
				<view v-if="sta == 1">￥{{yipaidan.totalpeice}}</view> 
			</view>
			
		</view>
		<!-- 商品下单方式 -->
		<view class="shopmoney">
			<view class="shopmoneylist">
				<view class="shopclo">下单时间</view>
				<view v-if="sta != 1">{{yipaidan.uptime | timeAgo}}</view> 
				<view v-if="sta == 1">{{yipaidan.uptime | timeAgo}}</view> 
			</view>
			<view class="shopmoneylist">
				<view class="shopclo">订单编号</view>
				<!-- <view>{{shopinfor[0].orderid}}</view> -->
				<view v-if="sta == 1">{{yipaidan.orderid}}</view>
				<view v-if="sta != 1">{{yipaidan.orderid}}</view> 
			</view>
			<view class="shopmoneylist">
				<view class="shopclo">服务方式</view>
				<!-- <view>{{shopinfor[0].orderid}}</view> -->
				<view v-if="type == 1">用户上门</view>
				<view v-if="type == 2">商家上门</view> 
			</view>
			<!-- <view class="shopmoneylist">
				<view class="shopclo">支付方式</view>
				<view >支付宝</view> 
			</view> -->
			<!-- <view class="shopmoneylist">
				<view class="shopclo">交易流水号</view> -->
				<!-- <view >{{shopinfor[0].orderid}}</view> -->
				<!-- <view v-if="sta == 1">{{yipaidan.orderid}}</view>
				<view v-if="sta != 1">{{yipaidan[0].orderid}}</view> -->
			<!-- </view> -->
		</view>
		<!-- 选择派单师傅 -->
		<view class="shopmoney" v-if="usertype == 1" @click="kdtrue">
			<view class="shopmoneylist">
				<view class="shopclo">选择师傅</view>
				<view class="">{{thisshifu}}</view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="zw">
			
		</view>
		<!-- 底部 -->
		<view class="goords" @click="navtoordsing()">
			<view class="">去派单</view>
		</view>
		<!-- 弹出层 -->
		<view class="tanchu" v-if="kdtf">
			<view class="shifu" v-for="(item,index) in columns" @tap="shifuok(item)">{{item.realname}}</view>
			<view class="" style="text-align: center;" v-if="columns.length == 0">暂无员工信息</view>
		</view>
		
		<!-- 屏幕蒙层 -->
		<view class="men" @click="none()" v-if="kdtf" :style="{height:windowheight}"  style="background-color: black;width: 100%;position: fixed;top: 0;opacity: 0.3;z-index: 888;">
			
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//是否是商家
				usertype:uni.getStorageSync('type'),
				//是否显示蒙层
				kdtf:false,
				/* 屏幕宽度 */
				windowwidth:0,
				/* 屏幕高度 */
				windowheight:0,
				type:null,
				//接收传递过来的当前订单id
				shopid:null,
				//接受订单详情的数据
				yipaidan:[],
				sta:0,//1为议价订单0为一口价
				//弹框是否显示
				show:false,
				//师傅列表
				 columns: [],
				 //选中的师傅
				 thisshifu:'请选择师傅',
				 //选中师傅id
				 shifuid:null,
				 showview:false,
			}
		},
		onLoad(shopid) {
			//获取屏幕高度
			uni.getSystemInfo({
				success:(res) => {
					this.windowwidth = res.windowWidth
					this.windowheight = res.windowHeight+'px'
				}
			})
			console.log('asdasdadas',shopid)
			console.log('身份',this.usertype)
			this.sta = shopid.zt
			this.shopid = shopid.id//赋值传递的订单id
			// console.log('我是携带的订单id',shopid)
			this.price()//一口价订单详情
			this.shifulist()
		},
		methods: {
			//师傅点击id
			shifuok(item){
				console.log('id',item)
				this.shifuid = item.id
				this.thisshifu = item.realname
				this.kdtf = false
			},
			
			//点击显示弹框
			kdtrue(){
				this.kdtf = true
			},
			//点击蒙层的时候关闭
			none(){
				this.kdtf = false
			},
			//师傅列表
			async shifulist(){
				const req = await uni.$http.get('api/jiu/usercate/shoptabulate',{
					user_id:uni.getStorageSync('user_id')
				})
				console.log('yuan',req)
				this.columns = req.data.data.action

			},

			//一口价订单详情
			async price(){
				if(this.sta != 1){
					const req = await uni.$http.get('api/jiu/order/pricedetail',{
						id:this.shopid
					})
					console.log('一口价订单详情',req)
					this.type = req.data.data.action.type
					this.yipaidan = req.data.data.action
					console.log(this.yipaidan)
					console.log('type',this.type)
					this.showview = true
				}else if(this.sta == 1){//议价订单详情
					const req = await uni.$http.get('api/jiu/order/bargindetail',{
						id:this.shopid
					})
					console.log('hahahahahh',req)
					this.type = req.data.data.action.type
					this.yipaidan = req.data.data.action
					console.log(this.yipaidan)
					console.log('type',this.type)
					this.showview = true
				}
				
			},
			//发送微信消息
			async getXiaoXi(type,orderid){
				console.log('消息参数',type,orderid)
				const req = await uni.$http.post('api/jiu/plug/fasongmessage',{
					orderid:orderid,
					type:type
				})
				console.log('发送消息',req)
			},
			
			//跳转已派单
			async navtoordsing(){
				if(this.usertype == 2){//师傅进入该判断
					
					if(this.sta != 1){
						
						console.log('我是typee',this.type)
						const req = await uni.$http.get('api/jiu/order/dispath',{
							yid:this.shifuid,
							user_id:uni.getStorageSync('user_id'),
							id:this.shopid,
						})
						console.log(req)
						if(req.statusCode === 200){
							this.getXiaoXi(2,this.yipaidan.id)
							uni.showToast({
								icon:"none",
								title:req.data.msg,
								success: (res) => {
									uni.redirectTo({
										url:'../ordsgo/ordsgo?id='+this.shopid+'&zt='+this.sta
									})
								}
							})
						}
						
					}else if(this.sta == 1){
						
						console.log('我是typee',this.type)
						const req = await uni.$http.get('api/jiu/order/yijiapath',{
							yid:this.shifuid,
							user_id:uni.getStorageSync('user_id'),
							id:this.shopid,
							
						})
						console.log(req)
						if(req.statusCode === 200){
							this.getXiaoXi(1,this.yipaidan.id)
							uni.showToast({
								icon:"none",
								title:req.data.msg,
								success: (res) => {
									uni.redirectTo({
										url:'../ordsgo/ordsgo?id='+this.shopid+'&zt='+this.sta
									})
								}
							})
						}
						
						
					}
					
					
				}else if(this.usertype == 1){//商家进入该判断
					
					if(this.sta != 1  && this.thisshifu != "请选择师傅"){
						
						console.log('我是typee',this.type)
						const req = await uni.$http.get('api/jiu/order/dispath',{
							yid:this.shifuid,
							user_id:uni.getStorageSync('user_id'),
							id:this.shopid,
						})
						console.log(req)
						if(req.statusCode === 200){
							this.getXiaoXi(2,this.yipaidan.id)
							uni.showToast({
								icon:"none",
								title:req.data.msg,
								success: (res) => {
									uni.redirectTo({
										url:'../ordsgo/ordsgo?id='+this.shopid+'&zt='+this.sta
									})
								}
							})
						}
						
					}else if(this.sta == 1 && this.thisshifu != "请选择师傅"){
						
						console.log('我是typee',this.type)
						const req = await uni.$http.get('api/jiu/order/yijiapath',{
							yid:this.shifuid,
							user_id:uni.getStorageSync('user_id'),
							id:this.shopid,
							
						})
						console.log(req)
						if(req.statusCode === 200){
							this.getXiaoXi(1,this.yipaidan.id)
							uni.showToast({
								icon:"none",
								title:req.data.msg,
								success: (res) => {
									uni.redirectTo({
										url:'../ordsgo/ordsgo?id='+this.shopid+'&zt='+this.sta
									})
								}
							})
						}
						
						
					}else{
						uni.showToast({
							icon:"none",
							title:'请选择师傅'
						})
					}
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
				border: 0.5rpx solid gainsboro;
				// border-bottom: 1rpx solid gainsboro;
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
			image{
				height: 40rpx;
				width: 40rpx;
			}
		}
		.xian{
			width: 100%;
			
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
		background-color: white;
		view{
			float: right;
			padding: 0rpx 40rpx;
			background-color: #2bb381;
			color: white;
			border-radius: 20rpx;
			margin-right: 20rpx;
		}
	}
	.tanchu{
		width: 80%;
		height: 500rpx;
		background-color: white;
		overflow: auto;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		// transform: translateY(-50%);
		z-index: 999;
		.shifu{
			width: 90%;
			margin:30rpx auto;
			font-size: 33rpx;
			border-bottom: 1rpx solid #888888;
			padding: 20rpx 0rpx;
		}
		.title{
			width: 100%;
			text-align: center;
			margin-top: 20rpx;
		}
	}
</style>
