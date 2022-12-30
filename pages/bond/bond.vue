<template>
	<view>
		<!-- 服务保证金 -->
		<view class="bondbody" v-for="(item,index) in servicelist" :key="index">
			<view class="bondname">
				<view class="">类目：{{item.name}}</view>
			</view>
			<!-- 保证金金额 -->
			<view class="">
				<view>金额：<text class="red" >￥{{item.price}}</text> </view>
			</view>
		</view>
		<!-- 立即支付 -->
		<view class="okbut" >
			<view class="allmoney">合计：<text>￥{{allmoney}}</text> </view>
			<view class="zifu" @click="goshoping()">立即支付</view>
		</view>
		<!-- 底部弹窗 -->
		<picker mode="selector" :range="zfarry" :value="zhifuOk" @change="zhifufangshi">
			<view class="tanchuan">
				<view><strong>选择支付方式</strong>: {{zfarry[zhifuOk]}}</view>
				<!-- <view class=""><image style="height: 30rpx;width: 30rpx;" src="../../static/image/right_skip.png" mode=""></image> </view> -->
			</view>
		</picker>
		
		<!-- 占位 -->
		<view class="zw">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//选择支付方式
				zfarry:["余额支付","微信支付"],
				//用户选择了那一项
				zhifuOk:1,//默认微信支付
				typehzifu:2,
				//接受类目列表
				servicelist:[],
				//全部金额
				allmoney:0,
				//所有订单id(目前没用)
				allid:[],
				//单个订单id
				lei:null,
				//订单id
				sid:null,
				//默认第一个ordid
				allorderid:null,
			}
		},
		onLoad(id) {
			this.sid = id.sid
			this.getord()
		},
		methods: {
			//选择支付方式
			zhifufangshi(e){//["余额支付","微信支付"]接口2是微信支付1是余额支付
				console.log(e)
				
				this.zhifuOk = e.detail.value
				console.log('zhifuOk',this.zhifuOk)
				// console.log(this.zhifuOk)
				if(e.detail.value == 1){
					this.typehzifu = 2//微信支付
					console.log('微信支付',this.typehzifu)
				}else if(e.detail.value == 0){
					this.typehzifu = 1//余额支付
					console.log('余额支付',this.typehzifu)
				}
			},
			//列表
			async getord(){
				const req = await uni.$http.get('api/jiu/server/orderlist',{
					id:this.sid,
					user_id:uni.getStorageSync('user_id'),
				})
				console.log('换回',req)
				this.servicelist = req.data.data.action
				this.allorderid = req.data.data.action[0].allorderid
				for(let k in this.servicelist){
					this.allmoney +=parseFloat(this.servicelist[k].price)
				}
			},
			
			//立即购买
			async goshoping(){
				if(this.allmoney != 0){
					const req = await uni.$http.get('api/jiu/server/category',{
						user_id:uni.getStorageSync('user_id'),
						id:this.allorderid,
						type:this.typehzifu
					})
					console.log('uhdakshfdkjfh',req)
					if(req.data.msg == "支付成功"){
						uni.requestPayment({
						    "provider": "wxpay", 
						    "orderInfo": {
						        "appid": req.data.data.pay.appid ,  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
						        "noncestr": req.data.data.pay.noncestr, // 随机字符串
						        "package": req.data.data.pay.package,        // 固定值
						        "partnerid": req.data.data.pay.partnerid,      // 微信支付商户号
						        "prepayid": req.data.data.pay.prepayid, // 统一下单订单号 
						        "timestamp": req.data.data.pay.timestamp,        // 时间戳（单位：秒）
						        "sign":req.data.data.pay.sign // 签名，这里用的 MD5/RSA 签名
						    },
						    success(res) {
								console.log(res)
								uni.showToast({
									icon:"none",
									title:'购买成功',
								})
								setTimeout(()=>{
									uni.navigateBack({
										delta:2
									})
								},1500)
							},
						    fail(e) {
								console.log(e)
							}
						})
					}else if(req.data.msg == "余额支付成功"){
						uni.showToast({
							icon:"none",
							title:req.data.msg,
							success: (res) => {
								setTimeout(()=>{
									uni.navigateBack({
										delta:3
									})
								},1000)
								
							}
						})
					}
				}else if(this.allmoney == 0){
					const req = await uni.$http.get('api/jiu/server/category',{
						user_id:uni.getStorageSync('user_id'),
						id:this.allorderid,
						type:1
					})
					console.log('uhdakshfdkjfh',req)
					if(req.data.msg == "支付成功"){
						uni.requestPayment({
						    "provider": "wxpay", 
						    "orderInfo": {
						        "appid": req.data.data.pay.appid ,  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
						        "noncestr": req.data.data.pay.noncestr, // 随机字符串
						        "package": req.data.data.pay.package,        // 固定值
						        "partnerid": req.data.data.pay.partnerid,      // 微信支付商户号
						        "prepayid": req.data.data.pay.prepayid, // 统一下单订单号 
						        "timestamp": req.data.data.pay.timestamp,        // 时间戳（单位：秒）
						        "sign":req.data.data.pay.sign // 签名，这里用的 MD5/RSA 签名
						    },
						    success(res) {
								console.log(res)
								uni.showToast({
									icon:"none",
									title:'购买成功',
								})
								setTimeout(()=>{
									uni.navigateBack({
										delta:2
									})
								},1500)
							},
						    fail(e) {
								console.log(e)
							}
						})
					}else if(req.data.msg == "余额支付成功"){
						uni.showToast({
							icon:"none",
							title:req.data.msg,
							success: (res) => {
								setTimeout(()=>{
									uni.navigateBack({
										delta:3
									})
								},1000)
								
							}
						})
					}
				}
				
				
			},
			
			//类目列表
			// async gomoney(){
			// 	const req = await uni.$http.get('api/jiu/server/cart',{
			// 		user_id:uni.getStorageSync('user_id')
			// 	})
			// 	this.servicelist = req.data.data.action
			// 	let allmon = 0
			// 	for(let i in this.servicelist){
			// 		this.allid.push(this.servicelist[i].id)
			// 		allmon+=parseFloat(this.servicelist[i].money)
			// 	}
			// 	this.allmoney = allmon
			// 	console.log(req)
			// }
			
		}
	}
</script>

<style scoped lang="scss">
	.red{
		color: #0ad6be;
		font-size: 40rpx;
	}
	.bondbody{
		width: 90%;
		margin:30rpx auto;
		border: 1rpx solid gainsboro;
		padding: 40rpx 20rpx;
		display: flex;
		justify-content: space-between;
		.bondname{
			margin-top: 10rpx;
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
		background-color: white;
		// color: white;
		border-top: 1rpx solid gainsboro;
		display: flex;
		justify-content: space-between;
		.allmoney{
			margin-top: 8rpx;
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
	.zw{
		height: 400rpx;
	}
	.tanchuan{
		border-top: 1rpx solid gainsboro;
		background-color: white;
		width: 90%;
		display: flex;
		justify-content: space-between;
		margin: auto;
		position: fixed;
		bottom: 120rpx;
		padding: 30rpx 40rpx;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
